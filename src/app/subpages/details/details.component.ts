import { Component, ViewChild } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [NgIf,HeaderTextComponent, CardsComponent, InputTextComponent, ButtonComponent, TextAreaComponent, ModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
 
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
exportAsPDF() {
  const jdForm = document.getElementById('jd-form');
  if (jdForm) {
    html2canvas(jdForm).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('JobDescription.pdf');
    });
  }
}




formData = {
    skillsMandatory: 'HTML, CSS, JavaScript',
    skillsPrimary: 'Angular, TypeScript',
    skillsGood: 'React, Node.js',
    role: 'Frontend Developer',
    workLocation: 'Bangalore, India',
    relevantExpYears: '2',
    relevantExpMonths: '6',
    qualification: 'B.Tech in Computer Science or equivalent',
    totalExpYears: '3',
    totalExpMonths: '0',
    onboardingDate: '15/07/2025',
    jobDescription: `• Develop and maintain front-end components using Angular
• Collaborate with UX/UI designers to implement responsive designs
• Integrate REST APIs and ensure performance optimization
• Participate in code reviews and team meetings`,
    jobPurpose: `To build and enhance web applications that improve user experience and business performance.`,
    jobSpecification: `• Strong proficiency in Angular and TypeScript
• Good understanding of web standards and accessibility
• Ability to write clean, maintainable code
• Excellent problem-solving and teamwork skills`,
    additionalInfo: `Looking for candidates who can join within 30 days. Hybrid work option available.`
  };

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
  onSubmit() {
    this.isEditMode = false;
    this.label = 'Edit';
  }
  
}
