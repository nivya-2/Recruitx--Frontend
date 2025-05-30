import { Component } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-open-jd',
  imports: [TableComponent],
  templateUrl: './track-jd.component.html',
  styleUrl: './track-jd.component.scss'
})
export class TrackJdComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

dataSource: any[] = [
    {
      id: 'JD001',
      roleTitle: 'Software Engineer',
      deliveryUnit: 'DU1',
      location: 'Bangalore',
      experience: '3-5 years',
      createdDate: '04/04/2025',
      associatedJr: 'JR2025-112'
    },
    {
      id: 'JD002',
      roleTitle: 'UX Designer',
      deliveryUnit: 'DU3',
      location: 'Trivandrum',
      experience: '4-6 years',
      createdDate: '12/02/2025',
      associatedJr: 'JR2025-113'
    },
    {
      id: 'JD003',
      roleTitle: 'Data Analyst',
      deliveryUnit: 'DU2',
      location: 'Chennai',
      experience: '2-6 years',
      createdDate: '20/03/2025',
      associatedJr: 'JR2025-114'
    },
    {
      id: 'JD004',
      roleTitle: 'Sales Manager',
      deliveryUnit: 'DU4',
      location: 'Kochi',
      experience: '4-5 years',
      createdDate: '17/01/2025',
      associatedJr: 'JR2025-115'
    },
    {
      id: 'JD005',
      roleTitle: 'Junior HR',
      deliveryUnit: 'DU6',
      location: 'Trivandrum',
      experience: '2-3 years',
      createdDate: '10/04/2025',
      associatedJr: 'JR2025-116'
    },
    {
      id: 'JD005',
      roleTitle: 'Junior HR',
      deliveryUnit: 'DU6',
      location: 'Trivandrum',
      experience: '2-3 years',
      createdDate: '10/04/2025',
      associatedJr: 'JR2025-116'
    },
    {
      id: 'JD005',
      roleTitle: 'Junior HR',
      deliveryUnit: 'DU6',
      location: 'Trivandrum',
      experience: '2-3 years',
      createdDate: '10/04/2025',
      associatedJr: 'JR2025-116'
    },
    {
      id: 'JD005',
      roleTitle: 'Junior HR',
      deliveryUnit: 'DU6',
      location: 'Trivandrum',
      experience: '2-3 years',
      createdDate: '10/04/2025',
      associatedJr: 'JR2025-116'
    },
    {
      id: 'JD005',
      roleTitle: 'Junior HR',
      deliveryUnit: 'DU6',
      location: 'Trivandrum',
      experience: '2-3 years',
      createdDate: '10/04/2025',
      associatedJr: 'JR2025-116'
    }
  ];

  columns = [
    { key: 'id', label: 'ID', filterable: false },
    { key: 'roleTitle', label: 'Role Title', filterable: true },
    { key: 'deliveryUnit', label: 'Delivery Unit', filterable: true },
    { key: 'location', label: 'Location', filterable: true },
    { key: 'experience', label: 'Experience', filterable: false },
    { key: 'createdDate', label: 'Created Date', filterable: false },
    { key: 'associatedJr', label: 'Associated JR', filterable: false }
  ];

   routes = (row: any): void => {
    // Infer role from URL — either 'recruiter' or 'recruiter-lead'
    const segments = this.route.snapshot.pathFromRoot
      .flatMap(r => r.url.map(u => u.path));
    
    const rolePrefix = segments.includes('recruiter-lead') ? 'recruiter-lead' : 'recruiter';

    // Navigate to the correct route
    this.router.navigate([`/${rolePrefix}/job-description/`]);
  };

  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'associatedJr');
}
