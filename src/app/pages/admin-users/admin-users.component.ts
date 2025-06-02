import { Component, ViewChild } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { ButtonIconComponent } from '../../ui/button-icon/button-icon.component';
import { ButtonComponent } from "../../ui/button/button.component";
import { AssignComponent } from "../../ui/assign/assign.component";
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { ModalComponent } from "../../ui/modal/modal.component";
import { UploadComponent } from "../../shared-components/upload/upload.component";
import { IconComponent } from '../../ui/icon/icon.component';

@Component({
  selector: 'app-admin-users',
  imports: [IconComponent, TableComponent, CommonLayoutComponent, AlertsComponent,
    CardsComponent, HeaderTextComponent, ButtonIconComponent, ButtonComponent, AssignComponent, ModalComponent, UploadComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {

    visible:boolean = false;
  openModal() {
    this.visible = !this.visible;
  }
    recruiterHeadName = "Neena Roy";
    recruiterHeadEmail="neena@experionglobal.com"

  dataSource: any[] = [
  { id: 'EMP877653', name: 'Alia K', jobTitle: 'Senior Executive', role: 'Recruiter', location: 'Kochi', deliveryUnit: 'DU6', email: 'test@mail.com', status1: 'Active', uploadedDate: '25-06-2025', actions: ['Edit'] },
  { id: 'EMP877654', name: 'Ravi M', jobTitle: 'HR Associate', role: 'Recruiter Lead', location: 'Bangalore', deliveryUnit: 'DU3', email: 'ravi.m@mail.com', status1: 'Active', uploadedDate: '24-06-2025', actions: ['Edit'] },
  { id: 'EMP877655', name: 'Neha S', jobTitle: 'Talent Specialist', role: 'Recruiter', location: 'Hyderabad', deliveryUnit: 'DU1', email: 'neha.s@mail.com', status1: 'Active', uploadedDate: '23-06-2025', actions:['Edit']},
  { id: 'EMP877656', name: 'Karan T', jobTitle: 'HR Executive', role: 'Recruiter Lead', location: 'Chennai', deliveryUnit: 'DU2', email: 'karan.t@mail.com', status1: 'Active', uploadedDate: '22-06-2025', actions: ['Edit'] },
  { id: 'EMP877657', name: 'Divya R', jobTitle: 'Senior Recruiter', role: 'Recruiter', location: 'Pune', deliveryUnit: 'DU4', email: 'divya.r@mail.com', status1: 'Active', uploadedDate: '21-06-2025', actions: ['Edit'] },
  { id: 'EMP877658', name: 'Amit J', jobTitle: 'Recruitment Lead', role: 'Recruiter Lead', location: 'Mumbai', deliveryUnit: 'DU7', email: 'amit.j@mail.com', status1: 'Active', uploadedDate: '20-06-2025', actions: ['Edit'] },
  { id: 'EMP877659', name: 'Sneha P', jobTitle: 'HR Partner', role: 'Recruiter', location: 'Delhi', deliveryUnit: 'DU5', email: 'sneha.p@mail.com', status1: 'Active', uploadedDate: '19-06-2025', actions:['Edit'] },
  { id: 'EMP877660', name: 'Rahul D', jobTitle: 'Staffing Specialist', role: 'Recruiter', location: 'Noida', deliveryUnit: 'DU2', email: 'rahul.d@mail.com', status1: 'Active', uploadedDate: '18-06-2025', actions: ['Edit'] },
  { id: 'EMP877661', name: 'Priya N', jobTitle: 'Senior HR', role: 'Recruiter Lead', location: 'Ahmedabad', deliveryUnit: 'DU6', email: 'priya.n@mail.com', status1: 'Active', uploadedDate: '17-06-2025', actions: ['Edit'] },
  { id: 'EMP877662', name: 'Arjun V', jobTitle: 'Recruitment Executive', role: 'Recruiter', location: 'Kolkata', deliveryUnit: 'DU1', email: 'arjun.v@mail.com', status1: 'Active', uploadedDate: '16-06-2025', actions: ['Edit'] }
]

    recruitersIcons=[
      {iconName:'dashboard',size:"32px",iconColour:"red"},
      {iconName:'home',size:"32px",iconColour:"blue"},
      {iconName:'delete',size:"32px",iconColour:"green"}
    ]

    columns: Array<{key: string, label: string, filterable: boolean,type?:string}> = [
      { key: 'id', label: 'Employee ID',filterable: false },
      { key: 'name', label: 'Name',filterable: true},
      { key: 'jobTitle', label: 'Job Title',filterable: true },
      { key: 'role', label: 'Role Title',filterable: true },
      { key: 'location', label: 'Location',filterable: false },
      { key: 'deliveryUnit', label: 'Delivery Unit',filterable: false },
      { key: 'email', label: 'Email',filterable: false },
      { key: 'status1', label: 'Status',filterable: true },
      { key: 'actions', label: 'Actions',filterable: false },
       { key: 'uploadedDate', label: 'Uploaded On',filterable: true, type: 'date' }
    ];

    globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions'); 

    teamList = [
      { fullName: 'Shankar Menon', role: 'Recruiter Head' },
      { fullName: 'John V', role: 'Senior Lead' },
      { fullName: 'Tom Philip', role: 'Associate Manager' },
      { fullName: 'Lakshmi S', role: 'Lead' },
      { fullName: 'Abhiram Prasad', role: 'Associate' },
      { fullName: 'Vinayak Sasi', role: 'Recruiter Head' },
      { fullName: 'Amal K', role: 'Senior Lead' },
      { fullName: 'Tom Philip', role: 'Associate Manager' },
      { fullName: 'Sona Nair S', role: 'Lead' },
      { fullName: 'Sresh Krishna ', role: 'Associate' },
      { fullName: 'Shaju Vidhya', role: 'Recruiter Head' },
      { fullName: 'Dennis Vakkachan', role: 'Senior Lead' },
      { fullName: 'Varghese Kuryan', role: 'Associate Manager' },
      { fullName: 'Ali Akbar S', role: 'Lead' },
      { fullName: ' Philip Cheriyan', role: 'Associate' }
    ];
    selectedMemberFromChild: any = null;
    
    handleSelectedMember(member: any) {
      const message = `Are you sure want to add ${member.fullName} as a Recruiter Head?`;
      this.alertsComponent.showConfirmDialog({
        message: message,
        header: 'Add Recruiter Head',
        icon: 'pi pi-user-plus',
        acceptLabel: 'Add',
        rejectLabel: 'Cancel',
        acceptSeverity: 'success',
        rejectSeverity: 'warn',
        acceptSummary: 'Added',
        rejectSummary: 'Cancelled',
        acceptDetail: `Added ${member.fullName} as the Recruiter Head!`,
        rejectDetail: 'No changes were made.',
        onAccept: () => {
          console.log(`${member.fullName} added as team lead.`);
        },
        onReject: () => {
          console.log('Addition cancelled.');
        }
      });
    }
    
    
    
    @ViewChild('assignBox') assignBox!: AssignComponent;

    openAssignPopover(event: MouseEvent) {
      if (event) {
        this.assignBox.open(event);
      } else {
        console.warn('No event passed to open popover');
      }
    }
    @ViewChild('alerts') alertsComponent!: AlertsComponent;


    onChangeClick(event: MouseEvent) {
      this.showAssignList = true;
    }
    showAssignList = false;

    toggleAssignList() {
      this.showAssignList = !this.showAssignList;
    }
    
    
}