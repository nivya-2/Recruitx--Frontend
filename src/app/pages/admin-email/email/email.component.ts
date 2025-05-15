import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import 'quill/dist/quill.snow.css';

import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { EmailTemplate } from '../email-templates.model';

@Component({
  selector: 'app-email',
  imports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    InputTextModule,
    ButtonModule,
    ChipModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent {

  private _template: EmailTemplate | null = null;

  invitationForm!: FormGroup;

  @Input() set template(value: EmailTemplate | null) {
     this._template = value;
    if (value) {
      this.updateFormWithTemplate(value);
    }
  }
  get template(): EmailTemplate | null {
    return this._template;
  }
  defaultEmailContent: string = `Dear {{employee_name}},<br><br>

Welcome to RecruitX! We are excited to have you onboard as a {{role}}.<br>

To complete your setup, please accept your assigned role by clicking the link below:<br>

Role Acceptance Link: {{role_acceptance_link}}

Your role will allow you to access the platform and begin contributing to our recruitment success. We look forward to seeing the impact you will create!<br>

If you have any questions, feel free to reach out to the Talent Acquisition team.<br><br>

Best regards,<br>
RecruitX Team`;


  availableVariables = [
    { key: '{{candidate_name}}' },
    { key: '{{job_title}}' },
    { key: '{{company_name}}' },
    { key: '{{application_date}}' },
    { key: '{{recruiter_name}}' },
    { key: '{{recruiter_email}}' }
  ];

  showPreview = false;
  previewData = {
    subject: '',
    content: ''
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
        this.initForm();
  }
  private initForm():void{
    this.invitationForm = this.fb.group({
  emailSubject: ['Welcome to RecruitX - Confirm Your Role', Validators.required],
  emailContent: [this.defaultEmailContent, Validators.required]
});
  }
 private updateFormWithTemplate(template: EmailTemplate): void {
    // Update the form with the selected template values
  const content = template.content || this.defaultEmailContent;
  const contentWithBreaks = content.replace(/\n/g, '<br>');
    this.invitationForm.patchValue({
      emailSubject: template.subject || 'Email Subject',
      emailContent: template.content || this.defaultEmailContent
    });
  }

  insertVariable(variable: string): void {
  const current = this.invitationForm.get('emailContent')?.value || '';
  this.invitationForm.get('emailContent')?.setValue(current + ' ' + variable);
}

  preview(): void {
   this.previewData = {
  subject: this.invitationForm.get('emailSubject')?.value,
  content: this.invitationForm.get('emailContent')?.value
};
    this.showPreview = true;
    console.log('Preview email:', this.previewData);
  }

  saveTemplate(): void {
    alert('Template saved successfully!');
    console.log('Template saved:', {
      subject: this.invitationForm.get('emailSubject')?.value,
      content: this.invitationForm.get('emailContent')?.value
    });
  }

}
