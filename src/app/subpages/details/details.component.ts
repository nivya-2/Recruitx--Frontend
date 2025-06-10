import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { InputTextComponent } from "../../ui/input-text/input-text.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { TextAreaComponent } from "../../ui/text-area/text-area.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { NgIf } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { ApiResponse } from '../../core/services/api/auth.service';
import { JobDescriptionService, JobDescriptionDTO } from '../../core/services/api/job-description.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; 

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [NgIf, ProgressSpinnerModule,HeaderTextComponent, CardsComponent, InputTextComponent, ButtonComponent, TextAreaComponent, ModalComponent, AlertsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  @Input() jdId?: number | null;
  @Input() actionType?: 'GenerateJD' | 'Draft' | null;
  formData:any =[];
  isLoading: boolean = true;
  isDraftSaved: boolean = false;
   @Output() actionCompleted = new EventEmitter<void>();


  constructor(private jobDescService: JobDescriptionService, private route: ActivatedRoute) {}
  ngOnInit(): void {

     if (this.jdId && this.actionType) {
      console.log(`Loading details via @Input: id=${this.jdId}, action=${this.actionType}`);
      this.loadJobData(this.jdId, this.actionType);
    }
    // Priority 2: Fallback to checking the URL for an ID
    else {
      console.log('Loading details via ActivatedRoute.');

    this.route.paramMap.subscribe(params => {
      const jobRequisitionIdStr = params.get('id');
      if (jobRequisitionIdStr) {
        const jobRequisitionId = Number(jobRequisitionIdStr);
        if (!isNaN(jobRequisitionId)) {
            this.loadJobData(jobRequisitionId, 'Draft');
          console.log(`Loaded job details from URL: id=${jobRequisitionId}`);
          this.jdId = jobRequisitionId; // Store the ID for later use
        } else {
          console.error('Invalid job requisition id in URL');
        }
      } else {
        console.error('Job requisition id not found in URL or as input');
                  this.isLoading = false;

      }
    });}
  }
   
    loadJobData(id: number, action: 'GenerateJD' | 'Draft'| null): void {
    this.isLoading = true;
    this.isDraftSaved = (action === 'Draft' ); // If action is 'Draft' or null, we assume it's a draft view

    let apiCall: Observable<ApiResponse<JobDescriptionDTO>>;

    // Decide which API to call based on the action
    if (action === 'GenerateJD') {
      apiCall = this.jobDescService.generateJdFromRequisition(id);
    } else { // 'draft' covers both viewing a draft and viewing a JD from a direct URL
      apiCall = this.jobDescService.getJobDescription(id);
    }

    apiCall.subscribe({
      next: (response) => {
        const data = response.data;
        this.populateFormData(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(`Failed to load job details for id=${id} with action='${action}'`, err);
        this.isLoading = false;
      }
    });
  }



   populateFormData(data: JobDescriptionDTO): void {
    // ... (This method remains unchanged)
    this.formData = {
      skillsMandatory: data.skillsMandatory,
      skillsPrimary: data.skillsPrimary,
      skillsGood: data.skillsGood || '',
      role: data.role,
      workLocation: data.workLocation,
      relevantExpYears: (data.relevantExperienceYears ?? 0).toString(),
      relevantExpMonths: (data.relevantExperienceMonths ?? 0).toString(),
      qualification: data.qualification,
      totalExpYears: (data.totalExperienceYears ?? 0).toString(),
      totalExpMonths: (data.totalExperienceMonths ?? 0).toString(),
      onboardingDate: this.formatDate(data.onboardingDate),
      jobDescription: data.jobDescription,
      jobPurpose: data.jobPurpose,
      jobSpecification: data.jobSpecification,
      additionalInfo: ''
    };
  }

 private buildPayload(): JobDescriptionDTO {
    // Step 1: Destructure `formData` to separate unwanted properties
    // and properties that need type conversion.
    const {
      totalExpYears,         // We will handle this manually
      totalExpMonths,        // We will handle this manually
      relevantExpYears,      // We will handle this manually
      relevantExpMonths,     // We will handle this manually
      ...basePayload          // 'basePayload' now contains all the other string properties
    } = this.formData;

    // Step 2: Build the final, clean payload
    const payload: JobDescriptionDTO = {
      ...basePayload, // Spread the clean base properties (e.g., role, workLocation)
      
      jobRequisitionId: this.jdId!, // Add the required ID
      
      // Step 3: Add the correctly typed and named number properties
      totalExperienceYears: parseInt(totalExpYears, 10) || 0,
      totalExperienceMonths: parseInt(totalExpMonths, 10) || 0,
      relevantExperienceYears: parseInt(relevantExpYears, 10) || 0,
      relevantExperienceMonths: parseInt(relevantExpMonths, 10) || 0,
    };

    // Before sending, log the final payload to see exactly what the API will get.
    // This is your best debugging tool.

    return payload;
  }

  formatDate(dateStr: string): string {
    return dateStr.replace(/-/g, '/');
  }

 
  modal(){
    this.visible = !this.visible;
  }
   
  label: string = 'Edit';

  isEditMode: boolean = false;
  visible: boolean = false;

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    return this.isEditMode;
  }


  scrollToSection() {
  const el = document.querySelector(".jdfields");
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
// formData = {
//     skillsMandatory: 'HTML, CSS, JavaScript',
//     skillsPrimary: 'Angular, TypeScript',
//     skillsGood: 'React, Node.js',
//     role: 'Frontend Developer',
//     workLocation: 'Bangalore, India',
//     relevantExpYears: '2',
//     relevantExpMonths: '6',
//     qualification: 'B.Tech in Computer Science or equivalent',
//     totalExpYears: '3',
//     totalExpMonths: '0',
//     onboardingDate: '15/07/2025',
//     jobDescription: `• Develop and maintain front-end components using Angular
// • Collaborate with UX/UI designers to implement responsive designs
// • Integrate REST APIs and ensure performance optimization
// • Participate in code reviews and team meetings`,
//     jobPurpose: `To build and enhance web applications that improve user experience and business performance.`,
//     jobSpecification: `• Strong proficiency in Angular and TypeScript
// • Good understanding of web standards and accessibility
// • Ability to write clean, maintainable code
// • Excellent problem-solving and teamwork skills`,
//     additionalInfo: `Looking for candidates who can join within 30 days. Hybrid work option available.`
//   };
exportAsPDF() {
   const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to add text with word wrapping
 const addTextWithWrapping = (
  text: string | undefined,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number = 10
): number => {
  if (!text) return y;

  pdf.setFontSize(fontSize);
  const lines = pdf.splitTextToSize(text, maxWidth);
  const lineHeight = fontSize * 0.35;

  for (const line of lines) {
    if (y + lineHeight > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
    pdf.text(line, x, y);
    y += lineHeight;
  }

  return y;
};

  // Helper function to check if new page is needed
  const checkNewPage = (currentY: number, requiredHeight: number = 20) => {
    if (currentY + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      return margin;
    }
    return currentY;
  };

  // Title
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Job Description', margin, yPosition);
  yPosition += 15;

  // Job Role
  yPosition = checkNewPage(yPosition);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Role:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.role, margin + 25, yPosition, maxWidth - 25, 12);
  yPosition += 10;

  // Work Location
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Work Location:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.workLocation, margin + 35, yPosition, maxWidth - 35, 12);
  yPosition += 10;

  // Experience
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Total Experience:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  const totalExp = `${this.formData.totalExpYears} Years ${this.formData.totalExpMonths} Months`;
  yPosition = addTextWithWrapping(totalExp, margin + 40, yPosition, maxWidth - 40, 12);
  yPosition += 5;

  pdf.setFont('helvetica', 'bold');
  pdf.text('Relevant Experience:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  const relevantExp = `${this.formData.relevantExpYears} Years ${this.formData.relevantExpMonths} Months`;
  yPosition = addTextWithWrapping(relevantExp, margin + 45, yPosition, maxWidth - 45, 12);
  yPosition += 10;

  // Qualification
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Qualification:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.qualification, margin + 30, yPosition, maxWidth - 30, 12);
  yPosition += 10;

  // Onboarding Date
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Expected Onboarding:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.onboardingDate, margin + 45, yPosition, maxWidth - 45, 12);
  yPosition += 15;

  // Skills Section
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Skills & Requirements', margin, yPosition);
  yPosition += 10;

  // Mandatory Skills
  yPosition = checkNewPage(yPosition);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Mandatory Skills:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.skillsMandatory, margin + 35, yPosition, maxWidth - 35, 12);
  yPosition += 8;

  // Primary Skills
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Primary Skills:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.skillsPrimary, margin + 30, yPosition, maxWidth - 30, 12);
  yPosition += 8;

  // Good to Have Skills
  if (this.formData.skillsGood) {
    yPosition = checkNewPage(yPosition);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Good to Have:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    yPosition = addTextWithWrapping(this.formData.skillsGood, margin + 30, yPosition, maxWidth - 30, 12);
    yPosition += 15;
  }

  // Job Purpose
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Job Purpose', margin, yPosition);
  yPosition += 8;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.jobPurpose, margin, yPosition, maxWidth, 12);
  yPosition += 15;

  // Job Description
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Job Description / Duties & Responsibilities', margin, yPosition);
  yPosition += 8;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.jobDescription, margin, yPosition, maxWidth, 12);
  yPosition += 15;

  // Job Specification
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Job Specification / Skills and Competencies', margin, yPosition);
  yPosition += 8;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(this.formData.jobSpecification, margin, yPosition, maxWidth, 12);
  yPosition += 15;

  // Additional Information
  if (this.formData.additionalInfo) {
    yPosition = checkNewPage(yPosition, 30);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Additional Information', margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    yPosition = addTextWithWrapping(this.formData.additionalInfo, margin, yPosition, maxWidth, 12);
  }

  pdf.save('JobDescription.pdf');
}


exportAsExcel(): void {
  const formData = this.formData; // Ensure formData is defined in your component

  const jdData = [
    {
      'Work Location': formData.workLocation,
      'Relevant Experience': `${formData.relevantExpYears} Years ${formData.relevantExpMonths} Months`,
      'Total Experience': `${formData.totalExpYears} Years ${formData.totalExpMonths} Months`,
      'Qualification': formData.qualification,
      'Expected Onboarding Date': formData.onboardingDate,
      'Skills - Mandatory': formData.skillsMandatory,
      'Skills - Primary': formData.skillsPrimary,
      'Skills - Good To Have': formData.skillsGood,
      'Job Purpose': formData.jobPurpose,
      'Job Description / Duties & Responsibilities': formData.jobDescription,
      'Job Specification / Skills and Competencies': formData.jobSpecification,
      'Any Additional Information/Specifics': formData.additionalInfo
    }
  ];

  // Generate worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jdData);

  // Apply wrapText and top alignment styles
  const range = XLSX.utils.decode_range(ws['!ref']!);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[cellAddress];
      if (!cell) continue;
      if (!cell.s) cell.s = {};
      cell.s.alignment = { wrapText: true, vertical: 'top' };
    }
  }

  // Estimate column widths based on content
  const columnKeys = Object.keys(jdData[0]);
  ws['!cols'] = columnKeys.map((key) => {
    const maxLength = Math.max(
      key.length,
      ...jdData.map(row => ((row as any)[key] ? (row as any)[key].toString().length : 0))
    );
    return { wch: Math.min(100, maxLength + 5) };
  });

  // Create workbook
  const wb: XLSX.WorkBook = {
    Sheets: { 'Job Description': ws },
    SheetNames: ['Job Description']
  };

  // Export to file
  const excelBuffer: any = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array',
    cellStyles: true
  });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'JobDescription.xlsx');
}



  // resetForm() {
    // Optional: Reset the formData to initial values or clear
  // }

  // saveDraft() {
  //   console.log('Saving Draft:', this.formData);
  // }

  // submitForm() {
  //   console.log('Submitting Form:', this.formData);
  //   // You can call your API here
  // }

  @ViewChild('alerts') alertsComponent!: AlertsComponent;

  onEdit() {
    this.scrollToSection();
    this.isEditMode = true;
    this.label = 'Save';
  }
  
  onSave() {
    const message = `Are you sure you want to save changes in JD?`;
    this.alertsComponent.showConfirmDialog({
      message,
      icon:'pi pi-save',
      header: 'Save Changes',
      acceptLabel: 'Save',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'warn',
      acceptSummary: 'Saved',
      rejectSummary: 'Cancelled',
      acceptDetail: `Saved all edits in JD!`,
      rejectDetail: 'No changes were made.',
      onAccept: () => {
         
        const payload = this.buildPayload(); // Create the clean payload
         console.log("SENDING SAVE PAYLOAD:", payload)
         this.jobDescService.updateJobDescription(this.jdId!, payload).subscribe({
          // Step 2: Handle a SUCCESSFUL response from the server
          next: (savedData) => {
            console.log('Save successful:', savedData);

        this.isDraftSaved = true;
        this.isEditMode = false;
        this.label = 'Edit';
        this.actionCompleted.emit(); 

      },
    });
  }
      ,
      onReject: () => {
        // Do nothing
      }
    });
  }
  
  onCancel() {
    this.isEditMode = false;
    this.label = 'Edit';
  }
  onSubmit() {
    
    const message = `Are you sure you want to submit this JD?`;
    this.alertsComponent.showConfirmDialog({
      message,
      icon:'pi pi-save',
      header: 'Save Changes',
      acceptLabel: 'Save',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'warn',
      acceptSummary: 'Saved',
      rejectSummary: 'Cancelled',
      acceptDetail: `Submit JD!`,
      rejectDetail: 'No submissions were made.',
      onAccept: () => {
         
        const payload = this.buildPayload(); // Create the clean payload
        let draftReady$: Observable<any>;

    if (this.isDraftSaved) {
      // If draft is already saved, we don't need to call the save API.
      // We create an observable that emits immediately with a 'true' value.
      console.log("Draft already exists. Proceeding directly to submit.");
      draftReady$ = of(true); // 'of' creates an observable that emits a value and completes.
    } else {
      // If draft is not saved, the first step is to call the save API.
      console.log("No draft found. Calling save API first.");
      draftReady$ = this.jobDescService.updateJobDescription(this.jdId!,payload);
    }

    // Now we chain the submission to the draftReady$ observable.
    draftReady$.pipe(
      // switchMap will take the emission from draftReady$ and "switch" to a new observable: the submit call.
      switchMap((saveResult) => {
        console.log("Draft is ready for submission. Result from save step:", saveResult);
        // We know the draft is saved, so update our state flag.
        this.isDraftSaved = true;
        // Now, return the observable for the final submission call.
        return this.jobDescService.submitJobDescription(this.jdId!,payload);
      })
    ).subscribe({
      // This `next` block will ONLY run if BOTH steps (save + submit) are successful.
      next: (submitResponse) => {
        console.log("Submit successful:", submitResponse);
        this.isEditMode = false;
        this.actionCompleted.emit(); 

        // Disable all buttons as the process is complete
      },
    });
  }
      ,
      onReject: () => {
        // Do nothing
      }
    });




  }
  
}
