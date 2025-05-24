import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from "../../ui/cards/cards.component";
import { TableComponent } from '../../shared-components/table/table.component';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';



@Component({
  selector: 'app-my-team',
  imports: [CardsComponent, TableComponent, ButtonComponent, NgIf],
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss'
})
export class MyTeamComponent {
  handleRemove(row:any){

  }
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

}
