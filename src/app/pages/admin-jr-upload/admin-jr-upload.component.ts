import { Component,ViewChild } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { ButtonIconComponent } from '../../ui/button-icon/button-icon.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { UploadComponent } from '../../shared-components/upload/upload.component';
import { AlertsComponent } from '../../ui/alerts/alerts.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    TableComponent,
    CommonLayoutComponent,
    CardsComponent,
    HeaderTextComponent,
    ButtonIconComponent,
    ModalComponent,
    UploadComponent,
    AlertsComponent
  ],
  templateUrl: './admin-jr-upload.component.html',
  styleUrl: './admin-jr-upload.component.scss',
})
export class AdminJrUploadComponent {
  visible: boolean = false;
  openModal() {
    this.visible = !this.visible;
  }
  dataSource: any[] = [
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
    {
      jobReqId: 'REQ-2025-DS-006',
      jobTitle: 'Data Scientist - Computer Vision',
      deliveryUnit: 'DU6',
      location: 'Kochi',
      hiringManager: 'Arjun Menon',
      assignedOn: '02/04/2025',
      actions: ['Delete'],
    },
  ];

  recruitersIcons = [
    { iconName: 'dashboard', size: '32px', iconColour: 'red' },
    { iconName: 'home', size: '32px', iconColour: 'blue' },
    { iconName: 'delete', size: '32px', iconColour: 'green' },
  ];

  columns = [
    { key: 'jobReqId', label: 'Requisition ID', filterable: false },
    { key: 'jobTitle', label: 'Job Title', filterable: true },
    { key: 'deliveryUnit', label: 'Delivery Unit', filterable: true },
    { key: 'location', label: 'Location', filterable: true },
    { key: 'hiringManager', label: 'Hiring Manager', filterable: true },
    { key: 'assignedOn', label: 'Uploaded On', filterable: true, type: 'date' },
    { key: 'actions', label: 'Actions', filterable: false },
  ];

  globalFilterFields = this.columns
    .map((c) => c.key)
    .filter((key) => key !== 'actions');

}
