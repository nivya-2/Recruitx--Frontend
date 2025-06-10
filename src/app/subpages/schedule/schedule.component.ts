import { Component } from '@angular/core';
import { TableComponent } from '../../shared-components/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InterviewServiceService,
  ToScheduleDto,
} from '../../core/services/api/interview-service.service';

@Component({
  selector: 'app-schedule',
  imports: [TableComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
  dataSource: any[] = [];
  recruitersIcons = [
    { iconName: 'dashboard', size: '32px', iconColour: 'red' },
    { iconName: 'home', size: '32px', iconColour: 'blue' },
    { iconName: 'delete', size: '32px', iconColour: 'green' },
  ];

  columns: Array<{
    key: string;
    label: string;
    filterable: boolean;
    type?: string;
  }> = [
      { key: 'id', label: 'ID', filterable: false },
      { key: 'roleTitle', label: 'Role Title', filterable: true },
      { key: 'deliveryUnit', label: 'Delivery Unit', filterable: true },
      { key: 'location', label: 'Location', filterable: true },
      { key: 'experience', label: 'Experience', filterable: false },
      {
        key: 'createdDate',
        label: 'Created Date',
        filterable: true,
        type: 'date',
      },
      // { key: 'assoJr', label: 'Associated JR',filterable: false },
      { key: 'actions', label: 'Actions', filterable: false, type: 'actions' },
    ];

  globalFilterFields = this.columns
    .map((c) => c.key)
    .filter((key) => key !== 'actions');
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private interviewService: InterviewServiceService
  ) { }
  currentUrl: any;
  visible: boolean = false;
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.interviewService.getToScheduleInterviews().subscribe({
      next: (data) => {
        this.dataSource = Array.isArray(data)
          ? data.map((d) => ({ ...d, id: `EXP_${d.id.toString().padStart(3, '0')}`,experience: `${d.experience} years`, originalId: d.id , actions: ['Schedule'] }))
          : [];

        console.log(' Schedule data loaded:', this.dataSource);
      },
      error: (err) => {
        console.error(' Failed to load schedule data', err);
      },
    });
  }
  // onSchedule = (row: any) => {
  //   if (this.currentUrl.startsWith('/recruiter-lead')) {
  //     this.router.navigate([
  //       'recruiter-lead/interviews/schedule/schedule-page',
  //     ]);
  //   } else if (this.currentUrl.startsWith('/recruiter')) {
  //     this.router.navigate(['/recruiter/interviews/schedule/schedule-page']);
  //   }
  // };
  onSchedule = (row: any) => {
    const jrId = row.originalId || row.id; // use the real id
    // const jdId = 4;
    if (this.currentUrl.startsWith('/recruiter-lead')) {
      this.router.navigate([
        'recruiter-lead/interviews/schedule/schedule-page',
        jrId,
      ]);
    } else if (this.currentUrl.startsWith('/recruiter')) {
      this.router.navigate([
        '/recruiter/interviews/schedule/schedule-page',
        jrId,
      ]);
    }
  };

  actionMethods = { Schedule: this.onSchedule };
}
