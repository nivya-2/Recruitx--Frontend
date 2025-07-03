import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../ui/cards/cards.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { ShortlistInfoComponent } from './shortlist-info/shortlist-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewServiceService,InterviewDTO } from '../../core/services/api/interview-service.service';


@Component({
  selector: 'app-shortlist',
  imports: [ShortlistInfoComponent,ButtonComponent,ModalComponent,TableComponent,NgFor],
  templateUrl: './shortlist.component.html',
  styleUrl: './shortlist.component.scss'
})
export class ShortlistComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute ,private interviewService: InterviewServiceService) {}
  currentUrl:any;
  visible: boolean = false;
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.interviewService.getToShortlistInterviews().subscribe({
    next: data => {
      this.awaitingShortlistingDataSource = Array.isArray(data)
  ? data.map(d => ({
      ...d,
      jdId: `EXP_${d.jdId.toString().padStart(3, '0')}`
    }))
  : [];
    },
    error: err => console.error('Failed to load shortlist data', err)
  });
  }
  
  onShortlist = (row: any) => {
  // this.visible = !this.visible;
      const interviewId = row.id; // Or row.interviewId if you have it.
 if (!interviewId) {
      console.error("Row is missing an ID to navigate with.", row);
      return;
    }

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

awaitingShortlistingDataSource: any[] = [];
  awaitingColumns: Array<{ key: string, label: string, filterable: boolean,type?:string }> = [
  { key: 'id', label: 'Candidate ID', filterable: false },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'jdId', label: 'Job Description ID', filterable: false },
  { key: 'interviewDate', label: 'Interview Date', filterable: true , type: 'date' },
  { key: 'interviewType', label: 'Interview Type', filterable: true },
  { key: 'actions', label: 'Shortlist', filterable: false , type:'actions'}  // placeholder for button
];
awaitingGlobalFilterFields = this.awaitingColumns.map(c => c.key).filter(k => k !== 'actions');
}
