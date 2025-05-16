import { Component } from '@angular/core';
import { CardsComponent } from "../../ui/cards/cards.component";
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';



@Component({
  selector: 'app-my-team',
  imports: [CardsComponent,TableComponent,HeaderTextComponent],
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss'
})
export class MyTeamComponent {
  handleRemove(row:any){

  }
  teamsDataSource: any[] = [
    { memberName: 'Mohith Gopal', jobTitle: 'Lead',status:'Active', joinedDate: '15/04/2025',actions:'Remove' },
    { memberName: "Priya Sharma", jobTitle: "Analyst", status: "Active", joinedDate: "01/03/2025", actions: "Remove" },
  { memberName: "Arun Kumar", jobTitle: "Engineer", status: "Active", joinedDate: "10/05/2024", actions: "Remove" },
  { memberName: "Sneha Nair", jobTitle: "Manager", status: "Active", joinedDate: "22/11/2023", actions: "Remove" },
  { memberName: "Rajesh Pillai", jobTitle: "Developer", status: "Inactive", joinedDate: "05/07/2024", actions: "Remove" },
  { memberName: "Divya Menon", jobTitle: "Designer", status: "Active", joinedDate: "18/01/2025", actions: "Remove" },
  { memberName: "Vikram Singh", jobTitle: "Lead", status: "Active", joinedDate: "28/08/2024", actions: "Remove" },
  { memberName: "Anjali Verma", jobTitle: "Associate", status: "Active", joinedDate: "12/06/2024", actions: "Remove" },
  { memberName: "Kiran Reddy", jobTitle: "Specialist", status: "Active", joinedDate: "03/09/2023", actions: "Remove" },
  { memberName: "Meera Krishnan", jobTitle: "Coordinator", status: "Active", joinedDate: "25/02/2025", actions: "Remove" },
  { memberName: "Suresh Babu", jobTitle: "Architect", status: "Inactive", joinedDate: "09/12/2024", actions: "Remove" },
  { memberName: "Geetha Lakshmi", jobTitle: "Tester", status: "Active", joinedDate: "17/04/2025", actions: "Remove" },
  { memberName: "Navin Patel", jobTitle: "Consultant", status: "Active", joinedDate: "30/10/2024", actions: "Remove" },
  { memberName: "Shalini Gupta", jobTitle: "Executive", status: "Active", joinedDate: "06/03/2023", actions: "Remove" },
  { memberName: "Ramesh Chandran", jobTitle: "Officer", status: "Active", joinedDate: "14/07/2023", actions: "Remove" },
  { memberName: "Swathi Iyer", jobTitle: "Trainee", status: "Active", joinedDate: "21/05/2024", actions: "Remove" },
  { memberName: "Amit Verma", jobTitle: "Director", status: "Active", joinedDate: "04/01/2024", actions: "Remove" },
  { memberName: "Deepika Sharma", jobTitle: "Administrator", status: "Active", joinedDate: "19/09/2023", actions: "Remove" },
  { memberName: "Rahul Nair", jobTitle: "Senior Dev", status: "Active", joinedDate: "27/06/2024", actions: "Remove" },
  { memberName: "Pooja Singh", jobTitle: "HR Manager", status: "Active", joinedDate: "11/02/2024", actions: "Remove" },
  { memberName: "Vivek Menon", jobTitle: "Team Lead", status: "Active", joinedDate: "23/08/2023", actions: "Remove" } 
  ];

  teamsColumns: Array<{ key: string, label: string, filterable: boolean }> = [
    { key: 'memberName', label: 'Name', filterable: false },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'status', label: 'Status', filterable: false },
    { key: 'joinedDate', label: 'Joined Date', filterable: false },
    { key: 'actions', label: 'Action', filterable: false },

    

  ];

  teamsGlobalFilterFields = this.teamsColumns.map(c => c.key).filter(key => key !== 'actions');




}
