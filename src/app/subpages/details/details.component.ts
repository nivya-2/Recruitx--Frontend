import { Component } from '@angular/core';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { InputTextComponent } from "../../ui/input-text/input-text.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { TextAreaComponent } from "../../ui/text-area/text-area.component";

@Component({
  selector: 'app-details',
  imports: [HeaderTextComponent, CardsComponent, InputTextComponent, ButtonComponent, TextAreaComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  label: string = 'Edit';

  isEditMode: boolean = false;

  jobData = {
    mandatorySkills: 'Python, RESTful APIs, PostgreSQL, Git',
    primarySkills: 'Django or Flask, Unit Testing, Docker',
    goodToHaveSkills: 'AWS, CI/CD, Redis, Kubernetes',
    location: 'Kochi (Hybrid: 3 days on-site, 2 days WFH)',
    qualification: 'B.Sc. computer science, Engineering, or related field',
    experience: '5 years',
    relevantExperience: '3+ years in backend Python development',
    onboardingDate: '15th May 2025',
    jobPurpose1: 'To design and implement secure, scalable, and high-performance RESTful APIs for enterprise-grade applications.',
    jobPurpose2: 'To collaborate with cross-functional teams, including frontend developers, DevOps, and QA, to deliver robust backend features.',
    jobPurpose3: 'To continuously improve system reliability, automate deployments, and contribute to architectural decisions and best practices.'
  };

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    return this.isEditMode;
  }

  getButtonLabel() {
    this.isEditMode = !this.isEditMode;
    // this.isEditMode = editMode;
    this.label = this.isEditMode ? 'Save' : 'Edit';
  }


}
