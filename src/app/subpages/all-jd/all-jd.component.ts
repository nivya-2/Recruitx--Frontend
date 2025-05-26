import { Component } from '@angular/core';
import { TableComponent } from "../../shared-components/table/table.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-jd',
  imports: [TableComponent],
  templateUrl: './all-jd.component.html',
  styleUrl: './all-jd.component.scss'
})
export class AllJdComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  dataSource: any[] = [
  {
    id: 'JD001',
    roleTitle: 'Software Engineer',
    deliveryUnit: 'DU1',
    createdDate: '04/04/2025',
    associatedJr: 'JR2025-112',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD002',
    roleTitle: 'UX Designer',
    deliveryUnit: 'DU3',
    createdDate: '12/02/2025',
    associatedJr: 'JR2025-113',
    status: 'Closed',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD003',
    roleTitle: 'Data Analyst',
    deliveryUnit: 'DU2',
    createdDate: '20/03/2025',
    associatedJr: 'JR2025-114',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD004',
    roleTitle: 'Sales Manager',
    deliveryUnit: 'DU4',
    createdDate: '17/01/2025',
    associatedJr: 'JR2025-115',
    status: 'Closed',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD005',
    roleTitle: 'Junior HR',
    deliveryUnit: 'DU6',
    createdDate: '10/04/2025',
    associatedJr: 'JR2025-116',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD006',
    roleTitle: 'DevOps Engineer',
    deliveryUnit: 'DU1',
    createdDate: '15/04/2025',
    associatedJr: 'JR2025-117',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD007',
    roleTitle: 'Business Analyst',
    deliveryUnit: 'DU3',
    createdDate: '22/04/2025',
    associatedJr: 'JR2025-118',
    status: 'Closed',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD008',
    roleTitle: 'QA Tester',
    deliveryUnit: 'DU2',
    createdDate: '05/05/2025',
    associatedJr: 'JR2025-119',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD009',
    roleTitle: 'Technical Lead',
    deliveryUnit: 'DU5',
    createdDate: '18/04/2025',
    associatedJr: 'JR2025-120',
    status: 'Closed',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD010',
    roleTitle: 'Product Manager',
    deliveryUnit: 'DU1',
    createdDate: '30/04/2025',
    associatedJr: 'JR2025-121',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD011',
    roleTitle: 'Frontend Developer',
    deliveryUnit: 'DU3',
    createdDate: '01/05/2025',
    associatedJr: 'JR2025-122',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD012',
    roleTitle: 'Backend Developer',
    deliveryUnit: 'DU4',
    createdDate: '06/05/2025',
    associatedJr: 'JR2025-123',
    status: 'Closed',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD013',
    roleTitle: 'Security Analyst',
    deliveryUnit: 'DU2',
    createdDate: '10/05/2025',
    associatedJr: 'JR2025-124',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD014',
    roleTitle: 'Cloud Architect',
    deliveryUnit: 'DU6',
    createdDate: '12/05/2025',
    associatedJr: 'JR2025-125',
    status: 'Closed',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  },
  {
    id: 'JD015',
    roleTitle: 'Marketing Coordinator',
    deliveryUnit: 'DU5',
    createdDate: '20/05/2025',
    associatedJr: 'JR2025-126',
    status: 'Open',
    viewJD: 'View JD',
    viewApplicants: 'View Applicants'
  }
];

  columns = [
    { key: 'id', label: 'ID', filterable: false },
    { key: 'roleTitle', label: 'Role Title', filterable: true },
    { key: 'deliveryUnit', label: 'Delivery Unit', filterable: true },
    { key: 'createdDate', label: 'Created Date', filterable: false },
    { key: 'associatedJr', label: 'Associated JR', filterable: false },
    { key: 'jrstatus', label: 'Status', filterable: true },
    { key: 'actions', label: 'View JD', filterable: false },
    { key: 'actions', label: 'View Applicants', filterable: false }
  ];

  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'associatedJr');

}
