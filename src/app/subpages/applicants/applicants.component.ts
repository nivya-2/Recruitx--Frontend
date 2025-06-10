import { Component, inject, ViewChild } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from "../../ui/modal/modal.component";
import { UploadComponent } from "../../shared-components/upload/upload.component";
import { CandidateDTO, CandidateService } from '../../core/services/api/applicants.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CandidateData, XcelParserService } from '../../core/services/other/xcel-parser.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; 
import { BulkAddResultDTO, BulkUploadCandidatesService, MappedCandidateData } from '../../core/services/api/bulk-upload-candidates.service';
import { error } from 'console';
import { ToastComponent } from "../../ui/toast/toast.component";


@Component({
  selector: 'app-applicants',
  imports: [TableComponent, ButtonComponent, ModalComponent, UploadComponent, CommonModule, ProgressSpinnerModule, ToastComponent],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent {

    @ViewChild('toast') toastComponent!: any;
  isLoading: boolean = true;
  isUploading: boolean = false;
  accept:string ='.csv,.xlsx';
constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private uploadService:BulkUploadCandidatesService,
    private candidateParserService: XcelParserService,
  ) {}

jobId:number=0;

routes!: (row: any) => void;

ngOnInit(): void {
   this.jobId = Number(this.route.snapshot.paramMap.get('id')); // Get jobId here

    if (!isNaN(this.jobId)) {
      this.loadCandidates(this.jobId);
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

 const applicationId = row?.applicationID;

this.router.navigate([`/${rolePrefix}/job-description/applicant-details`, applicationId]);
};

  };
}
 triggerToast(message: string, type: 'success' | 'error' = 'success') {
  this.toastComponent.toastData = {
    severity: type,
    summary: type === 'success' ? 'Success' : 'Error',
    detail: message,
  };
  this.toastComponent.showToast();
}

loadCandidates(jobId: number): void {
    this.candidateService.getCandidatesByJobRequisitionId(jobId).subscribe({
      next: (response) => {
        this.dataSource = response.data.map(candidate => ({
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

async handleUploadComplete(files: File[]): Promise<void> {
    
    if (!files || files.length === 0) {
      this.triggerToast('No files were selected for upload.',"error");
      return;
    }

    let filesWithErrors: string[] = [];
    
    if (isNaN(this.jobId)) {
      this.triggerToast('Job ID is missing or invalid.,"error"');
      return;
    }
        this.isUploading = true; // Start the spinner

    try {
      // Use Promise.all to parse all selected files in parallel
      const parsingPromises = files.map(file =>
        // The service now directly returns Promise<CandidateData[]>
        this.candidateParserService.parseFile(file)
          .catch(error => {
            console.error(`Error parsing file "${file.name}":`, error);
            filesWithErrors.push(file.name);
            return []; // Return an empty array on failure, which simplifies aggregation
          })
      );

      const results = await Promise.all(parsingPromises);

      // Flatten the array of arrays (e.g., [[c1, c2], [], [c3]]) into a single list
      const allParsedCandidates = results.flat();

      // Check if any candidates were parsed at all
      if (allParsedCandidates.length === 0) {
        this.triggerToast('None of the selected files could be read or they were empty, Parsing Failed', 'error');
        return; // Exit the function
      }
    
      // Your original logic now proceeds with the combined data
      console.log("Combined parsed data from all files:", allParsedCandidates);

      const candidatesToSubmit = this.mapParsedDataToDTO(allParsedCandidates);
      console.log(candidatesToSubmit);
      
      // 3. Call your backend service to save the new candidates
      this.uploadService.bulkAddCandidates(this.jobId, candidatesToSubmit).subscribe({
        next: (response) => {
          this.triggerToast(`${candidatesToSubmit.length} candidates added successfully!`, 'success');
          this.closeModal();
          this.loadCandidates(this.jobId);
        },
        error: (err) => {
          console.error('Error submitting candidates:', err);
          this.triggerToast(err.error?.message || 'Failed to save new candidates.', 'error');
        },
        complete: () => {
          this.isUploading = false;
        }
      });
    }
    catch (error: any) {
      console.error('File parsing error:', error);
      this.triggerToast(error.message, 'error');
      this.isUploading = false;
    }
  }
  closeModal() {

    this.visible=!this.visible;
    this.loadCandidates(this.jobId); 

  }

  /**
   * Maps data from the parser's format to your CandidateService DTO format.
   * This is a CRITICAL step. Adjust keys as needed.
   */
  private mapParsedDataToDTO(parsedData: CandidateData[]): MappedCandidateData[] {
  return parsedData.map(p => {
    // Attempt to convert the phone number string to a number.
    // We use parseInt to be safe and handle non-numeric input gracefully.
    const phoneAsNumber = parseInt(p.contactNo, 10);

    return {
      // Map parser keys to DTO keys
      candidateName: p.candidateName,
      candidateEmail: p.emailId,
      // Use the converted number. If it's not a valid number (isNaN), 
      // your backend might prefer null or you might omit it.
      // For this DTO, we'll assume a valid number is required.
      candidatePhone: !isNaN(phoneAsNumber) ? phoneAsNumber : undefined, // This will be filtered out if undefined
      totalExperienceYears: p.totalExp,
      relevantExperienceYears: p.relevantExp,
      currentLocation: p.currentLocation,
      noticePeriod: p.noticePeriod,
      source: p.source,
      role: p.proposedRole,
      subSource: p.subSource ?? null,
      skill: p.skill,
      linkedin: p.linkedinUrl ?? null,
      currentEmployer:p.currentEmployer,
      currentCTC: p.cctcFixed,
      expectedCTC: p.ectc ?? null,
      preferedLocation: p.preferredLocation
      // Add any other fields your DTO requires
    };
  });
}


  columns: Array<{ key: string, label: string, filterable: boolean , type?:string}> = [
    { key: 'candidateId', label: 'Candidate ID', filterable: false },
    { key: 'candidateName', label: 'Name', filterable: true },
    { key: 'candidateEmail', label: 'Email ID', filterable: true },
    { key: 'candidatePhone', label: 'Phone Number', filterable: false },
    { key: 'totalExperienceYears', label: 'Total Experience (In years)', filterable: false },
    // { key: 'relevantExp', label: 'Relevant Experience (In years)', filterable: false },
    // { key: 'currentLocation', label: 'Current Location', filterable: true },
    // { key: 'noticePeriod', label: 'Notice Period (In Days)', filterable: false },
    { key: 'source', label: 'Application Source', filterable: true },
    { key: 'actions', label: 'View Details', filterable: false, type:'actions' }
  ];

  
  globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions');
      actionMethods = {'Details': this.routes}

}

