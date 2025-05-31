import { Component } from '@angular/core';
import { CardsComponent } from '../../ui/cards/cards.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { ShortlistInfoComponent } from './shortlist-info/shortlist-info.component';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-shortlist',
  imports: [ShortlistInfoComponent,ButtonComponent,ModalComponent,TableComponent,NgFor],
  templateUrl: './shortlist.component.html',
  styleUrl: './shortlist.component.scss'
})
export class ShortlistComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  currentUrl:any;
  visible: boolean = false;
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    

  }
  onShortlist = (row: any) => {
  // this.visible = !this.visible;
  if (this.currentUrl.startsWith('/recruiter-lead')) {
    this.router.navigate(['/recruiter-lead/interviews/shortlist/eval-form']);

  } else if (this.currentUrl.startsWith('/recruiter')) {
  this.router.navigate(['/recruiter/interviews/shortlist/eval-form']);
};
}

// onViewJD = (row: any) => {
//   this.router.navigate(['/recruiter/job-description/details']);
//   console.log('View JD for:', row);
// };



  actionMethods={'Shortlist': this.onShortlist };

awaitingShortlistingDataSource: any[] = [
    { id: 'CAN006', name: 'Aswin A', interviewDate: '17/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist']},
    { id: 'CAN002', name: 'Priya Sharma', interviewDate: '10/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist']},
    { id: 'CAN004', name: 'Aarav Mehta', interviewDate: '09/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist'] },
    { id: 'CAN010', name: 'Rohan Kapoor', interviewDate: '17/04/2025', interviewType: 'Technical L2' , actions: ['Shortlist'] },
    { id: 'CAN005', name: 'Ananya Iyer', interviewDate: '08/04/2025', interviewType: 'Technical L2' , actions: ['Shortlist'] },
    { id: 'CAN003', name: 'Karan Malhotra', interviewDate: '07/04/2025', interviewType: 'Technical L2' , actions: ['Shortlist'] },
    { id: 'CAN001', name: 'Vivek Reddy', interviewDate: '06/04/2025', interviewType: 'Management' , actions: ['Shortlist'] },
    { id: 'CAN007', name: 'Nisha Patel', interviewDate: '13/04/2025', interviewType: 'Management' , actions: ['Shortlist'] },
    { id: 'CAN008', name: 'Arjun Bansal', interviewDate: '04/04/2025', interviewType: 'Management' , actions: ['Shortlist'] }
  ];

  awaitingColumns: Array<{ key: string, label: string, filterable: boolean }> = [
  { key: 'id', label: 'Candidate ID', filterable: false },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'interviewDate', label: 'Interview Date', filterable: false },
  { key: 'interviewType', label: 'Interview Type', filterable: true },
  { key: 'actions', label: 'Shortlist', filterable: false }  // placeholder for button
];
awaitingGlobalFilterFields = this.awaitingColumns.map(c => c.key).filter(k => k !== 'actions');
}
