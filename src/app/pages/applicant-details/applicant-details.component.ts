import { Component, ViewChild } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { CardsComponent } from '../../ui/cards/cards.component';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../ui/button/button.component';
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; 
import { finalize } from 'rxjs';
import { ApplicationDetailsPageDTO, CandidateDetailsDTO, CandidateService1, TimelineStep } from '../../core/services/api/applicant-details.service';
import { ToastComponent } from "../../ui/toast/toast.component";

// interface Candidate {
//   id: string;
//   name: string;
//   mobile: string;
//   email: string;
//   totalExperience: string;
//   relevantExperience: string;
//   noticePeriod: string;
//   currentCTC: number;
//   expectedCTC: number;
//   source: string;
//   location: string;
//   employer: string;
// }

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
    AlertsComponent,
    ProgressSpinnerModule,
    ToastComponent
],
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss'], // corrected from styleUrl
})
export class ApplicantDetailsComponent {

  private applicationId: number = 0;
  private rawData: ApplicationDetailsPageDTO | null = null;  
  finished:boolean=false;
  statusList: TimelineStep[] = [];
  candidate: any=null;
  items: MenuItem[] = [];
  isRejected: boolean = false;
  isLoading: boolean =true;


  fieldLabels: Record<keyof CandidateDetailsDTO | string, string> = {
    candidateID: 'Candidate ID',
    candidateName: 'Name',
    candidatePhone: 'Mobile Number',
    candidateEmail: 'Email',
    totalExperience: 'Total Experience',
    relavantExperience: 'Relevant Experience',
    noticePeriod: 'Notice Period',
    currentCTC: 'Current CTC',
    expectedCTC: 'Expected CTC',
    source: 'Source of Application',
    currentLocation: 'Current Location',
    currentEmployer: 'Current Employer',
  };

  fieldOrder: (keyof CandidateDetailsDTO)[] = [
  'candidateID',
  'candidateName',
  'candidatePhone',
  'candidateEmail',
  'totalExperience',
  'relavantExperience',
  'noticePeriod',
  'currentCTC',
  'expectedCTC',
  'source',
  'currentLocation',
  'currentEmployer',
  ];
  isJobClosed: boolean = false;
  isDisabled: boolean = false;
  
  @ViewChild('toast') toastComponent!: any;

  ngOnInit(): void {
    const urlSegments = this.router.url.split('/');
    const prefix = urlSegments[1] === 'recruiter-lead' ? 'recruiter-lead' : 'recruiter';

    this.items = [
      { label: 'Job-Description', routerLink: `/${prefix}/job-description` },
      { label: 'Applicants', routerLink: `/${prefix}/job-description/applicants` },
      { label: `Candidate Details`, routerLink: `/${prefix}/job-description/applicant-details` },
    ];
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
  if (!isNaN(id)) {
      this.applicationId = id;
      this.loadApplicationDetails();  }
      
else {
      this.isLoading = false; // Stop loading if there's no ID
      console.error("Application ID not found in route.");
    }
    
  }

  loadApplicationDetails(): void {
    if (!this.applicationId) return;
    this.isLoading = true;
    this.candidateService.getApplicationPageDetails(this.applicationId)
      .pipe(
        // finalize() ensures this block runs on success OR error
        finalize(() => this.isLoading = false)
      )
    .subscribe({
      next: (response) => {
        this.rawData = response.data;
        this.statusList = this.rawData.statusTimeline;
        this.finished = this.rawData.isProcessFinished;
        this.isJobClosed = this.rawData.candidateInfo.jrStatus === 'Closed';
        console.log(this.rawData.candidateInfo.status);
this.isDisabled = 
  this.rawData.candidateInfo.status === 'TechnicalInterview' || 
  this.rawData.candidateInfo.status === 'ManagementInterview';
        this.isRejected = this.rawData.candidateInfo.status === 'Rejected';        // Apply formatting for display, just like your original code
        const info = this.rawData.candidateInfo;
        this.candidate = {
          ...info,
          candidateID: `CAN${info.candidateID.toString().padStart(3, '0')}`,
          totalExperience: `${info.totalExperience} years`,
          relavantExperience: `${info.relavantExperience} years`,
          noticePeriod: info.noticePeriod ? `${info.noticePeriod} days` : 'N/A',
          currentCTC: `${info.currentCTC } LPA`,
          expectedCTC: info.expectedCTC ? `${info.expectedCTC} LPA` : 'Not specified',
        };
      },
      error: (err) => console.error('Error fetching application details:', err)
    });
  }
  // statusList: StatusItem[] = [
  //   { label: 'Applied', date: '2024-09-23', completed: true },
  //   { label: 'Technical select', date: '2024-10-23', completed: true },
  //   { label: 'Management Select', date: '2024-11-23', completed: true },
  //   { label: 'Documentation verified', date: '2024-11-30', completed: true },
  //   { label: 'Salary Approved', completed: false },
  //   { label: 'Offer Letter accepted', completed: false },
  //   { label: 'Joined', completed: false },
  // ];


  // updateNextPendingStatus(statusList: StatusItem[]): void {
  //   const nextPending = statusList.find(item => !item.completed);
  //   if (nextPending) {
  //     nextPending.completed = true;
  //     const today = new Date();
  //     const formattedDate = today.toISOString().split('T')[0];
  //     nextPending.date = formattedDate;    }
  // }

  // get statusOptions(): string[] {
  //   const nextSteps = this.statusList.filter(step => !step.completed).map(step => step.label);
  //   return [...nextSteps, 'Reject'];
  // }

  // candidate = {    
  //   id: 'CND-034',
  //   name: 'Arjun Menon',
  //   mobile: '8089888786',
  //   email: 'arjunmenon@gmail.com',
  //   totalExperience: '4 years',
  //   relevantExperience: '3 years',
  //   noticePeriod: '30 days',
  //   currentCTC: 600000,
  //   expectedCTC: 750000,
  //   source: 'Linkedin',
  //   location: 'Trivandrum',
  //   employer: 'UST',
  // };


  constructor(private router: Router, private route: ActivatedRoute,  private candidateService: CandidateService1) {}

  

//   loadCandidate(id: number): void {
//   this.candidateService.getCandidateDetails(id).subscribe({
//     next: (response) => {
//       this.candidate = response.data;
      
//       // Format candidateID with prefix 'CAN'
//       this.candidate.candidateID = `CAN${this.candidate.candidateID.toString().padStart(3, '0')}`;
//       this.candidate.totalExperience = `${this.candidate.totalExperience}  years`;
//       this.candidate.relavantExperience = `${this.candidate.relavantExperience}  years`;
//       this.candidate.noticePeriod = `${this.candidate.noticePeriod}  days`;
//       this.candidate.currentCTC = `${this.candidate.currentCTC} LPA`;
//       this.candidate.expectedCTC = this.candidate.expectedCTC  ? `${this.candidate.expectedCTC} LPA`  : 'Not specified';    },
//     error: (err) => {
//       console.error('Error fetching candidate details:', err);
//     }
//   });
// }

private performStatusUpdate(action: 'progress' | 'reject'): void {
    this.isLoading=true;
    this.candidateService.updateApplicationStatus(this.applicationId, action).subscribe({
      next: () => {
        const actionMessage = action === 'progress' ? 'moved to the next stage successfully!' : 'has been rejected.';
        this.triggerToast(actionMessage);
        this.loadApplicationDetails();
         // Reload all data from server on success
      },
        error: (err) =>{
      this.isLoading=false;
      console.error(`Failed to ${action} candidate`, err)
      this.triggerToast(`Failed to ${action} candidate`)},

      complete: () => {
        this.loadApplicationDetails(); }
    });
  }

  triggerToast(successMessage: string) {
  const candidateName = this.candidate?.candidateName || 'Candidate';
  this.toastComponent.toastData = {
    severity: 'success',
    summary: 'Success',
    detail: `${candidateName} ${successMessage}`,
  };
  this.toastComponent.showToast();
}
  @ViewChild('alerts') alertsComponent!: AlertsComponent;
  
  selectCandidate(): void {
    if (!this.candidate) return;
    this.alertsComponent.showConfirmDialog({
      message: `Are you sure you want to progress ${this.candidate.candidateName} to the next stage?`,
      header: 'Next Stage',
      onAccept: () => this.performStatusUpdate('progress'),
    });
  }

  rejectCandidate(): void {
    if (!this.candidate) return;
    this.alertsComponent.showConfirmDialog({
      message: `Are you sure you want to reject ${this.candidate.candidateName}?`,
      header: 'Reject Applicant',
      onAccept: () => this.performStatusUpdate('reject'),
    });
  }

//   selectCandidate(row: any){
//       const message = `Are you sure you want to progress ${this.candidate.candidateName} to next stage?`;
//       this.alertsComponent.showConfirmDialog({
//         message: message,
//         header: `Next Stage`,
//         // icon: 'pi pi-plus',
//         acceptLabel: 'Next Stage',
//         rejectLabel: 'Cancel',
//         acceptSeverity: 'success',
//         rejectSeverity: 'warn',
//         acceptSummary: 'Success',
//         rejectSummary: 'Cancelled',
//         acceptDetail: `${this.candidate.candidateName} progressed to next stage !`,
//         rejectDetail: 'No changes were made.',
//         onAccept: () => { 
//           this.updateNextPendingStatus(this.statusList) 
//         },
//         onReject: () => {
//         }
//       });  
//   }

//   rejectCandidate(row: any){
//     const message = `Are you sure you want to reject ${this.candidate.candidateName}?`;
//     this.alertsComponent.showConfirmDialog({
//       message: message,
//       header: `Reject Applicant`,
//       // icon: 'pi pi-plus',
//       acceptLabel: 'Reject',
//       rejectLabel: 'Cancel',
//       acceptSeverity: 'success',
//       rejectSeverity: 'warn',
//       acceptSummary: 'Rejected',
//       rejectSummary: 'Cancelled',
//       acceptDetail: `Rejected ${this.candidate.candidateName}!`,
//       rejectDetail: 'No changes were made.',
//       onAccept: () => {  
//         this.candidateStatus = 'rejected';
//         this.finished=true;

//       },
//       onReject: () => {
//       }
//     });  
// }




}
