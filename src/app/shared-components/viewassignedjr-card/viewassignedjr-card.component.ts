import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-viewassignedjr-card',
  imports: [TableComponent],
  templateUrl: './viewassignedjr-card.component.html',
  styleUrl: './viewassignedjr-card.component.scss'
})
export class ViewassignedjrCardComponent {
dataSource : any[] = [
    {
      jobId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist-Computer Vision',
      status: { current: 2, total: 9 },
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    },
    {
      jobId: 'REQ-2024-DS-046',
      jobTitle: 'Devops Architect',
      status: { current: 5, total: 7 },
      hiringManager: 'Ravi Varma',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    },
    {
      jobId: 'REQ-2025-DS-016',
      jobTitle: 'Automation Test Engineer',
      status: { current: 3, total: 6 },
      hiringManager: 'Ann Mary',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    },
    {
      jobId: 'REQ-2024-DS-136',
      jobTitle: 'Senior QA Automation Engineer',
      status: { current: 4, total: 12 },
      hiringManager: 'Jayan M S',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    },
    {
      jobId: 'REQ-2025-DS-056',
      jobTitle: 'Technology Lead - .Net',
      status: { current: 1, total: 9 },
      hiringManager: 'Madhav B',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    }
  ];

  columns = [
    { key: 'jobId', label: 'Job Req.ID', filterable: true },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'status', label: 'Status', filterable: false },
    { key: 'hiringManager', label: 'Hiring Manager', filterable: true },
    { key: 'assignedOn', label: 'Assigned On', filterable: true },
    { key: 'closeBy', label: 'Close By', filterable: true }
  ];

  // Global filter fields
  globalFilterFields = this.columns.map(col => col.key);
}
