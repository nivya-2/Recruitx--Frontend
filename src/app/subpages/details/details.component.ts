import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { InputTextComponent } from "../../ui/input-text/input-text.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { TextAreaComponent } from "../../ui/text-area/text-area.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { NgIf } from '@angular/common';
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { JobDescriptionDTO, JobDescriptionService } from '../../services/JobDescription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [NgIf,HeaderTextComponent, CardsComponent,AlertsComponent, InputTextComponent, ButtonComponent, TextAreaComponent, ModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  formData:any =[];

  constructor(private jobDescService: JobDescriptionService, private route: ActivatedRoute) {}
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const jobRequisitionIdStr = params.get('id');
      if (jobRequisitionIdStr) {
        const jobRequisitionId = Number(jobRequisitionIdStr);
        if (!isNaN(jobRequisitionId)) {
          this.loadJobDescription(jobRequisitionId);
        } else {
          console.error('Invalid job requisition id in URL');
        }
      } else {
        console.error('Job requisition id not found in URL');
      }
    });
  }

   loadJobDescription(jobRequisitionId: number) {
    this.jobDescService.getJobDescription(jobRequisitionId).subscribe({
      next: data => {
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
      },
      error: err => {
        console.error('Failed to load job description', err);
      }
    });
  }

  formatDate(dateStr: string): string {
    return dateStr.replace(/-/g, '/');
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
        this.isEditMode = false;
        this.label = 'Edit';
      },
      onReject: () => {
        // Do nothing
      }
    });
  }
  
  onCancel() {
    this.isEditMode = false;
    this.label = 'Edit';
  }
  
}
