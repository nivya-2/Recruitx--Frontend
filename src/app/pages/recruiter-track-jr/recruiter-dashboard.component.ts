import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';

@Component({
  selector: 'app-recruiter-dashboard',
  imports: [CommonLayoutComponent,CardsComponent,HeaderTextComponent,TableComponent],
  templateUrl: './recruiter-dashboard.component.html',
  styleUrl: './recruiter-dashboard.component.scss'
})
export class RecruiterDashboardComponent {
  scheduledInterviewsDataSource: any[] = [
    { id: 'CAN009', name: 'Arjun Menon', interviewDate: '15/04/2025' },
    { id: 'CAN005', name: 'Alia V', interviewDate: '15/04/2025' },
    { id: 'CAN012', name: 'Kavya Nair', interviewDate: '16/04/2025' }
  ];

  scheduledColumns: Array<{ key: string, label: string, filterable: boolean,type?:string }> = [
    { key: 'id', label: 'Candidate ID', filterable: false },
    { key: 'name', label: 'Name', filterable: true },
    { key: 'interviewDate', label: 'Interview Date', filterable: true, type: 'date' }
  ];

  scheduledGlobalFilterFields = this.scheduledColumns.map(c => c.key);


  completedInterviewsDataSource: any[] = [
    { id: 'CAN014', name: 'Tanvi Rao', interviewDate: '12/04/2025' },
    { id: 'CAN011', name: 'Rajat Verma', interviewDate: '11/04/2025' },
    { id: 'CAN015', name: 'Aditya Pillai', interviewDate: '16/04/2025' }
  ];

  completedColumns: Array<{ key: string, label: string, filterable: boolean, type?:string }> = [
  { key: 'id', label: 'Candidate ID', filterable: false },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'interviewDate', label: 'Interview Date', filterable: true, type: 'date' }
];

completedGlobalFilterFields = this.completedColumns.map(c => c.key);


  awaitingShortlistingDataSource: any[] = [
    { id: 'CAN006', name: 'Aswin A', interviewDate: '17/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist']},
    { id: 'CAN002', name: 'Priya Sharma', interviewDate: '10/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist']},
    { id: 'CAN004', name: 'Aarav Mehta', interviewDate: '09/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist'] },
    { id: 'CAN010', name: 'Rohan Kapoor', interviewDate: '17/04/2025', interviewType: 'Technical L2' , actions:['Shortlist'] },
    { id: 'CAN005', name: 'Ananya Iyer', interviewDate: '08/04/2025', interviewType: 'Technical L2' , actions: ['Shortlist'] },
    { id: 'CAN003', name: 'Karan Malhotra', interviewDate: '07/04/2025', interviewType: 'Technical L2' , actions: ['Shortlist'] },
    { id: 'CAN001', name: 'Vivek Reddy', interviewDate: '06/04/2025', interviewType: 'Management' , actions: ['Shortlist'] },
    { id: 'CAN007', name: 'Nisha Patel', interviewDate: '13/04/2025', interviewType: 'Management' , actions: ['Shortlist'] },
    { id: 'CAN008', name: 'Arjun Bansal', interviewDate: '04/04/2025', interviewType: 'Management' , actions: ['Shortlist'] }
  ];

  awaitingColumns: Array<{ key: string, label: string, filterable: boolean, type?:string }> = [
  { key: 'id', label: 'Candidate ID', filterable: false },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'interviewDate', label: 'Interview Date', filterable: true, type: 'date' },
  { key: 'interviewType', label: 'Interview Type', filterable: true },
  { key: 'actions', label: 'Shortlist', filterable: false }  // placeholder for button
];

awaitingGlobalFilterFields = this.awaitingColumns.map(c => c.key).filter(k => k !== 'actions');

}
