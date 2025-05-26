import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from "../../ui/cards/cards.component";
import { TreeTableComponent } from "./tree-table/tree-table.component";
import { TreeNode } from 'primeng/api';
import { ModalComponent } from "../../ui/modal/modal.component";
import { ViewassignedjrCardComponent } from "../../shared-components/viewassignedjr-card/viewassignedjr-card.component";
import { AssignComponent } from "../../ui/assign/assign.component";
import { ButtonComponent } from "../../ui/button/button.component";

@Component({
  selector: 'app-my-team-rh',
  imports: [CardsComponent, TreeTableComponent, ModalComponent, ViewassignedjrCardComponent, AssignComponent, ButtonComponent],
  templateUrl: './my-team-rh.component.html',
  styleUrl: './my-team-rh.component.scss'
})
export class MyTeamRhComponent {

    teamsDataSource: TreeNode[] = []; 

  rawTeamData = [
  { memberName: "Vivek Menon", jobTitle: "Team Lead", jrAssigned: 1, actions: ['View assigned JR','Remove'] },
  { memberName: "Amit Verma", jobTitle: "Team Lead", jrAssigned: 1, actions: ['View assigned JR','Remove'] },
  { memberName: "Meera Krishnan", jobTitle: "Coordinator", jrAssigned: 2, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] },
  { memberName: "Suresh Babu", jobTitle: "Architect", jrAssigned: 3, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  { memberName: "Geetha Lakshmi", jobTitle: "Tester", jrAssigned: 4, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] },
  { memberName: "Navin Patel", jobTitle: "Consultant", jrAssigned: 1, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  { memberName: "Shalini Gupta", jobTitle: "Executive", jrAssigned: 2, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  { memberName: "Ramesh Chandran", jobTitle: "Officer", jrAssigned: 3, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] },
  { memberName: "Swathi Iyer", jobTitle: "Trainee", jrAssigned: 4, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  { memberName: "Deepika Sharma", jobTitle: "Administrator", jrAssigned: 2, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] },
  { memberName: "Rahul Nair", jobTitle: "Senior Dev", jrAssigned: 3, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  { memberName: "Pooja Singh", jobTitle: "HR Manager", jrAssigned: 4, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] }
];


 teamsColumns: Array<{ key: string, label: string, filterable: boolean }> = [
    { key: 'memberName', label: 'Name', filterable: false },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'jrAssigned', label: 'JR Assigned', filterable: false },
    { key: 'actions', label: 'Actions', filterable: false }

  ];

  teamsGlobalFilterFields = this.teamsColumns.map(c => c.key).filter(key => key !== 'actions');
  
  visible: boolean = false;  
  

  ngOnInit() {
  this.teamsDataSource = this.buildTreeData(this.rawTeamData);
}


buildTreeData(data: any[]): TreeNode[] {
  // First find all team leads
  const leads = data.filter(member => member.jobTitle === 'Team Lead');
  
  // Then build the tree structure
  return leads.map(lead => {
    // Find all members who report to this lead
    const children = data.filter(member => 
      member.reportingLead === lead.memberName
    );
    
    return {
      key: lead.memberName, // Using name as key for simplicity
      data: lead,
      expanded: false, // Expand leads by default
      children: children.map(member => ({
        key: member.memberName,
        data: member,
        leaf: true // Mark as leaf node (no further children)
      }))
    };
  });
}

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

handleSelectedMember(member: any) {
  const message = `Are you sure you want to add ${member.fullName} as a Recruiter lead?`;
  
  this.alertsComponent.showConfirmDialog({
    message: message,
    header: 'Add Team Lead',
    icon: 'pi pi-user-plus',
    acceptLabel: 'Add',
    rejectLabel: 'Cancel',
    acceptSeverity: 'success',
    rejectSeverity: 'warn',
    acceptSummary: 'Added',
    rejectSummary: 'Cancelled',
    acceptDetail: `Added ${member.fullName} as a team lead!`,
    rejectDetail: 'No changes were made.',
    onAccept: () => {
      console.log(`${member.fullName} added as team lead.`);
    },
    onReject: () => {
      console.log('Addition cancelled.');
    }
  });
}
removeSelectedMember(member: any) {
  const message = `Are you sure you want to remove ${member.memberName}?`;
  
  this.alertsComponent.showConfirmDialog({
    message: message,
    header: 'Remove Recruiter Lead',
    icon: 'pi pi-user-minus',
    acceptLabel: 'Remove',
    rejectLabel: 'Cancel',
    acceptSeverity: 'error',
    rejectSeverity: 'info',
    acceptSummary: 'Removed',
    rejectSummary: 'Cancelled',
    acceptDetail: `Removed ${member.memberName}!`,
    rejectDetail: 'No changes were made.',
    onAccept: () => {
    },
    onReject: () => {
    }
  });
}




