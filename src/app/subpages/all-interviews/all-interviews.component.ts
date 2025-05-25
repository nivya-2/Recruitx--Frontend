import { Component } from '@angular/core';
import { TableComponent } from '../../shared-components/table/table.component';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-all-interviews',
  standalone: true,
  imports: [SelectModule, FormsModule, TableComponent],
  templateUrl: './all-interviews.component.html',
  styleUrl: './all-interviews.component.scss'
})
export class AllInterviewsComponent {
  selectedView = 'upcoming'; // Matches the 'code' from viewOptions

  viewOptions = [
    { name: 'Upcoming', code: 'upcoming' },
    { name: 'Completed', code: 'completed' }
  ];

  interviewsData: any[] = [];
  columnData: any[] = [];
  globalFilterFields: string[] = [];

  upcomingInterviewsDataSource: any[] = [
    {
      candidateName: 'Sneha Kulkarni',
      jobRole: 'Backend Developer',
      scheduledDateTime: '27/05/2025 03:00 PM',
      endTime: '27/05/2025 04:00 PM',
      interviewRound: '1',
      interviewerName: 'Vikram Sinha',
      interviewerDeliveryUnit: 'DU1',
      createdDate: '25/05/2025'
    },
    {
      candidateName: 'Arjun Mehta',
      jobRole: 'Frontend Developer',
      scheduledDateTime: '28/05/2025 10:00 AM',
      endTime: '28/05/2025 11:00 AM',
      interviewRound: '2',
      interviewerName: 'Anita Nair',
      interviewerDeliveryUnit: 'DU3',
      createdDate: '25/05/2025'
    },
    {
      candidateName: 'Priya Sharma',
      jobRole: 'DevOps Engineer',
      scheduledDateTime: '29/05/2025 01:00 PM',
      endTime: '29/05/2025 02:00 PM',
      interviewRound: '1',
      interviewerName: 'Rajiv Malhotra',
      interviewerDeliveryUnit: 'DU7',
      createdDate: '26/05/2025'
    },
    {
      candidateName: 'Kunal Desai',
      jobRole: 'QA Analyst',
      scheduledDateTime: '30/05/2025 09:30 AM',
      endTime: '30/05/2025 10:30 AM',
      interviewRound: '1',
      interviewerName: 'Sonal Jain',
      interviewerDeliveryUnit: 'DU5',
      createdDate: '26/05/2025'
    }
  ];

  upcomingColumns = [
    { key: 'candidateName', label: 'Candidate Name', filterable: true },
    { key: 'jobRole', label: 'Job Role', filterable: true },
    { key: 'scheduledDateTime', label: 'Scheduled Date/Time', filterable: false },
    { key: 'endTime', label: 'End Time', filterable: false },
    { key: 'interviewRound', label: 'Interview Round', filterable: false },
    { key: 'interviewerName', label: 'Interviewer', filterable: true },
    { key: 'interviewerDeliveryUnit', label: 'Delivery Unit', filterable: true },
    { key: 'createdDate', label: 'Created Date', filterable: false }
  ];

  completedInterviewsDataSource: any[] = [
    {
      candidateName: 'Tanvi Rao',
      jobRole: 'Senior Developer',
      scheduledDateTime: '22/05/2025 10:00 AM',
      endTime: '22/05/2025 11:00 AM',
      interviewRound: '2',
      interviewerName: 'John Smith',
      interviewerDeliveryUnit: 'DU8',
      createdDate: '20/05/2025'
    },
    {
      candidateName: 'Rajat Verma',
      jobRole: 'Frontend Developer',
      scheduledDateTime: '21/05/2025 02:00 PM',
      endTime: '21/05/2025 03:00 PM',
      interviewRound: '1',
      interviewerName: 'Sarah Johnson',
      interviewerDeliveryUnit: 'DU4',
      createdDate: '19/05/2025'
    },
    {
      candidateName: 'Aditya Pillai',
      jobRole: 'Full Stack Developer',
      scheduledDateTime: '20/05/2025 09:30 AM',
      endTime: '20/05/2025 10:30 AM',
      interviewRound: '3',
      interviewerName: 'Mike Wilson',
      interviewerDeliveryUnit: 'DU6',
      createdDate: '18/05/2025'
    },
    {
      candidateName: 'Neha Iyer',
      jobRole: 'QA Engineer',
      scheduledDateTime: '19/05/2025 11:00 AM',
      endTime: '19/05/2025 12:00 PM',
      interviewRound: '1',
      interviewerName: 'Deepak Shah',
      interviewerDeliveryUnit: 'DU2',
      createdDate: '17/05/2025'
    },
    {
      candidateName: 'Manoj Nair',
      jobRole: 'System Analyst',
      scheduledDateTime: '18/05/2025 03:00 PM',
      endTime: '18/05/2025 04:00 PM',
      interviewRound: '2',
      interviewerName: 'Leena George',
      interviewerDeliveryUnit: 'DU7',
      createdDate: '16/05/2025'
    }
  ];

  completedColumns = [
    { key: 'candidateName', label: 'Candidate Name', filterable: true },
    { key: 'jobRole', label: 'Job Role', filterable: true },
    { key: 'scheduledDateTime', label: 'Scheduled Date/Time', filterable: false },
    { key: 'endTime', label: 'End Time', filterable: false },
    { key: 'interviewRound', label: 'Interview Round', filterable: false },
    { key: 'interviewerName', label: 'Interviewer', filterable: true },
    { key: 'interviewerDeliveryUnit', label: 'Delivery Unit', filterable: true },
    { key: 'createdDate', label: 'Created Date', filterable: false }
  ];

  ngOnInit() {
    this.updateTableData();
  }

  ngDoCheck() {
    this.updateTableData();
  }

  updateTableData() {
    if (this.selectedView === 'completed') {
      this.interviewsData = this.completedInterviewsDataSource;
      this.columnData = this.completedColumns;
    } else {
      this.interviewsData = this.upcomingInterviewsDataSource;
      this.columnData = this.upcomingColumns;
    }
    this.globalFilterFields = this.columnData.map(c => c.key);
  }
}
