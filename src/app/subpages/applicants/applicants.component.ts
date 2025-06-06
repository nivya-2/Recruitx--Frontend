import { Component } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from "../../ui/modal/modal.component";
import { UploadComponent } from "../../shared-components/upload/upload.component";
import { CandidateDTO, CandidateService } from '../../services/Applicants.service';

@Component({
  selector: 'app-applicants',
  imports: [TableComponent, ButtonComponent, ModalComponent, UploadComponent],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent {
  isLoading: boolean = true;

constructor(private router: Router, private route: ActivatedRoute,  private candidateService: CandidateService) {}

routes!: (row: any) => void;
ngOnInit(): void {

const jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(jobId)) {
      this.loadCandidates(jobId);
    } else {
      console.error('Invalid or missing job requisition ID in route.');
    }


  this.routes = (row: any) => {
    const segments = this.route.snapshot.pathFromRoot
      .flatMap(r => r.url.map(u => u.path));

    const rolePrefix = segments.includes('recruiter-lead') ? 'recruiter-lead' : 'recruiter';

    // this.router.navigate([`/${rolePrefix}/job-description/applicant-details/`]);
    this.routes = (row: any) => {
  const segments = this.route.snapshot.pathFromRoot
    .flatMap(r => r.url.map(u => u.path));

  const rolePrefix = segments.includes('recruiter-lead') ? 'recruiter-lead' : 'recruiter';

  const candidateId = row?.candidateId?.replace(/^CAN/, ''); // remove prefix if needed
  this.router.navigate([`/${rolePrefix}/job-description/applicant-details`, candidateId]);
};

  };
}

loadCandidates(jobId: number): void {
    this.candidateService.getCandidatesByJobRequisitionId(jobId).subscribe({
      next: (data) => {
        this.dataSource = data.map(candidate => ({
          ...candidate,
          candidateId: `CAN${candidate.candidateId.toString().padStart(3, '0')}`, 
          // Format as CAN0001

        }));
                this.isLoading = false;

      },
      error: (err) => {
        console.error('Failed to fetch candidate data:', err);
        this.isLoading = false;
      }
    });
  }


visible:boolean = false;
  openModal() {
    this.visible = !this.visible;
  }
    dataSource: CandidateDTO[]|any = [];



// dataSource: any[] = [
//     {
//       candidateId: 'CAN006',
//       name: 'Arjun Menon',
//       email: 'arjunmenon@gmail.com',
//       phone: '987654892',
//       totalExp: 7,
//       relevantExp: 5,
//       currentLocation: 'Kochi',
//       noticePeriod: 90,
//       source: 'LinkedIn',
//       actions: ['Details']
//     },
//     {
//       candidateId: 'CAN006',
//       name: 'Arjun Menon',
//       email: 'arjunmenon@gmail.com',
//       phone: '987654892',
//       totalExp: 7,
//       relevantExp: 5,
//       currentLocation: 'Kochi',
//       noticePeriod: 90,
//       source: 'LinkedIn',
//       actions: ['Details']
//     },
//     {
//       candidateId: 'CAN006',
//       name: 'Arjun Menon',
//       email: 'arjunmenon@gmail.com',
//       phone: '987654892',
//       totalExp: 7,
//       relevantExp: 5,
//       currentLocation: 'Kochi',
//       noticePeriod: 90,
//       source: 'LinkedIn',
//       actions: ['Details']
//     },
//     {
//       candidateId: 'CAN006',
//       name: 'Arjun Menon',
//       email: 'arjunmenon@gmail.com',
//       phone: '987654892',
//       totalExp: 7,
//       relevantExp: 5,
//       currentLocation: 'Kochi',
//       noticePeriod: 90,
//       source: 'LinkedIn',
//       actions: ['Details']
//     },
//     {
//       candidateId: 'CAN006',
//       name: 'Arjun Menon',
//       email: 'arjunmenon@gmail.com',
//       phone: '987654892',
//       totalExp: 7,
//       relevantExp: 5,
//       currentLocation: 'Kochi',
//       noticePeriod: 90,
//       source: 'LinkedIn',
//       actions: ['Details']
//     },
//     {
//       candidateId: 'CAN006',
//       name: 'Arjun Menon',
//       email: 'arjunmenon@gmail.com',
//       phone: '987654892',
//       totalExp: 7,
//       relevantExp: 5,
//       currentLocation: 'Kochi',
//       noticePeriod: 90,
//       source: 'LinkedIn',
//       actions: ['Details']
//     },
//     {
//       candidateId: 'CAN006',
//       name: 'Arjun Menon',
//       email: 'arjunmenon@gmail.com',
//       phone: '987654892',
//       totalExp: 7,
//       relevantExp: 5,
//       currentLocation: 'Kochi',
//       noticePeriod: 90,
//       source: 'LinkedIn',
//       actions: ['Details']
//     },
//     {
//       candidateId: 'CAN006',
//       name: 'Arjun Menon',
//       email: 'arjunmenon@gmail.com',
//       phone: '987654892',
//       totalExp: 7,
//       relevantExp: 5,
//       currentLocation: 'Kochi',
//       noticePeriod: 90,
//       source: 'LinkedIn',
//       actions: ['Details']
//     }
//   ];

  columns: Array<{ key: string, label: string, filterable: boolean }> = [
    { key: 'candidateId', label: 'Candidate ID', filterable: false },
    { key: 'candidateName', label: 'Name', filterable: true },
    { key: 'candidateEmail', label: 'Email ID', filterable: true },
    { key: 'candidatePhone', label: 'Phone Number', filterable: false },
    { key: 'totalExperienceYears', label: 'Total Experience (In years)', filterable: false },
    // { key: 'relevantExp', label: 'Relevant Experience (In years)', filterable: false },
    // { key: 'currentLocation', label: 'Current Location', filterable: true },
    // { key: 'noticePeriod', label: 'Notice Period (In Days)', filterable: false },
    { key: 'source', label: 'Application Source', filterable: true },
    { key: 'actions', label: 'View Details', filterable: false }
  ];

  
  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions');
      actionMethods = {'Details': this.routes}

}

