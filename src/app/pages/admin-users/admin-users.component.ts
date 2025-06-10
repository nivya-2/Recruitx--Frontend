import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { ButtonIconComponent } from '../../ui/button-icon/button-icon.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { AssignComponent } from '../../ui/assign/assign.component';
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { UploadComponent } from '../../shared-components/upload/upload.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { UserApiService, UserDetails } from '../../core/services/api/user-api-service.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    IconComponent, TableComponent, CommonLayoutComponent, AlertsComponent,
    CardsComponent, HeaderTextComponent, ButtonIconComponent,
    ButtonComponent, AssignComponent, ModalComponent, UploadComponent
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  dataSource: UserDetails[] = [];
  recruiterHeadName: string | null = null;
  recruiterHeadEmail: string | null = null;
  teamList: Array<{ fullName: string; role: string; email: string; userId: number }> = [];
  visible: boolean = false;
  showAssignList: boolean = false;

  @ViewChild('assignBox') assignBox!: AssignComponent;
  @ViewChild('alerts') alertsComponent!: AlertsComponent;

  constructor(private userApi: UserApiService) {}

  ngOnInit(): void {
    this.refreshUserList();
  }

  mapUserDetailsToDataSource(users: UserDetails[]): any[] {
    return users.map(u => ({
      id: u.employeeId,
      userId: u.userId,
      name: u.name,
      jobTitle: u.jobTitle,
      role: u.roleTitle,
      location: u.location,
      deliveryUnit: u.deliveryUnit,
      email: u.email,
      status1: u.status,
      actions: ['Edit']
    }));
  }

  async refreshUserList(): Promise<void> {
  try {
    const allUsers = await this.userApi.getAllUsers().toPromise();

    if (!allUsers || allUsers.length === 0) {
      this.dataSource = [];
      this.teamList = [];
      return;
    }

    const recruiterHead = allUsers.find(user => user.roleTitle === 'Recruiter Head');
    this.recruiterHeadName = recruiterHead?.name ?? null;
    this.recruiterHeadEmail = recruiterHead?.email ?? null;

    const recruitersOnly = allUsers.filter(u => u.roleTitle === 'Recruiter');
    this.dataSource = this.mapUserDetailsToDataSource(recruitersOnly);

    this.teamList = recruitersOnly
      .filter(user => user.email !== this.recruiterHeadEmail)
      .map(user => ({
        fullName: user.name,
        role: user.roleTitle,
        email: user.email,
        userId: user.userId
      }));

  } catch (error) {
    console.error('Error refreshing users:', error);
    this.dataSource = [];
    this.teamList = [];
  }
}


  userStatus(member: any) {
    const isActive = member.status1 === 'Active';
    const newStatus = isActive ? 'Inactive' : 'Active';

    this.alertsComponent.showConfirmDialog({
      message: `Are you sure you want to set ${member.name} as ${newStatus}?`,
      header: 'Change User Status',
      icon: 'pi pi-user-edit',
      acceptLabel: `Set ${newStatus}`,
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'warn',
      acceptSummary: 'Status Changed',
      rejectSummary: 'Cancelled',
      acceptDetail: `${member.name} is now ${newStatus}.`,
      rejectDetail: 'No changes were made.',
      onAccept: () => {
        const call$ = newStatus === 'Active'
          ? this.userApi.setUserActive(member.userId)
          : this.userApi.setUserInactive(member.userId);

        call$.subscribe({
          next: () => {
            member.status1 = newStatus;
            console.log(`${member.name} status changed to ${newStatus}`);
          },
          error: err => console.error('Status change failed:', err)
        });
      },
      onReject: () => {
        console.log('Status change cancelled.');
      }
    });
  }

  actionMethods = {
    'Edit': (member: any) => this.userStatus(member)
  };

  handleSelectedMember(member: any) {
    this.alertsComponent.showConfirmDialog({
      message: `Are you sure you want to set ${member.fullName} as the new Recruiter Head?`,
      header: 'Change Recruiter Head',
      icon: 'pi pi-user-plus',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'warn',
      acceptSummary: 'Updated',
      rejectSummary: 'Cancelled',
      acceptDetail: `${member.fullName} is now the Recruiter Head.`,
      rejectDetail: 'No changes were made.',
      onAccept: () => {
        this.userApi.setRecruiterHead(member.userId).subscribe({
          next: () => {
            console.log(`${member.fullName} set as new Recruiter Head`);
            this.refreshUserList();
          },
          error: err => console.error('Failed to set recruiter head:', err)
        });
      },
      onReject: () => {
        console.log('Recruiter Head change cancelled.');
      }
    });
  }

  openModal(): void {
    this.visible = !this.visible;
  }

  openAssignPopover(event: MouseEvent): void {
    if (event) {
      this.assignBox.open(event);
    } else {
      console.warn('No event passed to open popover');
    }
  }

  onChangeClick(): void {
    this.showAssignList = true;
  }

  toggleAssignList(): void {
    this.showAssignList = !this.showAssignList;
  }

  recruitersIcons = [
    { iconName: 'dashboard', size: '32px', iconColour: 'red' },
    { iconName: 'home', size: '32px', iconColour: 'blue' },
    { iconName: 'delete', size: '32px', iconColour: 'green' }
  ];

  columns: Array<{ key: string, label: string, filterable: boolean, type?: string }> = [
    { key: 'id', label: 'Employee ID', filterable: false },
    { key: 'name', label: 'Name', filterable: true },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'role', label: 'Role Title', filterable: true },
    { key: 'location', label: 'Location', filterable: false },
    { key: 'deliveryUnit', label: 'Delivery Unit', filterable: false },
    { key: 'email', label: 'Email', filterable: false },
    { key: 'status1', label: 'Status', filterable: true },
    { key: 'actions', label: 'Actions', filterable: false ,type:'actions'},
  ];

  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions');
}
