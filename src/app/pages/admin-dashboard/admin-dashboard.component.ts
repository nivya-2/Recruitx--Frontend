import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { ButtonIconComponent } from '../../ui/button-icon/button-icon.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [TableComponent, CommonLayoutComponent, CardsComponent, HeaderTextComponent, ButtonIconComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  dataSource: any[] = [
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  },
  {
    jobReqId: 'REQ-2025-DS-006',
    jobTitle: 'Data Scientist - Computer Vision',
    deliveryUnit: 'DU6',
    location: 'Kochi',
    hiringManager: 'Arjun Menon',
    assignedTo: 'Anjali Krishna',
    assignedOn: '02/04/2025',
    closeBy: '02/05/2025'
  }
]

    recruitersIcons=[
      {iconName:'dashboard',size:"32px",iconColour:"red"},
      {iconName:'home',size:"32px",iconColour:"blue"},
      {iconName:'delete',size:"32px",iconColour:"green"}
    ]

    columns: Array<{key: string, label: string, filterable: boolean}> = [
       { key: 'jobReqId', label: 'Requisition ID', filterable: true },
  { key: 'jobTitle', label: 'Job Title', filterable: true },
  { key: 'deliveryUnit', label: 'Delivery Unit', filterable: true },
  { key: 'location', label: 'Location', filterable: true },
  { key: 'hiringManager', label: 'Hiring Manager', filterable: true },
  { key: 'assignedTo', label: 'Assigned To', filterable: true },
  { key: 'assignedOn', label: 'Assigned On', filterable: true },
  { key: 'closeBy', label: 'Close By', filterable: true }
    ];

    globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions'); 


}
