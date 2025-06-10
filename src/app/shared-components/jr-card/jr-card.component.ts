
import { Component,Output, EventEmitter , Input,ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ButtonComponent } from "../../ui/button/button.component";
import { ProfileBoxComponent } from "../../ui/profile-box/profile-box.component";
import { IconComponent } from '../../ui/icon/icon.component';
import { ButtonIconComponent } from "../../ui/button-icon/button-icon.component";
import { AssignJrComponent } from '../../subpages/assign-jr/assign-jr.component';
import { AssignComponent } from '../../ui/assign/assign.component';
import { ToastComponent } from "../../ui/toast/toast.component";
import { UserApiService } from '../../core/services/api/user-api-service.service';
import {AssignJrPayload, JrApiService} from '../../core/services/api/jr-api.service';



@Component({
  selector: 'app-jr-card',
  imports: [AssignComponent, CardModule, AvatarModule, DropdownModule, ButtonModule, NgFor, NgClass, ButtonComponent, ProfileBoxComponent, ButtonIconComponent, IconComponent, CommonModule, ToastComponent],
  templateUrl: './jr-card.component.html',
  styleUrl: './jr-card.component.scss'
})
export class JrCardComponent {
  constructor(private userService: UserApiService,private jrService: JrApiService) {
    
  }

  ngOnInit() {
  this.loadTeamList();
}
loadTeamList(): void {
  this.userService.getAllUsers().subscribe({
    next: users => {
      this.teamList = users
        .filter(user =>  user.roleTitle=='Recruiter Lead' || user.roleTitle=='Recruiter') // Exclude Recruiter Head
        .map(user => ({
          id: user.userId,
          fullName: user.name,
          role: user.roleTitle
        }));
    },
    error: err => {
      console.error('Failed to fetch team list:', err);
      this.teamList = []; // fallback to empty if needed
    }
  });
}
 name: string = 'Arthur Pendragon';
 role: string = 'Tech Lead';
  @Input() jobDetails: any = null; // This will hold the job details object

  selectedMemberFromChild: any = null;

  handleSelectedMember(member: any): void {
        this.selectedMemberFromChild = member;

    const userid = member.id;
    console.log('Selected member:', userid);
    console.log('Job requisition ID:', this.jobDetails.id);

    const payload: AssignJrPayload = {
      jobRequisitionId: this.jobDetails.id,
      assignedTo: userid
    };
    console.log('Payload for assignment:', payload);
    this.jrService.assignJobRequisition(this.jobDetails.id, payload).subscribe({
      next: (res) => console.log('Assignment successful:', res),
      error: (err) => console.error('Error assigning job requisition:', err)
    });
  }

  teamList = [
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Tom Philip', role: 'Associate Manager' },
  { fullName: 'Lakshmi S', role: 'Lead' },
  { fullName: 'Abhiram Prasad', role: 'Associate' },
  { fullName: 'Amal K', role: 'Senior Lead' },
  { fullName: 'Tom Philip', role: 'Associate Manager' },
  { fullName: 'Sona Nair S', role: 'Lead' },
  { fullName: 'Sresh Krishna ', role: 'Associate' },
  { fullName: 'Dennis Vakkachan', role: 'Senior Lead' },
  { fullName: 'Varghese Kuryan', role: 'Associate Manager' },
  { fullName: 'Ali Akbar S', role: 'Lead' },
  { fullName: ' Philip Cheriyan', role: 'Associate' }
];

selectedMember: any;

onRecruiterSelected(member: any) {
  this.selectedMember = member;
  console.log('Selected:', member);
}

@ViewChild('assignBox') assignBox!: AssignComponent;
@Output() assignCompleted = new EventEmitter<void>();

openAssignPopover(event: MouseEvent) {
  if (event) {
    this.assignBox.open(event);
  } else {
    console.warn('No event passed to open popover');
  }
}
triggerToast(toastComponent: any) {

  const selectedName = this.selectedMemberFromChild?.fullName || 'No recruiter selected';
  toastComponent.toastData = {
      severity: 'success',
      summary: 'Assigned',
      detail: `${selectedName} has been assigned successfully!`
    };
  toastComponent.showToast();
  const assignedMember = this.selectedMemberFromChild;  
  this.assignCompleted.emit(assignedMember);
  
}
assignClick() {
  const assignedMember = this.selectedMemberFromChild;  // or however you store the assigned member

  // Emit the selected member back to the parent
  this.assignCompleted.emit(assignedMember);
}

}
