

import { Component,EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, NgModel, FormsModule } from '@angular/forms';
import { CommonLayoutComponent } from "../../layouts/common-layout/common-layout.component";
import { CardsComponent } from '../../ui/cards/cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../ui/button/button.component";
import { HeaderTextComponent } from "../../ui/header-text/header-text.component";
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { IconComponent } from '../../ui/icon/icon.component';
import { CommonModule, NgFor } from '@angular/common';
import { MenuItem } from 'primeng/api';

interface Competency {
  title: string;
  selfRating: number;
  knowledgeRating: number;
  skillsRating: number;
  implementationRating: number;
  averageRating: number;
}

interface SkillBlock {
  category: string; 
  competencies: Competency[];
  additionalSkillsetsRating?: number;
  comments?: string;
}
interface QuestionCapability  {
  question: string;
  context: string;
  action: string;
  result: string;
  rating: number;
};
interface CandidateFeedback  {
  strengths: string;
  learnability: string;
  improvementAreas: string;
  hasCapabilities: string;
  justificationIfYes: string;
  feedbackIfNo: string;
  additionalObservations: string;
  interviewNotes: string;
};
interface CandidateSummary  {
  candidateName: string;
  technology: string;
  interviewLevel: string;
  noticePeriod: string;
  totalExperience: string;
  relevantExperience: string;
  currentLocation: string;
  preferredLocation: string;
};
interface InterviewDetails {
  proposedRole: string;
  interviewerName: string;
  interviewerEmpId: string;
  interviewDate: string;    
  interviewMode: string;
}
@Component({
  selector: 'app-evaluation-form',
  imports: [CommonLayoutComponent,CommonModule, CardsComponent, FormsModule,IconComponent, ReactiveFormsModule, ButtonComponent,Button, HeaderTextComponent, AlertsComponent],
  templateUrl: './evaluation-form.component.html',
  styleUrl: './evaluation-form.component.scss'
})
export class EvaluationFormComponent implements OnInit {
  items:any = [];
  currentUrl:any;
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }
  @ViewChild('content') contentRef!: ElementRef;
  @ViewChild('alerts') alertsComponent!: AlertsComponent;
  evaluationForm!: FormGroup;
 
  scrollDown() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
 
 summary: CandidateSummary = {
  candidateName: "John Doe",
  technology: "Java, AWS",
  interviewLevel: "Level 1",
  noticePeriod: "30 days",
  totalExperience: "6 years",
  relevantExperience: "4 years",
  currentLocation: "Bangalore",
  preferredLocation: "Kochi"
};

skills: SkillBlock[] = [
  {
    category: 'Primary Skill/s - Java, AWSss',
    competencies: [
      {
        title: 'Excellent programming skills in Java Spring Boot',
        selfRating: 4,
        knowledgeRating: 4,
        skillsRating: 4,
        implementationRating: 4,
        averageRating: 4
      },
      {
        title: 'Experience in developing Restful & GraphQL APIs',
        selfRating: 3,
        knowledgeRating: 3,
        skillsRating: 3,
        implementationRating: 3,
        averageRating: 3
      },
      {
        title: 'Additional skillsets & its Competencies',
        selfRating: 5,
        knowledgeRating: 4,
        skillsRating: 3,
        implementationRating: 3,
        averageRating: 4
      }
    ],
    comments: 'Good understanding of core concepts, needs improvement in advanced topics'
  },
  {
    category: 'Secondary Skill/s: Python',
    competencies: [
      {
        title: 'Excellent programming skills in Python',
        selfRating: 4,
        knowledgeRating: 4,
        skillsRating: 4,
        implementationRating: 4,
        averageRating: 4
      },
      {
        title: 'Experience with building or maintaining cloud-native applications',
        selfRating: 3,
        knowledgeRating: 3,
        skillsRating: 3,
        implementationRating: 3,
        averageRating: 3
      },
      {
        title: 'Additional skillsets & Competencies',
        selfRating: 2,
        knowledgeRating: 4,
        skillsRating: 4,
        implementationRating: 4,
        averageRating: 3
      }
    ],
    comments: 'Shows good potential but limited hands-on with cloud-native tools'
  }
];

 capabilities: QuestionCapability[] = [
  {
    question: "Accountability",
    context: "Managed a critical release with tight deadlines",
    action: "Prioritized tasks, coordinated with cross-functional teams",
    result: "Delivered on time with zero critical defects",
    rating: 3
  },
  {
    question: "Problem Solving",
    context: "Faced performance issues in microservices",
    action: "Analyzed logs, optimized database queries",
    result: "Improved response time by 40%",
    rating: 5
  },
  {
    question: "Stakeholder Management",
    context: "Client demanded last-minute feature changes",
    action: "Negotiated timeline adjustments, aligned internal teams",
    result: "Delivered updated feature with client satisfaction",
    rating: 4
  },
  {
    question: "Candidate will be benifit for the organisation",
    context: "Client demanded last-minute feature changes",
    action: "Negotiated timeline adjustments, aligned internal teams",
    result: "Delivered updated feature with client satisfaction",
    rating: 4
  },
  
];
 feedback: CandidateFeedback = {
  strengths: "Strong technical foundation, quick learner, good communicator",
  learnability: "Demonstrates high adaptability to new tools and frameworks",
  improvementAreas: "Needs deeper exposure to DevOps practices",
  hasCapabilities: "Has the core skills and mindset needed for success",
  justificationIfYes: "Meets the technical and behavioral requirements confidently",
  feedbackIfNo: "",
  additionalObservations: "Shows promise for taking on mentorship roles",
  interviewNotes: "Candidates is good for the organisation"
};
 interviewInfo: InterviewDetails = {
  proposedRole: "Senior Software Developer",
  interviewerName: 'Thomas Phill',
  interviewerEmpId: 'EXP6547',
  interviewDate: '30-05-2025',
  interviewMode: 'Teams',
};

hiringDecision = {
  select: true,
  onHold: false,
  otherPositions: false,
  reject: false
};
decisionLabel: string = '';
setDecisionLabel() {
  console.log(this.interviewInfo.proposedRole)
if (this.hiringDecision.select) {
  this.decisionLabel = 'Select';
} else if (this.hiringDecision.onHold) {
  this.decisionLabel = 'On Hold';
} else if (this.hiringDecision.otherPositions) {
  this.decisionLabel = 'Other Positions';
} else if (this.hiringDecision.reject) {
  this.decisionLabel = 'Reject';
} else {
  this.decisionLabel = 'No Decision';
}
}

  ngOnInit(): void {
    console.log(123)
    this.currentUrl = this.router.url;
    this.setDecisionLabel();
    if (this.currentUrl.startsWith('/recruiter-lead')) {
      this.items=[{ label: 'Interview', routerLink: '/recruiter-lead/interviews' }, {label: 'Shortlist', routerLink: '/recruiter-lead/interviews/shortlist'}, {label: 'Evaluation Form', routerLink: '/recruiter-lead/interviews/shortlist/eval-form'}]
      this.router.navigate(['/recruiter-lead/interviews/shortlist/eval-form']);
    } else if (this.currentUrl.startsWith('/recruiter')) {
      this.items=[{ label: 'Interviews', routerLink: '/recruiter/interviews' }, {label: 'Shortlist', routerLink: '/recruiter/interviews/shortlist'}, {label: 'Evaluation Form', routerLink: '/recruiter/interviews/shortlist/eval-form'}]

    }
  }
 
  onSubmit(){
    console.log(this.interviewInfo.interviewerName)
  const currentLevelValue = this.summary.interviewLevel;  
  let nextLevelNumber = 10;  
  if (currentLevelValue) {
    const parts = currentLevelValue.split(' ');  
    const levelNumber = parseInt(parts[1], 10);  
    if (!isNaN(levelNumber)) {
      nextLevelNumber = levelNumber + 1;  
    }
  }
  const message = `Are you sure you want to add a level ${nextLevelNumber} technical round for ${this.summary.candidateName}?`; 
     this.alertsComponent.showConfirmDialog({
      message: message,
      header: 'Add a Technical Round',
      icon: '',
      acceptLabel: 'Add round',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'warn',
      acceptSummary: 'Added',
      rejectSummary: 'Cancelled',
      acceptDetail: `Technical round added !`,
      rejectDetail: 'No changes were made.',
      onAccept: () => {
        if (this.currentUrl.startsWith('/recruiter-lead')) {
          this.router.navigate(['/recruiter-lead/interviews/shortlist']);
        } else if (this.currentUrl.startsWith('/recruiter')) {
        this.router.navigate(['/recruiter/interviews/shortlist']);
      }
      ;
      },
      onReject: () => {
      }
    });
  };

  selectApplicant(){
    const message = `Do you confirm the selection of  ${this.summary.candidateName} as the technical select?`;
    this.alertsComponent.showConfirmDialog({
      message: message,
      header: 'Select to Management Round',
      icon: '',
      acceptLabel: 'Select',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'warn',
      acceptSummary: 'Selected',
      rejectSummary: 'Cancelled',
      acceptDetail: `Applicant moved to Management Round!`,
      rejectDetail: 'No changes were made.',
      onAccept: () => {
        if (this.currentUrl.startsWith('/recruiter-lead')) {
          this.router.navigate(['/recruiter-lead/interviews/shortlist']);
        } else if (this.currentUrl.startsWith('/recruiter')) {
        this.router.navigate(['/recruiter/interviews/shortlist']);
      };
      },
      onReject: () => {
      }
    });
  };
    
  rejectApplicant(){
    const message = `Are you sure you want to reject ${this.summary.candidateName}?`;
    this.alertsComponent.showConfirmDialog({
      message: message,
      header: 'Reject Applicant',
      icon: '',
      acceptLabel: 'Reject',
      rejectLabel: 'Cancel',
      acceptSeverity: 'success',
      rejectSeverity: 'warn',
      acceptSummary: 'Rejected',
      rejectSummary: 'Cancelled',
      acceptDetail: `Applicant Rejected!`,
      rejectDetail: 'No changes were made.',
      onAccept: () => {
        if (this.currentUrl.startsWith('/recruiter-lead')) {
          this.router.navigate(['/recruiter-lead/interviews/shortlist'], { state: { showToast: true } });
        } else if (this.currentUrl.startsWith('/recruiter')) {
        this.router.navigate(['/recruiter/interviews/shortlist']);
      };
      },
      onReject: () => { 
      }
    });
  };     
}