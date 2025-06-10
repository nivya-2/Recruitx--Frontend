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
      date: new Date('2025-04-17'),
      time: '03:00 PM - 04:00 PM',
      interviewRound: 1,
      interviewerName: 'Vikram Sinha',
      interviewerDeliveryUnit: 'DU1',
      createdDate: new Date('2025-04-17')
    },
    {
      candidateName: 'Arjun Mehta',
      jobRole: 'Frontend Developer',
      date:new Date('2025-04-17'),
      time: '10:00 AM - 11:00 AM',
      interviewRound: 2,
      interviewerName: 'Anita Nair',
      interviewerDeliveryUnit: 'DU3',
      createdDate:new Date('2025-04-17')
    },
    {
      candidateName: 'Priya Sharma',
      jobRole: 'DevOps Engineer',
      date: new Date('2025-04-17'),
      time: '01:00 PM - 02:00 PM',
      interviewRound: 1,
      interviewerName: 'Rajiv Malhotra',
      interviewerDeliveryUnit: 'DU7',
      createdDate: new Date('2025-04-17')
    },
    {
      candidateName: 'Kunal Desai',
      jobRole: 'QA Analyst',
      date: new Date('2025-04-17'),
      time: '09:30 AM - 10:30 AM',
      interviewRound: 1,
      interviewerName: 'Sonal Jain',
      interviewerDeliveryUnit: 'DU5',
      createdDate: new Date('2025-04-17')
    }
  ];

  upcomingColumns = [
    { key: 'candidateName', label: 'Candidate Name', filterable: true },
    { key: 'jobRole', label: 'Job Role', filterable: true },
    { key: 'date', label: 'Scheduled Date', filterable: false, type:'date' },
    { key: 'time', label: 'Time', filterable: false },
    { key: 'interviewRound', label: 'Interview Round', filterable: false },
    { key: 'interviewerName', label: 'Interviewer', filterable: true },
    { key: 'interviewerDeliveryUnit', label: 'Delivery Unit', filterable: true },
    { key: 'createdDate', label: 'Created Date', filterable: false, type: 'date' }
  ];

  completedInterviewsDataSource: any[] = [
    {
      candidateName: 'Tanvi Rao',
      jobRole: 'Senior Developer',
      date: '22/05/2025 10:00 AM',
      time: '22/05/2025 11:00 AM',
      interviewRound: '2',
      interviewerName: 'John Smith',
      interviewerDeliveryUnit: 'DU8',
      createdDate: new Date('2025-04-17')
    },
    {
      candidateName: 'Rajat Verma',
      jobRole: 'Frontend Developer',
      date: '21/05/2025 02:00 PM',
      time: '21/05/2025 03:00 PM',
      interviewRound: '1',
      interviewerName: 'Sarah Johnson',
      interviewerDeliveryUnit: 'DU4',
      createdDate:new Date('2025-04-17')
    },
    {
      candidateName: 'Aditya Pillai',
      jobRole: 'Full Stack Developer',
      date: '20/05/2025 09:30 AM',
      time: '20/05/2025 10:30 AM',
      interviewRound: '3',
      interviewerName: 'Mike Wilson',
      interviewerDeliveryUnit: 'DU6',
      createdDate:new Date('2025-04-17')
    },
    {
      candidateName: 'Neha Iyer',
      jobRole: 'QA Engineer',
      date: '19/05/2025 11:00 AM',
      time: '19/05/2025 12:00 PM',
      interviewRound: '1',
      interviewerName: 'Deepak Shah',
      interviewerDeliveryUnit: 'DU2',
      createdDate:new Date('2025-04-17')
    },
    {
      candidateName: 'Manoj Nair',
      jobRole: 'System Analyst',
      date: '18/05/2025 03:00 PM',
      time: '18/05/2025 04:00 PM',
      interviewRound: '2',
      interviewerName: 'Leena George',
      interviewerDeliveryUnit: 'DU7',
      createdDate: new Date('2025-04-17')
    }
  ];

  completedColumns = [
    { key: 'candidateName', label: 'Candidate Name', filterable: true },
    { key: 'jobRole', label: 'Job Role', filterable: true },
    { key: 'date', label: 'Scheduled Date/Time', filterable: false },
    { key: 'time', label: 'End Time', filterable: false },
    { key: 'interviewRound', label: 'Interview Round', filterable: false },
    { key: 'interviewerName', label: 'Interviewer', filterable: true },
    { key: 'interviewerDeliveryUnit', label: 'Delivery Unit', filterable: true },
    { key: 'createdDate', label: 'Created Date', filterable: false, type:'date' }
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
