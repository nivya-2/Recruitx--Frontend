import { Component } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applicants',
  imports: [TableComponent,ButtonComponent],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent {
constructor(private router: Router, private route: ActivatedRoute) {}
routes!: (row: any) => void;
ngOnInit(): void {
  this.routes = (row: any): void => {
    const segments = this.route.snapshot.pathFromRoot
      .flatMap(r => r.url.map(u => u.path));

    const rolePrefix = segments.includes('recruiter-lead') ? 'recruiter-lead' : 'recruiter';

    this.router.navigate([`/${rolePrefix}/job-description/applicant-details`]);
  };
}

dataSource: any[] = [
    {
      candidateId: 'CAN-006',
      name: 'Arjun Menon',
      email: 'arjunmenon@gmail.com',
      phone: '987654892',
      totalExp: 7,
      relevantExp: 5,
      currentLocation: 'Kochi',
      noticePeriod: 90,
      source: 'LinkedIn',
      actions: 'Details'
    },
    {
      candidateId: 'CAN-006',
      name: 'Arjun Menon',
      email: 'arjunmenon@gmail.com',
      phone: '987654892',
      totalExp: 7,
      relevantExp: 5,
      currentLocation: 'Kochi',
      noticePeriod: 90,
      source: 'LinkedIn',
      actions: 'Details'
    },
    {
      candidateId: 'CAN-006',
      name: 'Arjun Menon',
      email: 'arjunmenon@gmail.com',
      phone: '987654892',
      totalExp: 7,
      relevantExp: 5,
      currentLocation: 'Kochi',
      noticePeriod: 90,
      source: 'LinkedIn',
      actions: 'Details'
    },
    {
      candidateId: 'CAN-006',
      name: 'Arjun Menon',
      email: 'arjunmenon@gmail.com',
      phone: '987654892',
      totalExp: 7,
      relevantExp: 5,
      currentLocation: 'Kochi',
      noticePeriod: 90,
      source: 'LinkedIn',
      actions: 'Details'
    },
    {
      candidateId: 'CAN-006',
      name: 'Arjun Menon',
      email: 'arjunmenon@gmail.com',
      phone: '987654892',
      totalExp: 7,
      relevantExp: 5,
      currentLocation: 'Kochi',
      noticePeriod: 90,
      source: 'LinkedIn',
      actions: 'Details'
    },
    {
      candidateId: 'CAN-006',
      name: 'Arjun Menon',
      email: 'arjunmenon@gmail.com',
      phone: '987654892',
      totalExp: 7,
      relevantExp: 5,
      currentLocation: 'Kochi',
      noticePeriod: 90,
      source: 'LinkedIn',
      actions: 'Details'
    },
    {
      candidateId: 'CAN-006',
      name: 'Arjun Menon',
      email: 'arjunmenon@gmail.com',
      phone: '987654892',
      totalExp: 7,
      relevantExp: 5,
      currentLocation: 'Kochi',
      noticePeriod: 90,
      source: 'LinkedIn',
      actions: 'Details'
    },
    {
      candidateId: 'CAN-006',
      name: 'Arjun Menon',
      email: 'arjunmenon@gmail.com',
      phone: '987654892',
      totalExp: 7,
      relevantExp: 5,
      currentLocation: 'Kochi',
      noticePeriod: 90,
      source: 'LinkedIn',
      actions: 'Details'
    }
  ];

  columns: Array<{ key: string, label: string, filterable: boolean }> = [
    { key: 'candidateId', label: 'Candidate ID', filterable: false },
    { key: 'name', label: 'Name', filterable: true },
    { key: 'email', label: 'Email ID', filterable: true },
    { key: 'phone', label: 'Phone Number', filterable: false },
    { key: 'totalExp', label: 'Total Experience (In years)', filterable: false },
    // { key: 'relevantExp', label: 'Relevant Experience (In years)', filterable: false },
    // { key: 'currentLocation', label: 'Current Location', filterable: true },
    // { key: 'noticePeriod', label: 'Notice Period (In Days)', filterable: false },
    { key: 'source', label: 'Application Source', filterable: true },
    { key: 'actions', label: 'View Details', filterable: false }
  ];

  
  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions');
}

