import { Component } from '@angular/core';
import { InputTextComponent } from '../ui/input-text/input-text.component';


@Component({
  selector: 'app-jd-form',
  imports: [InputTextComponent],
  templateUrl: './jd-form.component.html',
  styleUrl: './jd-form.component.scss'
})
export class JdFormComponent {
   isEditMode: boolean = false;
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
    onboardingDate: '2025-07-15',
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

  resetForm() {
    // Optional: Reset the formData to initial values or clear
  }

  saveDraft() {
    console.log('Saving Draft:', this.formData);
  }

  submitForm() {
    console.log('Submitting Form:', this.formData);
    // You can call your API here
  }
}
