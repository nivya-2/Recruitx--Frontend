import { Component,OnInit } from '@angular/core';
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
export class ShortlistComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  currentUrl:any;
  visible: boolean = false;
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    

  }
 onShortlist = (row: any) => {
    // 1. Get the actual ID from the clicked row.
    // In your static data, it's a string like 'CAN006', but for the real test, it should be a number.
    // Let's assume you have a real interviewId on the row object.
    const interviewId = row.id; // Or row.interviewId if you have it.

    if (!interviewId) {
      console.error("Row is missing an ID to navigate with.", row);
      return;
    }

  // this.visible = !this.visible;
   let navigationPath: any[] = [];
    if (this.currentUrl.startsWith('/recruiter-lead')) {
      navigationPath = ['/recruiter-lead/interviews/shortlist/eval-form', interviewId];
    } else if (this.currentUrl.startsWith('/recruiter')) {
      navigationPath = ['/recruiter/interviews/shortlist/eval-form', interviewId];
    }
    
    if (navigationPath.length > 0) {
      this.router.navigate(navigationPath);
    }
  };

// onViewJD = (row: any) => {
//   this.router.navigate(['/recruiter/job-description/details']);
//   console.log('View JD for:', row);
// };



  actionMethods={'Shortlist': this.onShortlist };

awaitingShortlistingDataSource: any[] = [
    { id: '456', name: 'Aswin A', interviewDate: '17/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist']},
    { id: 'CAN002', name: 'Priya Sharma', interviewDate: '10/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist']},
    { id: 'CAN004', name: 'Aarav Mehta', interviewDate: '09/04/2025', interviewType: 'Technical L1' , actions: ['Shortlist'] },
    { id: 'CAN010', name: 'Rohan Kapoor', interviewDate: '17/04/2025', interviewType: 'Technical L2' , actions: ['Shortlist'] },
    { id: 'CAN005', name: 'Ananya Iyer', interviewDate: '08/04/2025', interviewType: 'Technical L2' , actions: ['Shortlist'] },
    { id: 'CAN003', name: 'Karan Malhotra', interviewDate: '07/04/2025', interviewType: 'Technical L2' , actions: ['Shortlist'] },
    { id: 'CAN001', name: 'Vivek Reddy', interviewDate: '06/04/2025', interviewType: 'Management' , actions: ['Shortlist'] },
    { id: 'CAN007', name: 'Nisha Patel', interviewDate: '13/04/2025', interviewType: 'Management' , actions: ['Shortlist'] },
    { id: 'CAN008', name: 'Arjun Bansal', interviewDate: '04/04/2025', interviewType: 'Management' , actions: ['Shortlist'] }
  ];

  awaitingColumns: Array<{ key: string, label: string, filterable: boolean,type?:string }> = [
  { key: 'id', label: 'Candidate ID', filterable: false },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'interviewDate', label: 'Interview Date', filterable: true , type: 'date' },
  { key: 'interviewType', label: 'Interview Type', filterable: true },
  { key: 'actions', label: 'Shortlist', filterable: false }  // placeholder for button
];
awaitingGlobalFilterFields = this.awaitingColumns.map(c => c.key).filter(k => k !== 'actions');
}
