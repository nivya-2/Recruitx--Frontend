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
    { memberName: 'Mohith Gopal', jobTitle: 'Lead', jobStatus: 'Active', joinedDate: '15/04/2025', jrAssigned: 1, efficiency: '12/45', actions: 'Remove' },
    { memberName: "Priya Sharma", jobTitle: "Analyst", jobStatus: "Active", joinedDate: "01/03/2025", jrAssigned: 2, efficiency: '23/50', actions: "Remove" },
    { memberName: "Arun Kumar", jobTitle: "Engineer", jobStatus: "Active", joinedDate: "10/05/2024", jrAssigned: 3, efficiency: '17/39', actions: "Remove" },
    { memberName: "Sneha Nair", jobTitle: "Manager", jobStatus: "Active", joinedDate: "22/11/2023", jrAssigned: 4, efficiency: '28/42', actions: "Remove" },
    { memberName: "Rajesh Pillai", jobTitle: "Developer", jobStatus: "Inactive", joinedDate: "05/07/2024", jrAssigned: 1, efficiency: '9/38', actions: "Remove" },
    { memberName: "Divya Menon", jobTitle: "Designer", jobStatus: "Active", joinedDate: "18/01/2025", jrAssigned: 2, efficiency: '31/55', actions: "Remove" },
    { memberName: "Vikram Singh", jobTitle: "Lead", jobStatus: "Active", joinedDate: "28/08/2024", jrAssigned: 3, efficiency: '25/48', actions: "Remove" },
    { memberName: "Anjali Verma", jobTitle: "Associate", jobStatus: "Active", joinedDate: "12/06/2024", jrAssigned: 4, efficiency: '14/37', actions: "Remove" },
    { memberName: "Kiran Reddy", jobTitle: "Specialist", jobStatus: "Active", joinedDate: "03/09/2023", jrAssigned: 1, efficiency: '19/44', actions: "Remove" },
    { memberName: "Meera Krishnan", jobTitle: "Coordinator", jobStatus: "Active", joinedDate: "25/02/2025", jrAssigned: 2, efficiency: '22/47', actions: "Remove" },
    { memberName: "Suresh Babu", jobTitle: "Architect", jobStatus: "Inactive", joinedDate: "09/12/2024", jrAssigned: 3, efficiency: '16/41', actions: "Remove" },
    { memberName: "Geetha Lakshmi", jobTitle: "Tester", jobStatus: "Active", joinedDate: "17/04/2025", jrAssigned: 4, efficiency: '27/52', actions: "Remove" },
    { memberName: "Navin Patel", jobTitle: "Consultant", jobStatus: "Active", joinedDate: "30/10/2024", jrAssigned: 1, efficiency: '18/43', actions: "Remove" },
    { memberName: "Shalini Gupta", jobTitle: "Executive", jobStatus: "Active", joinedDate: "06/03/2023", jrAssigned: 2, efficiency: '29/56', actions: "Remove" },
    { memberName: "Ramesh Chandran", jobTitle: "Officer", jobStatus: "Active", joinedDate: "14/07/2023", jrAssigned: 3, efficiency: '11/36', actions: "Remove" },
    { memberName: "Swathi Iyer", jobTitle: "Trainee", jobStatus: "Active", joinedDate: "21/05/2024", jrAssigned: 4, efficiency: '20/45', actions: "Remove" },
    { memberName: "Amit Verma", jobTitle: "Director", jobStatus: "Active", joinedDate: "04/01/2024", jrAssigned: 1, efficiency: '33/58', actions: "Remove" },
    { memberName: "Deepika Sharma", jobTitle: "Administrator", jobStatus: "Active", joinedDate: "19/09/2023", jrAssigned: 2, efficiency: '15/40', actions: "Remove" },
    { memberName: "Rahul Nair", jobTitle: "Senior Dev", jobStatus: "Active", joinedDate: "27/06/2024", jrAssigned: 3, efficiency: '26/49', actions: "Remove" },
    { memberName: "Pooja Singh", jobTitle: "HR Manager", jobStatus: "Active", joinedDate: "11/02/2024", jrAssigned: 4, efficiency: '21/46', actions: "Remove" },
    { memberName: "Vivek Menon", jobTitle: "Team Lead", jobStatus: "Active", joinedDate: "23/08/2023", jrAssigned: 1, efficiency: '24/51', actions: "Remove" }
  ];

  teamsColumns: Array<{ key: string, label: string, filterable: boolean }> = [
    { key: 'memberName', label: 'Name', filterable: false },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'jobStatus', label: 'Status', filterable: false },
    { key: 'joinedDate', label: 'Joined Date', filterable: false },
    { key: 'jrAssigned', label: 'JR Assigned', filterable: false },
    { key: 'efficiency', label: 'Positions Filled', filterable: false },
    { key: 'actions', label: 'Action', filterable: false },

    

  ];

  teamsGlobalFilterFields = this.teamsColumns.map(c => c.key).filter(key => key !== 'actions');




}
