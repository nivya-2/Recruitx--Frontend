import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { EmailComponent } from "./email/email.component";
import { AccordionComponent } from "./accordion/accordion.component";
// import { EmailTemplate } from './email-templates.model';
import { EmailTemplate, EmailTemplateServiceService } from '../../email-template-service.service';


@Component({
  selector: 'app-admin-email',
  imports: [CommonLayoutComponent, CardsComponent, HeaderTextComponent, EmailComponent, AccordionComponent],
  templateUrl: './admin-email.component.html',
  styleUrl: './admin-email.component.scss'
})
export class AdminEmailComponent {

  constructor(private emailTemplateService: EmailTemplateServiceService) { }

  emailTemplates: Record<string, EmailTemplate[]> = {};
  availableVariables: string[] = [];

  selectedTemplate: EmailTemplate | null = null;

  onTemplateSelected(template: EmailTemplate): void {
    this.selectedTemplate = template;
    // this.availableVariables = template.variables || [];
    // console.log('Available Variables:', this.availableVariables);
  }

  ngOnInit(): void {
    this.emailTemplateService.getGroupedEmailTemplates().subscribe(grouped => {
      this.emailTemplates = grouped;
      // console.log('Email Templates:', this.emailTemplates);
    });

    // this.emailTemplateService.getAvailableVariables().subscribe(vars => {
    //   this.availableVariables = vars;
    //   // console.log('Available Variables:', this.availableVariables);
    // });
  }

}

