import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from "../../ui/cards/cards.component";
import { TreeTableComponent } from "./tree-table/tree-table.component";
import { TreeNode } from 'primeng/api';
import { ModalComponent } from "../../ui/modal/modal.component";
import { ViewassignedjrCardComponent } from "../../shared-components/viewassignedjr-card/viewassignedjr-card.component";
import { AssignComponent } from "../../ui/assign/assign.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { Team, MyTeamService } from '../../services/my-team.service';

@Component({
  selector: 'app-my-team-rh',
  imports: [CardsComponent, TreeTableComponent, ModalComponent, ViewassignedjrCardComponent, AssignComponent, ButtonComponent, AlertsComponent],
  templateUrl: './my-team-rh.component.html',
  styleUrl: './my-team-rh.component.scss'
})
export class MyTeamRhComponent {

  constructor(private myTeamService: MyTeamService) { }

  teamsDataSource: TreeNode[] = [];
  rawTeamData = [] as Team[]; // Initialize with an empty array of type Team

  //   rawTeamData = [
  //   { memberName: "Vivek Menon", jobTitle: "Team Lead", jrAssigned: 1, actions: ['View assigned JR','Change Lead'] },
  //   { memberName: "Amit Verma", jobTitle: "Team Lead", jrAssigned: 1, actions: ['View assigned JR','Change Lead'] },
  //   { memberName: "Meera Krishnan", jobTitle: "Coordinator", jrAssigned: 2, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Suresh Babu", jobTitle: "Architect", jrAssigned: 3, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Geetha Lakshmi", jobTitle: "Tester", jrAssigned: 4, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Navin Patel", jobTitle: "Consultant", jrAssigned: 1, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Shalini Gupta", jobTitle: "Executive", jrAssigned: 2, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Ramesh Chandran", jobTitle: "Officer", jrAssigned: 3, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Swathi Iyer", jobTitle: "Trainee", jrAssigned: 4, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Deepika Sharma", jobTitle: "Administrator", jrAssigned: 2, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Rahul Nair", jobTitle: "Senior Dev", jrAssigned: 3, reportingLead: "Amit Verma", actions: ['View assigned JR','Remove'] },
  //   { memberName: "Pooja Singh", jobTitle: "HR Manager", jrAssigned: 4, reportingLead: "Vivek Menon", actions: ['View assigned JR','Remove'] }
  // ];


  teamsColumns: Array<{ key: string, label: string, filterable: boolean }> = [
    { key: 'memberName', label: 'Name', filterable: false },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'jrAssigned', label: 'JR Assigned', filterable: false },
    { key: 'actions', label: 'Actions', filterable: false }

  ];
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
  teamsGlobalFilterFields = this.teamsColumns.map(c => c.key).filter(key => key !== 'actions');
  currentAction: 'add' | 'change' = 'add';
  currentMemberToChange: any = null;
  visible: boolean = false;
  selectedMemberFromChild: any = null;
  addButtonClickEvent: MouseEvent | null = null;
  lastClickEvent: MouseEvent | null = null;
  @ViewChild('assignBox') assignBox!: AssignComponent;
  @ViewChild('alerts') alertsComponent!: AlertsComponent;


  ngOnInit() {
    this.myTeamService.getTeamMembers().subscribe(response => {
      if (response && response.data) {
        this.rawTeamData = response.data;
        console.log('Raw Team Data:', this.rawTeamData);
        this.teamsDataSource = this.buildTreeData(this.rawTeamData);
        console.log('Tree Data Source:', this.teamsDataSource);

      }
    })

  }


  buildTreeData(data: any[]): TreeNode[] {
    // First find all team leads
    const leads = data.filter(member => member.reportingLead === null);
    console.log("Leads found:", leads);

    // Then build the tree structure
    return leads.map(lead => {
      // Find all members who report to this lead
      const children = data.filter(member =>
        member.reportingLead === lead.memberName
      );
      console.log("Children for lead", lead.memberName, ":", children);

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



  selectedMember: any;
  onRecruiterSelected(member: any) {
    this.selectedMember = member;
    console.log('Selected:', member);
  }


  ngAfterViewInit() {
    // Optional: safeguard to ensure the ViewChild is ready
  }

  onHostClick(event: MouseEvent) {
    console.log("onhostclick clicked")
    this.addButtonClickEvent = event;
  }

  assignedjr(userId: number): void {
    this.myTeamService.getAssignedJrs(userId).subscribe(response => {
      if (response && response.data) {

        console.log('Assigned JRs:', response.data);
        this.selectedMemberFromChild = response.data;
        this.visible = true; // Show the modal with assigned JRs
      } else {
        console.warn('No assigned JRs found for user ID:', userId);
      }
    }, error => {
      console.error('Error fetching assigned JRs:', error);
    });
  }

  handleChangeLeadAction(data: { row: any, event?: Event }) {
    console.log("Change lead action triggered", data);
    this.currentAction = 'change';
    this.currentMemberToChange = data.row;

    if (data.event && this.assignBox) {
      this.openAssignPopoverForChangeLead(data.event);
    } else {
      console.error("Missing event or assignBox:", {
        event: !!data.event,
        assignBox: !!this.assignBox
      });
    }
  }
  openAssignPopoverForAdd() {
    console.log("add button clicked");
    this.currentAction = 'add'; // Set action type to 'add'
    this.currentMemberToChange = null; // Clear any previous member

    if (this.addButtonClickEvent && this.assignBox) {
      this.assignBox.open(this.addButtonClickEvent);
    } else {
      console.warn('No add button click event captured');
    }
  }

  // Modified method for opening assign popover for Change Lead
  openAssignPopoverForChangeLead(event: Event) {
    console.log("change lead button clicked");
    if (this.assignBox && event) {
      this.assignBox.open(event);
    } else {
      console.warn('No change lead event available');
    }
  }
  handleSelectedMember(member: any) {
    if (this.currentAction === 'add') {
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
    } else if (this.currentAction === 'change') {
      this.changeLead(member, this.currentMemberToChange);
    }
  }
  removeSelectedMember(member: any) {
    const message = `Are you sure you want to remove ${member.memberName}?`;

    this.alertsComponent.showConfirmDialog({
      message: message,
      header: 'Remove Recruiter Lead',
      icon: 'pi pi-user-minus',
      acceptLabel: 'Remove',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
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
  changeLead(newMember: any, oldMember: any) {
    const message = `Are you sure you want to change ${oldMember.memberName}'s lead from ${oldMember.reportingLead || 'current lead'} to ${newMember.fullName}?`;

    this.alertsComponent.showConfirmDialog({
      message: message,
      header: 'Change Recruiter Lead',
      // icon: 'pi pi-exchange-alt',
      acceptLabel: 'Change',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'info',
      acceptSummary: 'Changed',
      rejectSummary: 'Cancelled',
      acceptDetail: `Changed ${oldMember.memberName}'s lead to ${newMember.fullName}!`,
      rejectDetail: 'No changes were made.',
      onAccept: () => {
        console.log(`${oldMember.memberName}'s lead changed to ${newMember.fullName}.`);
        // Add your logic to actually change the team lead here
        // You might want to update the rawTeamData and rebuild the tree
      },
      onReject: () => {
        console.log('Lead change cancelled.');
      }
    });
  }

}