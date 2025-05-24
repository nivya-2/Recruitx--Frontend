import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'; // For ngModel
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { EMAIL_TEMPLATES, EmailTemplate } from '../email-templates.model';

@Component({
  selector: 'app-accordion',
  imports: [CommonModule,ButtonModule,PanelMenuModule,DialogModule,InputTextModule,DropdownModule,FormsModule,AccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent implements OnInit {

  categories: string[] = [];
  templates: Record<string, EmailTemplate[]> = {};
  selectedTemplate: EmailTemplate | null = null;
  
  @Output() templateSelected = new EventEmitter<EmailTemplate>();

  // Lifecycle hooks
  ngOnInit() {
    // Initialize templates from constant
    this.templates = { ...EMAIL_TEMPLATES };
    this.categories = Object.keys(this.templates);
  }
  
  // Methods
  getTemplatesForCategory(category: string): EmailTemplate[] {
    return this.templates[category] || [];
  }
  
  selectTemplate(template: EmailTemplate) {
    // Clone the template to avoid direct reference modification
    this.selectedTemplate = { ...template };
    this.templateSelected.emit(this.selectedTemplate);

  }
  

}
