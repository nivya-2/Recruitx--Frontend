import { Component } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';

@Component({
  selector: 'app-track-jr',
  imports: [ TableComponent],
  templateUrl: './track-jr.component.html',
  styleUrl: './track-jr.component.scss'
})
export class TrackJrComponent {
  

  // Sample data
  dataSource : any[] = [
    {
      jobId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist-Computer Vision',
      du: 'DU6',
      location: 'Kochi',
      status: { current: 2, total: 9 },
      hiringManager: 'Arjun Menon',
      assignedTo: 'Anjali Krishna',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    },
    {
      jobId: 'REQ-2024-DS-046',
      jobTitle: 'Devops Architect',
      du: 'DU1',
      location: 'Trivandrum',
      status: { current: 5, total: 7 },
      hiringManager: 'Ravi Varma',
      assignedTo: 'Archana Dev',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    },
    {
      jobId: 'REQ-2025-DS-016',
      jobTitle: 'Automation Test Engineer',
      du: 'DU4',
      location: 'Trivandrum',
      status: { current: 3, total: 6 },
      hiringManager: 'Ann Mary',
      assignedTo: 'Athira B',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    },
    {
      jobId: 'REQ-2024-DS-136',
      jobTitle: 'Senior QA Automation Engineer',
      du: 'DU3',
      location: 'Kochi',
      status: { current: 4, total: 12 },
      hiringManager: 'Jayan M S',
      assignedTo: 'Punya V',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    },
    {
      jobId: 'REQ-2025-DS-056',
      jobTitle: 'Technology Lead - .Net',
      du: 'DU6',
      location: 'Kochi',
      status: { current: 1, total: 9 },
      hiringManager: 'Madhav B',
      assignedTo: 'Anjali Krishna',
      assignedOn: '02/04/2025',
      closeBy: '02/05/2025'
    }
  ];

  columns = [
    { key: 'jobId', label: 'Job Req.ID', filterable: true },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'du', label: 'Delivery Unit', filterable: true },
    { key: 'location', label: 'Location', filterable: true },
    { key: 'status', label: 'Status', filterable: false },
    { key: 'hiringManager', label: 'Hiring Manager', filterable: true },
    { key: 'assignedTo', label: 'Assigned To', filterable: true },
    { key: 'assignedOn', label: 'Assigned On', filterable: true },
    { key: 'closeBy', label: 'Close By', filterable: true }
  ];

  // Global filter fields
  globalFilterFields = this.columns.map(col => col.key);
}
