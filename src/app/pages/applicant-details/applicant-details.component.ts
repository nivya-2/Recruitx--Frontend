import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { CardsComponent } from '../../ui/cards/cards.component';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../ui/button/button.component';

interface Candidate {
  id: string;
  name: string;
  mobile: string;
  email: string;
  totalExperience: string;
  relevantExperience: string;
  noticePeriod: string;
  currentCTC: number;
  expectedCTC: number;
  source: string;
  location: string;
  employer: string;
}

interface StatusItem {
  label: string;
  date?: string;
  completed: boolean;
}

@Component({
  selector: 'app-applicant-details',
  standalone: true,
  imports: [
    CommonLayoutComponent,
    CardsComponent,
    NgFor,
    KeyValuePipe,
    ReactiveFormsModule,
    NgIf,
    ButtonComponent,
  ],
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss'], // corrected from styleUrl
})
export class ApplicantDetailsComponent {
  candidateStatus = '';

  fieldLabels: Record<keyof Candidate | string, string> = {
    id: 'Candidate ID',
    name: 'Name',
    mobile: 'Mobile Number',
    email: 'Email',
    totalExperience: 'Total Experience',
    relevantExperience: 'Relevant Experience',
    noticePeriod: 'Notice Period',
    currentCTC: 'Current CTC',
    expectedCTC: 'Expected CTC',
    source: 'Source of Application',
    location: 'Current Location',
    employer: 'Current Employer',
  };

  fieldOrder: (keyof Candidate)[] = [
    'id',
    'name',
    'mobile',
    'email',
    'totalExperience',
    'relevantExperience',
    'noticePeriod',
    'currentCTC',
    'expectedCTC',
    'source',
    'location',
    'employer',
  ];

  statusList: StatusItem[] = [
    { label: 'Applied', date: '2024-09-23', completed: true },
    { label: 'Technical select', date: '2024-10-23', completed: true },
    { label: 'Management Select', date: '2024-11-23', completed: true },
    { label: 'Documentation verified', date: '2024-11-30', completed: true },
    { label: 'Salary Approved', completed: false },
    { label: 'Offer Letter accepted', completed: false },
    { label: 'Joined', completed: false },
  ];

  selectedStatus = new FormControl('');

  get statusOptions(): string[] {
    const nextSteps = this.statusList.filter(step => !step.completed).map(step => step.label);
    return [...nextSteps, 'Reject'];
  }

  candidate = {
    id: 'CND-034',
    name: 'Arjun Menon',
    mobile: '8089888786',
    email: 'test@gmail.com',
    totalExperience: '4 yrs',
    relevantExperience: '3 yrs',
    noticePeriod: '30 dys',
    currentCTC: 600000,
    expectedCTC: 750000,
    source: 'Linkedin',
    location: 'Trivandrum',
    employer: 'UST',
  };

  items: MenuItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const urlSegments = this.router.url.split('/');
    const prefix = urlSegments[1] === 'recruiter-lead' ? 'recruiter-lead' : 'recruiter';

    this.items = [
      { label: 'Job-Description', routerLink: `/${prefix}/job-description` },
      { label: 'Applicants', routerLink: `/${prefix}/job-description/applicants` },
      { label: 'Arjun Menon', routerLink: `/${prefix}/job-description/applicant-details` },
    ];
  }

  rejectCandidate(): void {
    this.candidateStatus = 'rejected';
  }

  submit(): void {
    console.log('Selected Status:', this.selectedStatus.value);
    // Add logic to update status (emit event or call API)
  }
}
