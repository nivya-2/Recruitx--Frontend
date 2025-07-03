
import { Component, OnInit, ViewChild } from '@angular/core';
import { CardsComponent } from "../../ui/cards/cards.component";
import { TableComponent } from '../../shared-components/table/table.component';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { AssignComponent } from '../../ui/assign/assign.component';
import { ModalComponent } from "../../ui/modal/modal.component";
import { ViewassignedjrCardComponent } from "../../shared-components/viewassignedjr-card/viewassignedjr-card.component";
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { AssignedJr, MyTeamService, Team } from '../../core/services/api/my-team.service';



@Component({
  selector: 'app-my-team',
  imports: [CardsComponent, AlertsComponent,TableComponent, ButtonComponent,AssignComponent, ModalComponent, ViewassignedjrCardComponent],
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss'
})
export class MyTeamComponent implements OnInit {

selectedMemberJrs: AssignedJr[] = [];
visible: boolean = false;

 onViewAssignedJR = (row: any) => {
   if (!row || !row.userId) {
      console.log('Cannot fetch JRs, user ID is missing.');
      return;
    }

    console.log(`Fetching assigned JRs for user: ${row.memberName} (ID: ${row.userId})`);
    
    // Call the service to get the JRs for the selected user
    this.myTeamService.getAssignedJrs(row.userId).subscribe({
      next: (response) => {
        if (response && response.data && response.data.length > 0) {
          this.selectedMemberJrs = response.data;
          this.visible = true; // Show the modal
        } else {
        }
      },
      error: (err) => {
        console.error('Error fetching assigned JRs:', err);
      }
    });
};

handleRemove = (row: any) => {
  const message = `Are you sure you want to remove ${row.memberName}?`;
  
  this.alertsComponent.showConfirmDialog({
    message: message,
    header: 'Remove Recruiter Lead',
    icon: 'pi pi-user-minus',
    acceptLabel: 'Remove',
    rejectLabel: 'Cancel',
    acceptSeverity: 'success',
    rejectSeverity: 'warn',
    acceptSummary: 'Removed',
    rejectSummary: 'Cancelled',
    acceptDetail: `Removed ${row.memberName}!`,
    rejectDetail: 'No changes were made.',
    onAccept: () => {
    },
    onReject: () => {
    }
  });
};
teamsDataSource: Team[]=[]
  isLoading: boolean = false;
constructor(
    private myTeamService: MyTeamService,
  ) {}
  ngOnInit(): void {
    this.loadTeamMembers();
  }

  actionMethods={'View assigned JR': this.onViewAssignedJR,    'Remove': this.handleRemove  };

   loadTeamMembers(): void {
    this.isLoading = true;
    this.myTeamService.getMyRecruiters().subscribe({
      next: (response) => {
        // The API returns the data directly in the correct format, so no mapping is needed.
        this.teamsDataSource = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load team members:', err);
        this.isLoading = false;
      }
    });
  }

  
  // teamsDataSource: any[] = [
  //   { memberName: 'Mohith Gopal', jobTitle: 'Lead',  jrAssigned: 1, actions: ['View assigned JR','Remove'] },
  //   { memberName: "Priya Sharma", jobTitle: "Analyst",  jrAssigned: 2,  actions: ['View assigned JR','Remove'] },
  //   { memberName: "Arun Kumar", jobTitle: "Engineer",  jrAssigned: 3,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Sneha Nair", jobTitle: "Manager", jrAssigned: 4,  actions: ['View assigned JR','Remove'] },
  //   { memberName: "Rajesh Pillai", jobTitle: "Developer",jrAssigned: 1,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Divya Menon", jobTitle: "Designer", jrAssigned: 2,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Vikram Singh", jobTitle: "Lead", jrAssigned: 3,   actions: ['View assigned JR','Remove']},
  //   { memberName: "Anjali Verma", jobTitle: "Associate", jrAssigned: 4,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Kiran Reddy", jobTitle: "Specialist",  jrAssigned: 1,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Meera Krishnan", jobTitle: "Coordinator",  jrAssigned: 2,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Suresh Babu", jobTitle: "Architect",  jrAssigned: 3,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Geetha Lakshmi", jobTitle: "Tester", jrAssigned: 4,  actions: ['View assigned JR','Remove'] },
  //   { memberName: "Navin Patel", jobTitle: "Consultant", jrAssigned: 1,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Shalini Gupta", jobTitle: "Executive",  jrAssigned: 2,   actions: ['View assigned JR','Remove'] },
  //   { memberName: "Ramesh Chandran", jobTitle: "Officer", jrAssigned: 3,  actions: ['View assigned JR','Remove'] },
  //   { memberName: "Swathi Iyer", jobTitle: "Trainee",  jrAssigned: 4,  actions: ['View assigned JR','Remove'] },
  //   { memberName: "Amit Verma", jobTitle: "Director",jrAssigned: 1,  actions: ['View assigned JR','Remove'] },
  //   { memberName: "Deepika Sharma", jobTitle: "Administrator", jrAssigned: 2, actions: ['View assigned JR','Remove'] },
  //   { memberName: "Rahul Nair", jobTitle: "Senior Dev",jrAssigned: 3, actions: ['View assigned JR','Remove'] },
  //   { memberName: "Pooja Singh", jobTitle: "HR Manager", jrAssigned: 4, actions: ['View assigned JR','Remove'] },
  //   { memberName: "Vivek Menon", jobTitle: "Team Lead", jrAssigned: 1,  actions: ['View assigned JR','Remove'] }
  // ];

  teamsColumns: Array<{ key: string, label: string, filterable: boolean,type?:string }> = [
    { key: 'memberName', label: 'Name', filterable: false },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'jrAssigned', label: 'JR Assigned', filterable: false },
    { key: 'actions', label: 'Actions', filterable: false ,type:'actions'},

    

  ];

  teamsGlobalFilterFields = this.teamsColumns.map(c => c.key).filter(key => key !== 'actions');
teamList = [
  { fullName: 'Shankar Menon', role: 'Recruiter Head' },
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Tom Philip', role: 'Associate Manager' },
  { fullName: 'Lakshmi S', role: 'Lead' },
  { fullName: 'George Philip', role: 'Associate' },
  { fullName: 'Shankar Menon', role: 'Recruiter Head' },
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Tom Philip', role: 'Associate Manager' },
  { fullName: 'Lakshmi S', role: 'Lead' },
  { fullName: 'George Philip', role: 'Associate' },{ fullName: 'Shankar Menon', role: 'Recruiter Head' },
  { fullName: 'John V', role: 'Senior Lead' },
  { fullName: 'Tom Philip', role: 'Associate Manager' },
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
selectedMemberFromChild: any = null;
@ViewChild('alerts') alertsComponent!: AlertsComponent;

handleSelectedMember(member: any) {
  const message = `Are you sure you want to add ${member.fullName} to your team?`;
  
  this.alertsComponent.showConfirmDialog({
    message: message,
    header: 'Add Team Member',
    icon: 'pi pi-user-plus',
    acceptLabel: 'Add',
    rejectLabel: 'Cancel',
    acceptSeverity: 'success',
    rejectSeverity: 'warn',
    acceptSummary: 'Added',
    rejectSummary: 'Cancelled',
    acceptDetail: `Added ${member.fullName} to your team successfully!`,
    rejectDetail: 'No changes were made.',
    onAccept: () => {
      console.log(`${member.fullName} added as team lead.`);
    },
    onReject: () => {
      console.log('Addition cancelled.');
    }
  });
}

}