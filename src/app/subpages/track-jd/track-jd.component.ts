import { Component, OnInit } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TrackJdDTO, TrackJdService } from '../../core/services/api/track-jd.service';


@Component({
  selector: 'app-open-jd',
  imports: [TableComponent, RouterOutlet],
  templateUrl: './track-jd.component.html',
  styleUrl: './track-jd.component.scss'
})
export class TrackJdComponent implements OnInit {
  constructor(
    private trackJdService: TrackJdService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  jobDataSource: TrackJdDTO[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadJobDescriptions();
  }

  

onViewJD = (row: any) => {

    const rolePrefix = this.router.url.includes('recruiter-lead') ? 'recruiter-lead' : 'recruiter';
    const jobRequisitionId = row.jobRequisitionId;

    this.router.navigate([`/${rolePrefix}/job-description/details`,jobRequisitionId], { relativeTo: this.route });

  };
 
  onViewApplicants = (row: any) => {

    const rolePrefix = this.router.url.includes('recruiter-lead') ? 'recruiter-lead' : 'recruiter';
    const jobRequisitionId = row.jobRequisitionId;

    this.router.navigate([`/${rolePrefix}/job-description/applicants`,jobRequisitionId], { relativeTo: this.route });

  };
 


actionMethods = {'View JD': this.onViewJD,   'View Applicants': this.onViewApplicants };

// jobDataSource: any[] = [
//   { id: 'JD001', roleTitle: 'Software Engineer', deliveryUnit: 'DU1', createdDate: '04/04/2025', associatedJr: 'JR2025-112', statuss: 'Open', actions: ['View JD','View Applicants'] },
//   { id: 'JD002', roleTitle: 'UX Designer', deliveryUnit: 'DU3', createdDate: '12/02/2025', associatedJr: 'JR2025-113', statuss: 'Closed', actions: ['View JD','View Applicants'] },
//   { id: 'JD003', roleTitle: 'Data Analyst', deliveryUnit: 'DU2', createdDate: '20/03/2025', associatedJr: 'JR2025-114', statuss: 'Open', actions: ['View JD','View Applicants'] },
//   { id: 'JD004', roleTitle: 'Sales Manager', deliveryUnit: 'DU4', createdDate: '17/01/2025', associatedJr: 'JR2025-115', statuss: 'Closed', actions: ['View JD','View Applicants'] },
//   { id: 'JD005', roleTitle: 'Junior HR', deliveryUnit: 'DU6', createdDate: '10/04/2025', associatedJr: 'JR2025-116', statuss: 'Open', actions: ['View JD','View Applicants'] },
//   { id: 'JD006', roleTitle: 'DevOps Engineer', deliveryUnit: 'DU1', createdDate: '15/04/2025', associatedJr: 'JR2025-117', statuss: 'Open', actions: ['View JD','View Applicants'] },
//   { id: 'JD007', roleTitle: 'Business Analyst', deliveryUnit: 'DU3', createdDate: '22/04/2025', associatedJr: 'JR2025-118', statuss: 'Closed', actions: ['View JD','View Applicants'] },
//   { id: 'JD008', roleTitle: 'QA Tester', deliveryUnit: 'DU2', createdDate: '05/05/2025', associatedJr: 'JR2025-119', statuss: 'Open', actions: ['View JD','View Applicants'] },
//   { id: 'JD009', roleTitle: 'Technical Lead', deliveryUnit: 'DU5', createdDate: '18/04/2025', associatedJr: 'JR2025-120', statuss: 'Closed', actions: ['View JD','View Applicants'] },
//   { id: 'JD010', roleTitle: 'Product Manager', deliveryUnit: 'DU1', createdDate: '30/04/2025', associatedJr: 'JR2025-121', statuss: 'Open', actions: ['View JD','View Applicants'] },
//   { id: 'JD011', roleTitle: 'Frontend Developer', deliveryUnit: 'DU3', createdDate: '01/05/2025', associatedJr: 'JR2025-122', statuss: 'Open', actions: ['View JD','View Applicants'] },
//   { id: 'JD012', roleTitle: 'Backend Developer', deliveryUnit: 'DU4', createdDate: '06/05/2025', associatedJr: 'JR2025-123', statuss: 'Closed', actions: ['View JD','View Applicants'] },
//   { id: 'JD013', roleTitle: 'Security Analyst', deliveryUnit: 'DU2', createdDate: '10/05/2025', associatedJr: 'JR2025-124', statuss: 'Open', actions: ['View JD','View Applicants'] },
//   { id: 'JD014', roleTitle: 'Cloud Architect', deliveryUnit: 'DU6', createdDate: '12/05/2025', associatedJr: 'JR2025-125', statuss: 'Closed', actions: ['View JD','View Applicants'] },
//   { id: 'JD015', roleTitle: 'Marketing Coordinator', deliveryUnit: 'DU5', createdDate: '20/05/2025', associatedJr: 'JR2025-126', statuss: 'Open', actions: ['View JD','View Applicants'] }
// ];

 loadJobDescriptions(): void {
    this.trackJdService.getJobDescriptionsForUser().subscribe({
      next: (response) => {
        const data = response.data;
         this.jobDataSource = data.map(jd => ({
        ...jd,
        id: `JR${jd.jobRequisitionId.toString().padStart(3, '0')}`,
        jrProgress:{current:jd.filledPositions, total:jd.numberOfPositions},
      }
      
    ));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading job descriptions:', err);
        // this.errorMessage = 'Failed to load job descriptions. Please try again later.';
        this.isLoading = false;
      }
    });
  }

jobColumns: Array<{ key: string, label: string, filterable: boolean ,type?:string}> = [
  { key: 'id', label: 'ID', filterable: false },
  { key: 'roleTitle', label: 'Role Title', filterable: true },
  { key: 'businessUnit', label: 'Delivery Unit', filterable: true },
  { key: 'createdDate', label: 'Created Date', filterable: true , type: 'date' },
  {key: 'jrProgress', label: 'Progress', filterable: false,type:'progress'},
  // { key: 'associatedJr', label: 'Associated JR', filterable: false },
  { key: 'jobStatus', label: 'Status', filterable: true },
  { key: 'actions', label: 'Actions', filterable: false,type:'actions' }
];

   routes = (row: any): void => {
    // Infer role from URL — either 'recruiter' or 'recruiter-lead'
    const segments = this.route.snapshot.pathFromRoot
      .flatMap(r => r.url.map(u => u.path));
    
    const rolePrefix = segments.includes('recruiter-lead') ? 'recruiter-lead' : 'recruiter';

    // Navigate to the correct route
    this.router.navigate([`/${rolePrefix}/job-description/`]);
  };

  globalFilterFields = this.jobColumns.map(c => c.key).filter(key => key !== 'associatedJr');
}
