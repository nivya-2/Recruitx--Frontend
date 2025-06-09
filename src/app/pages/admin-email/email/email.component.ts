import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import 'quill/dist/quill.snow.css';

import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
// import { EmailTemplate } from '../email-templates.model';
import { AlertsComponent } from '../../../ui/alerts/alerts.component';
import { EmailTemplate } from '../../../core/services/api/email-template-service.service';

@Component({
  selector: 'app-email',
  imports: [CommonModule,
    AlertsComponent,
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

  @Input() availableVariables: string[] = [];

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


  // availableVariables = [
  //   { key: '{{candidate_name}}' },
  //   { key: '{{job_title}}' },
  //   { key: '{{company_name}}' },
  //   { key: '{{application_date}}' },
  //   { key: '{{recruiter_name}}' },
  //   { key: '{{recruiter_email}}' }
  // ];

  showPreview = false;
  previewData = {
    subject: '',
    content: ''
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();

    if (this.template) {
      this.updateFormWithTemplate(this.template);
    }
  }
  private initForm(): void {
    this.invitationForm = this.fb.group({
      emailSubject: ['Welcome to RecruitX - Confirm Your Role', Validators.required],
      emailContent: [this.defaultEmailContent, Validators.required]
    });
  }


  private updateFormWithTemplate(template: EmailTemplate): void {
    // Update the form with the selected template values
    const content = template.body || this.defaultEmailContent;
    const contentWithBreaks = content.replace(/\n/g, '<br>');
    this.invitationForm.patchValue({
      emailSubject: template.subject || 'Email Subject',
      emailContent: contentWithBreaks || this.defaultEmailContent
    });
  }

  private stripHtml(html: string): string {
    // Create a temporary div element
    const tempDiv = document.createElement('div');
    // Set the HTML content
    tempDiv.innerHTML = html;

    // Replace <br> tags with newlines before getting text content
    const brElements = tempDiv.getElementsByTagName('br');
    for (let i = brElements.length - 1; i >= 0; i--) {
      brElements[i].parentNode?.replaceChild(document.createTextNode('\n'), brElements[i]);
    }

    // Replace <p> tags with double newlines (for paragraph breaks)
    const pElements = tempDiv.getElementsByTagName('p');
    for (let i = 0; i < pElements.length; i++) {
      const p = pElements[i];
      if (p.nextSibling) {
        p.appendChild(document.createTextNode('\n\n'));
      }
    }

    // Get the text content (this strips all HTML tags)
    let plainText = tempDiv.textContent || tempDiv.innerText || '';

    // Clean up extra whitespace
    plainText = plainText.replace(/\s+/g, ' ').trim();

    // Replace common HTML entities
    plainText = plainText.replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    return plainText;
  }


  insertVariable(variable: string): void {
    const current = this.invitationForm.get('emailContent')?.value || '';
    this.invitationForm.get('emailContent')?.setValue(current + ' ' + variable);
  }

  preview(): void {
    const rawContent = this.invitationForm.get('emailContent')?.value || '';
    const plainTextContent = this.stripHtml(rawContent);

    this.previewData = {
      subject: this.invitationForm.get('emailSubject')?.value,
      content: plainTextContent

      // content: this.invitationForm.get('emailContent')?.value
    };

    this.showPreview = true;
    console.log('Preview email:', this.previewData);
  }

  // saveTemplate(): void {
  //   alert('Template saved successfully!');
  //   console.log('Template saved:', {
  //     subject: this.invitationForm.get('emailSubject')?.value,
  //     content: this.invitationForm.get('emailContent')?.value
  //   });
  // }
  @ViewChild('alerts') alertsComponent!: AlertsComponent;

  saveTemplate(mail: any) {

    const message = `Are you sure you want to save all changes in ${this.template?.name}?`;
    this.alertsComponent.showConfirmDialog({
      message: message,
      header: 'Save Changes',
      // icon: 'pi pi-user-plus',
      acceptLabel: 'Save',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'warn',
      acceptSummary: 'Saved',
      rejectSummary: 'Cancelled',
      acceptDetail: `Email template saved successfully!`,
      rejectDetail: 'No changes were made.',
      onAccept: () => {
      },
      onReject: () => {
      }
    });
  }

}
