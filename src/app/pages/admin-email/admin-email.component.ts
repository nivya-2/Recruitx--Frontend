import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { EmailComponent } from "./email/email.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { EmailTemplate } from './email-templates.model';


@Component({
  selector: 'app-admin-email',
  imports: [CommonLayoutComponent, CardsComponent, HeaderTextComponent, EmailComponent, AccordionComponent],
  templateUrl: './admin-email.component.html',
  styleUrl: './admin-email.component.scss'
})
export class AdminEmailComponent {
  
  selectedTemplate: EmailTemplate | null = null;
  
  onTemplateSelected(template: EmailTemplate): void {
    this.selectedTemplate = template;
  }


}

