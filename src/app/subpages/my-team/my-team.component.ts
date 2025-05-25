import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from "../../ui/cards/cards.component";
import { TableComponent } from '../../shared-components/table/table.component';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { AssignComponent } from '../../ui/assign/assign.component';
import { ModalComponent } from "../../ui/modal/modal.component";
import { ViewassignedjrCardComponent } from "../../shared-components/viewassignedjr-card/viewassignedjr-card.component";



@Component({
  selector: 'app-my-team',
  imports: [CardsComponent, TableComponent, ButtonComponent,AssignComponent, ModalComponent, ViewassignedjrCardComponent],
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss'
})
export class MyTeamComponent {
visible: boolean = false;

 onViewAssignedJR = (row: any) => {
  this.visible = !this.visible;
  console.log('View assigned JR for:', row);
};

handleRemove = (row: any) => {
  console.log('Remove action for:', row);
};

  actionMethods={'View assigned JR': this.onViewAssignedJR,    'Remove': this.handleRemove  };

  teamsDataSource: any[] = [
    { memberName: 'Mohith Gopal', jobTitle: 'Lead',  jrAssigned: 1, actions: ['View assigned JR','Remove'] },
    { memberName: "Priya Sharma", jobTitle: "Analyst",  jrAssigned: 2,  actions: ['View assigned JR','Remove'] },
    { memberName: "Arun Kumar", jobTitle: "Engineer",  jrAssigned: 3,   actions: ['View assigned JR','Remove'] },
    { memberName: "Sneha Nair", jobTitle: "Manager", jrAssigned: 4,  actions: ['View assigned JR','Remove'] },
    { memberName: "Rajesh Pillai", jobTitle: "Developer",jrAssigned: 1,   actions: ['View assigned JR','Remove'] },
    { memberName: "Divya Menon", jobTitle: "Designer", jrAssigned: 2,   actions: ['View assigned JR','Remove'] },
    { memberName: "Vikram Singh", jobTitle: "Lead", jrAssigned: 3,   actions: ['View assigned JR','Remove']},
    { memberName: "Anjali Verma", jobTitle: "Associate", jrAssigned: 4,   actions: ['View assigned JR','Remove'] },
    { memberName: "Kiran Reddy", jobTitle: "Specialist",  jrAssigned: 1,   actions: ['View assigned JR','Remove'] },
    { memberName: "Meera Krishnan", jobTitle: "Coordinator",  jrAssigned: 2,   actions: ['View assigned JR','Remove'] },
    { memberName: "Suresh Babu", jobTitle: "Architect",  jrAssigned: 3,   actions: ['View assigned JR','Remove'] },
    { memberName: "Geetha Lakshmi", jobTitle: "Tester", jrAssigned: 4,  actions: ['View assigned JR','Remove'] },
    { memberName: "Navin Patel", jobTitle: "Consultant", jrAssigned: 1,   actions: ['View assigned JR','Remove'] },
    { memberName: "Shalini Gupta", jobTitle: "Executive",  jrAssigned: 2,   actions: ['View assigned JR','Remove'] },
    { memberName: "Ramesh Chandran", jobTitle: "Officer", jrAssigned: 3,  actions: ['View assigned JR','Remove'] },
    { memberName: "Swathi Iyer", jobTitle: "Trainee",  jrAssigned: 4,  actions: ['View assigned JR','Remove'] },
    { memberName: "Amit Verma", jobTitle: "Director",jrAssigned: 1,  actions: ['View assigned JR','Remove'] },
    { memberName: "Deepika Sharma", jobTitle: "Administrator", jrAssigned: 2, actions: ['View assigned JR','Remove'] },
    { memberName: "Rahul Nair", jobTitle: "Senior Dev",jrAssigned: 3, actions: ['View assigned JR','Remove'] },
    { memberName: "Pooja Singh", jobTitle: "HR Manager", jrAssigned: 4, actions: ['View assigned JR','Remove'] },
    { memberName: "Vivek Menon", jobTitle: "Team Lead", jrAssigned: 1,  actions: ['View assigned JR','Remove'] }
  ];

  teamsColumns: Array<{ key: string, label: string, filterable: boolean }> = [
    { key: 'memberName', label: 'Name', filterable: false },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'jrAssigned', label: 'JR Assigned', filterable: false },
    { key: 'actions', label: 'Actions', filterable: false },

    

  ];

  teamsGlobalFilterFields = this.teamsColumns.map(c => c.key).filter(key => key !== 'actions');
teamList = [
  { fullName: 'Shankar Menon', role: 'Recruiter Head' },
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Jins K. Varghese', role: 'Associate Manager' },
  { fullName: 'Lakshmi S', role: 'Lead' },
  { fullName: 'George Philip', role: 'Associate' },
  { fullName: 'Shankar Menon', role: 'Recruiter Head' },
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Jins K. Varghese', role: 'Associate Manager' },
  { fullName: 'Lakshmi S', role: 'Lead' },
  { fullName: 'George Philip', role: 'Associate' },{ fullName: 'Shankar Menon', role: 'Recruiter Head' },
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Jins K. Varghese', role: 'Associate Manager' },
  { fullName: 'Lakshmi S', role: 'Lead' },
  { fullName: 'George Philip', role: 'Associate' }
];

selectedMember: any;

onRecruiterSelected(member: any) {
  this.selectedMember = member;
  console.log('Selected:', member);
}
lastClickEvent: MouseEvent | null = null;

@ViewChild('assignBox') assignBox!: AssignComponent;

ngAfterViewInit() {
  // Optional: safeguard to ensure the ViewChild is ready
}

onHostClick(event: MouseEvent) {
  this.lastClickEvent = event;
}

openAssignPopover() {
  if (this.lastClickEvent) {
    this.assignBox.open(this.lastClickEvent);
  } else {
    console.warn('No click event captured to open popover');
  }
}

}
