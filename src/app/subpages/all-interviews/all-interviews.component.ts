import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableComponent } from '../../shared-components/table/table.component';
import { InterviewServiceService, InterviewDTO } from '../../core/services/api/interview-service.service';

@Component({
  selector: 'app-all-interviews',
  standalone: true,
  imports: [SelectModule, FormsModule, TableComponent],
  templateUrl: './all-interviews.component.html',
  styleUrl: './all-interviews.component.scss'
})
export class AllInterviewsComponent implements OnInit {
  selectedView = 'upcoming';

  viewOptions = [
    { name: 'Upcoming', code: 'upcoming' },
    { name: 'Completed', code: 'completed' }
  ];

  interviewsData: InterviewDTO[] = [];
  columnData: any[] = [];
  globalFilterFields: string[] = [];

  upcomingInterviewsDataSource: InterviewDTO[] = [];
  completedInterviewsDataSource: InterviewDTO[] = [];

  upcomingColumns = [
    { key: 'candidateName', label: 'Candidate Name', filterable: false },
    { key: 'jobRole', label: 'Job Role', filterable: true },
    { key: 'jobDescription', label: 'Job Description ID', filterable: true },
    { key: 'date', label: 'Scheduled Date', filterable: false },
    { key: 'time', label: 'Time', filterable: false },
    { key: 'interviewRound', label: 'Interview Round', filterable: false },
    { key: 'interviewerName', label: 'Interviewer', filterable: true },
    // { key: 'createdDate', label: 'Created Date', filterable: false }
  ];

  completedColumns = [...this.upcomingColumns]; // same structure

  constructor(private interviewService: InterviewServiceService) {}

  ngOnInit() {
    this.interviewService.getAllInterviews().subscribe({
      next: data => {

        const formatted = data.map(d => ({
        ...d,
        jobDescription: `EXP_${d.jobDescription.toString().padStart(3, '0')}`
      }));

        this.upcomingInterviewsDataSource = formatted.filter(d => d.status === 'Upcoming');
        this.completedInterviewsDataSource = formatted.filter(d => d.status === 'Completed');
        this.updateTableData();
      },
      error: err => console.error('Failed to load interviews', err)
    });
  }

  updateTableData() {
    const source = this.selectedView === 'completed'
      ? this.completedInterviewsDataSource
      : this.upcomingInterviewsDataSource;

    this.interviewsData = Array.isArray(source) ? source : [];
    this.columnData = this.selectedView === 'completed'
      ? this.completedColumns
      : this.upcomingColumns;

    this.globalFilterFields = this.columnData.map(c => c.key);
  }
}
