import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { TableComponent } from '../../shared-components/table/table.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { ButtonIconComponent } from '../../ui/button-icon/button-icon.component';
import { EvaluationFormComponent } from "../evaluation-form/evaluation-form.component";
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { UploadComponent } from '../../shared-components/upload/upload.component';
import { SchedulePageComponent } from '../schedule-page/schedule-page.component';
import { DocxParserService, JobRequisitionData } from '../../core/services/other/docxparser.service';
import { JrApiService } from '../../core/services/api/jr-api.service';
import { ApiResponse } from '../../core/services/api/CommonAPIResponse';
import { NgIf } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';
export interface JobRequisitionDto {
  id: number;
  role: string;
  departmentName: string;
  locationName: string;
  hiringManagerName: string;
  requestedOn: string; // or Date
  isAssigned: boolean;
}
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    TableComponent,
    CommonLayoutComponent,
    CardsComponent,
    SchedulePageComponent,
    HeaderTextComponent,
    ButtonIconComponent,
    ModalComponent,
    UploadComponent,
    AlertsComponent,
    EvaluationFormComponent,
    NgIf,
    ProgressSpinner
  ],
  templateUrl: './admin-jr-upload.component.html',
  styleUrl: './admin-jr-upload.component.scss',
})
export class AdminJrUploadComponent implements OnInit {
    isLoading = false;
  private loadJobRequisitions(): void {
  this.isLoading = true;
  this.jrApiService.getAll().subscribe({
    next: (response: ApiResponse<JobRequisitionDto[]>) => {
      if (response?.success && Array.isArray(response.data)) {
        const jobRequisitions: JobRequisitionDto[] = response.data;
        this.dataSource = jobRequisitions.map(jr => ({
          jobReqId: `REQ_2025_${jr.id.toString().padStart(3, '0')}`,
          jobTitle: jr.role,
          deliveryUnit: jr.departmentName,
          location: jr.locationName,
          hiringManager: jr.hiringManagerName,
          assignedOn: jr.requestedOn,
          actions: jr.isAssigned ? [] : ['Delete']
        }));
      } else {
        console.warn('Unexpected API response format or unsuccessful response:', response);
        this.dataSource = [];
      }
      this.isLoading = false; // ✅ correctly placed
    },
    error: (error) => {
      console.error('Error loading job requisitions:', error);
      this.dataSource = [];
      this.isLoading = false; // ✅ also here
    }
  });

  }
  ngOnInit(): void {
    this.loadJobRequisitions();
  }
  @ViewChild('alerts') alertsComponent!: AlertsComponent;

  visible: boolean = false;
  uploadedFiles: File[] = [];
  isProcessing: boolean = false;

  // Predefined test data
  private readonly PREDEFINED_PAYLOAD = {
    role: "Senior Software Engineer",
    requestedDate: "2025-06-03",
    requestedByName: "Sarah Johnson",
    departmentName: "Engineering",
    hiringManagerName: "Michael Chen",
    skills: [
      { skillName: "Angular", skillType: "Primary" },
      { skillName: "TypeScript", skillType: "Mandatory" },
      { skillName: "Jasmine", skillType: "GoodToHave" }
    ],
    qualification: "B.Tech in Computer Science",
    totalExperienceYears: 5,
    relevantExperienceYears: 4,
    locationName: "Bangalore",
    locationCountry: "India",
    expectedOnboardingDate: "2025-07-01",
    numPositions: 3,
    workShift: "US",
    hasOnsiteOpportunity: true,
    isBillable: true,
    hasClientInterview: true,
    projectName: "RecruitX Platform Revamp",
    projectRole: "Frontend Developer",
    clientName: "TechNova Inc.",
    clientCountry: "USA",
    expectedSalaryMinimum: 12,
    expectedSalaryMaximum: 18,
    jobPurpose: "To enhance and modernize the frontend of the RecruitX platform using Angular.",
    jobDuties: "Develop UI components, collaborate with backend teams, and ensure responsive design and performance optimization.",
    jobSpecification: "Must have experience with Angular, RxJS, NgRx, and REST APIs. Exposure to CI/CD pipelines is a plus.",
    workModel: "Hybrid",
    onSiteDetails: {
      contractType: "Contract",
      rate: "75 USD/hour",
      workLocation: "San Jose, CA",
      preferredVisaStatus: "US Citizen",
      contractDuration: "12 Months",
      preferredTimeZone: "PST",
      clientBackground: "TechNova Inc. is a leading provider of recruitment software solutions.",
      clientLocation: "San Jose, CA",
      reportingTo: "Director of Engineering",
      interviewProcess: "1 Technical + 1 Managerial + 1 Client Round",
      idealStartDate: "2025-06-25T09:00:00.000Z",
      isH1TransferAccepted: true,
      isTravelRequired: false
    },
    createdByEmployeeName: "Emily Davis",
    status: "Open"
  };

  constructor(
    private docxParser: DocxParserService,
    private jrApiService: JrApiService
  ) {}

  openModal(): void {
    this.visible = !this.visible;
  }

  closeModal(): void {
    this.visible = false;
  }

  onFilesUploaded(files: File[]): void {
    this.uploadedFiles = files;
    console.log('Files uploaded:', files);
  }

  async onUploadComplete(files: File[]): Promise<void> {
    this.isLoading=true;
    if (!files || files.length === 0) {
      console.warn('No files to process');
      this.isLoading=true;

      return;
    }

    this.uploadedFiles = files;
    this.isProcessing = true;

    try {
      await this.processUploadedFiles(files);
      this.closeModal();
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async processUploadedFiles(files: File[]): Promise<void> {
    this.isLoading=true;
    console.log('\n=== PROCESSING FILES ===');
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`\nProcessing file ${i + 1}/${files.length}: ${file.name}`);

      try {
        if (!this.isDocxFile(file)) {
          console.warn(`Skipping ${file.name} - not a .docx file`);
          continue;
        }

        // Parse the file
        const parsedData = await this.docxParser.parseJobRequisitionFile(file);
        
        // Log parsed data as object
        console.log('\n📋 PARSED DATA:');
        console.log(parsedData);

        // Map parsed data to required payload format
        const mappedPayload = this.mapParsedDataToPayload(parsedData);
        
        // Log mapped payload
        console.log('\n🔄 MAPPED PAYLOAD:');
        console.log(mappedPayload);

        // Log predefined data for comparison
        console.log('\n🔧 PREDEFINED PAYLOAD:');
        console.log(this.PREDEFINED_PAYLOAD);

        // Post the job requisition using mapped data
        await this.postJobRequisitionWithPayload(mappedPayload);
        this.isLoading=false;


      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        this.isLoading=false;

      }
    }
  }

  private isDocxFile(file: File): boolean {
    return file.name.toLowerCase().endsWith('.docx') || 
           file.type.includes('wordprocessingml');
  }

  private mapParsedDataToPayload(parsedData: JobRequisitionData): any {
    // Helper function to convert date format
    const convertDate = (dateStr: string): string => {
      if (!dateStr) return '';
      // Convert DD-MM-YYYY to YYYY-MM-DD
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
      return dateStr;
    };

    // Helper function to extract salary range
    const extractSalaryRange = (salaryRange: string): { min: number | null, max: number | null } => {
      if (!salaryRange) return { min: null, max: null };
      const match = salaryRange.match(/(\d+)\s*-\s*(\d+)/);
      return match ? { min: Number(match[1]), max: Number(match[2]) } : { min: null, max: null };
    };

    // Map skills to required format
    const skills: { skillName: string; skillType: string }[] = [];
    
    // Add mandatory skills
    if (parsedData.skillsMandatory?.length) {
      parsedData.skillsMandatory.forEach(skill => {
        if (skill?.trim()) {
          skills.push({ skillName: skill.trim(), skillType: 'Mandatory' });
        }
      });
    }
    
    // Add primary skills
    if (parsedData.skillsPrimary?.length) {
      parsedData.skillsPrimary.forEach(skill => {
        if (skill?.trim()) {
          skills.push({ skillName: skill.trim(), skillType: 'Primary' });
        }
      });
    }
    
    // Add good to have skills
    if (parsedData.skillsGoodToHave?.length) {
      parsedData.skillsGoodToHave.forEach(skill => {
        if (skill?.trim()) {
          skills.push({ skillName: skill.trim(), skillType: 'GoodToHave' });
        }
      });
    }

    // Extract salary range
    const salaryRange = extractSalaryRange(parsedData.expectedSalaryRange || '');

    // Join job description and skills arrays
    const jobDuties = parsedData.jobDescription?.filter(desc => desc && desc.trim() && desc !== 'Job Description / Duties and Responsibilities').join('\n') || '';
    const jobSpecification = parsedData.skillsAndCompetencies?.filter(skill => skill && skill.trim() && skill !== 'Job Specification / Skills and Competencies').join('\n') || '';

    // Determine work model based on onsite opportunity
    const workModel = parsedData.onsiteOpportunity ? 'Hybrid' : 'Remote';

    // Map to required payload format
    return {
      role: parsedData.role || '',
      requestedDate: convertDate(parsedData.requestedDate || ''),
      requestedByName: parsedData.requestedBy || '',
      departmentName: parsedData.businessUnit || '',
      hiringManagerName: parsedData.hiringManager || '',
      skills: skills.length > 0 ? skills : [{ skillName: 'Not Specified', skillType: 'Primary' }],
      qualification: parsedData.qualification || '',
      totalExperienceYears: Number(parsedData.totalExperience) || 0,
      relevantExperienceYears: Number(parsedData.relevantExperience) || 0,
      locationName: parsedData.workLocation || '',
      locationCountry: parsedData.clientCountry === 'United States' ? 'USA' : (parsedData.clientCountry || 'India'),
      expectedOnboardingDate: convertDate(parsedData.expectedOnboardingDate || ''),
      numPositions: Number(parsedData.numberOfPositions) || 1,
      workShift: parsedData.workShifts || '',
      hasOnsiteOpportunity: Boolean(parsedData.onsiteOpportunity),
      isBillable: Boolean(parsedData.billable),
      hasClientInterview: Boolean(parsedData.clientInterview),
      projectName: parsedData.projectName || '',
      projectRole: parsedData.projectRole || '',
      clientName: parsedData.clientName || '',
      clientCountry: parsedData.clientCountry === 'United States' ? 'USA' : (parsedData.clientCountry || ''),
      expectedSalaryMinimum: salaryRange.min,
      expectedSalaryMaximum: salaryRange.max,
      jobPurpose: parsedData.jobPurpose || '',
      jobDuties: jobDuties,
      jobSpecification: jobSpecification,
      workModel: workModel,
      onSiteDetails: {
        contractType: parsedData.contractType || '',
        rate: parsedData.rate ? `${parsedData.rate} USD/hour` : '',
        workLocation: parsedData.onsiteWorkLocation || parsedData.clientLocation || '',
        preferredVisaStatus: parsedData.preferredVisaStatus || '',
        contractDuration: parsedData.contractDuration || '',
        preferredTimeZone: parsedData.preferredTimeZone || '',
        clientBackground: parsedData.clientBackground || '',
        clientLocation: parsedData.clientLocation || '',
        reportingTo: parsedData.reportingTo || '',
        interviewProcess: parsedData.interviewProcess || '',
        idealStartDate: convertDate(parsedData.idealStartDate || ''),
        isH1TransferAccepted: Boolean(parsedData.h1TransferAccepted),
        isTravelRequired: Boolean(parsedData.travelRequirements && parsedData.travelRequirements.toLowerCase().includes('travel'))
      },
      createdByEmployeeName: parsedData.hiringManager || '',
      status: 'Open'
    };
  }

  private async postJobRequisitionWithPayload(payload: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.jrApiService.createJobRequisition(payload).subscribe({
        next: (response) => {
        this.loadJobRequisitions();
          console.log('✅ Job requisition posted successfully:', response);
          resolve();
        },
        error: (error) => {
          console.error('❌ Failed to post job requisition:', error);
          reject(error);
        }
      });
    });
  }

  // Table data and configuration
  // job-requisition.model.ts


  dataSource: any[] = [
   
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
    .filter(c => c.key !== 'actions')
    .map(c => c.key);

  actionMethods = {
  'Delete': (rowData: any) => this.deleteJr(rowData)
  };

  deleteJr(rowData: any): void {
  const id = rowData?.jobReqId; // Ensure the 'id' is passed from dataSource

  if (!id) {
    console.warn('No Job Requisition ID provided for deletion');
    return;
  }

  this.alertsComponent.showConfirmDialog({
    message: 'Are you sure you want to delete this JR?',
    header: 'Delete JR',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    acceptSeverity: 'success',
    rejectSeverity: 'warn',
    acceptSummary: 'Deleted',
    rejectSummary: 'Cancelled',
    acceptDetail: 'JR Deleted successfully!',
    rejectDetail: 'No changes were made.',
    onAccept: () => {
      const parts = id.split('_');

      // 2. Get the last element from the resulting array.
      const lastPart = parts[parts.length - 1]; // This will be '27'

      // 3. Convert the string part to an integer.
      // Use parseInt with a radix of 10 for safety.
      const numericId = parseInt(lastPart, 10);
      this.jrApiService.delete(numericId).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(jr => jr.id !== id);
          this.loadJobRequisitions();
          console.log(`Deleted JR with ID: ${id}`);
        },
      
      });

    },
    onReject: () => {
      console.log('JR deletion cancelled');
    }
  });
}

}