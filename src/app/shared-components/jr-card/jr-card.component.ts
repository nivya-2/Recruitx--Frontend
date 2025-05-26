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





@Component({
  selector: 'app-jr-card',
  imports: [AssignComponent, CardModule, AvatarModule, DropdownModule, ButtonModule, NgFor, NgClass, ButtonComponent, ProfileBoxComponent, ButtonIconComponent, IconComponent, CommonModule, ToastComponent],
  templateUrl: './jr-card.component.html',
  styleUrl: './jr-card.component.scss'
})
export class JrCardComponent {
  @Input() name: string = 'Arthur Pendragon';
  @Input() role: string = 'Tech Lead';
  jobDetails = {
    jobTag:'Urgent',
    requisitionId: 'REQ–2025–DSCV–006',
    jobTitle: 'Data Scientist – Computer Vision',
    deliveryUnit: 'DU6',
    team:'Advanced AI & ML Solutions',
    location: 'Kochi',
    openPositions: 6,
    raisedOn: 'April 2, 2025',
    hiringManager: 'Arjun Menon',
    recruiter: 'Not Assigned',
    qualifications: [
      "Bachelor’s/Master’s degree in Computer Science, Data Science, or related field.",
      "2+ years of hands-on experience in computer vision or a similar role.",
      "Strong portfolio or GitHub with previous CV projects preferred."
    ]
  };

  selectedMemberFromChild: any = null;

  handleSelectedMember(member: any) {
    this.selectedMemberFromChild = member;
  }
  
  teamList = [
  { fullName: 'Shankar Menon', role: 'Recruiter Head' },
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Jins K. Varghese', role: 'Associate Manager' },
  { fullName: 'Lakshmi S', role: 'Lead' },
  { fullName: 'Abhiram Prasad', role: 'Associate' },
  { fullName: 'Vinayak Sasi', role: 'Recruiter Head' },
  { fullName: 'Amal K', role: 'Senior Lead' },
  { fullName: 'Jins K. Varghese', role: 'Associate Manager' },
  { fullName: 'Sona Nair S', role: 'Lead' },
  { fullName: 'Sresh Krishna ', role: 'Associate' },
  { fullName: 'Shaju Vidhya', role: 'Recruiter Head' },
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
