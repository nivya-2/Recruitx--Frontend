

import { Component,EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, NgModel, FormsModule, AbstractControl } from '@angular/forms';
import { CommonLayoutComponent } from "../../layouts/common-layout/common-layout.component";
import { CardsComponent } from '../../ui/cards/cards.component';
import { ReactiveFormsModule ,FormArray} from '@angular/forms';
import { ButtonComponent } from "../../ui/button/button.component";
import { HeaderTextComponent } from "../../ui/header-text/header-text.component";
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { Router,ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { IconComponent } from '../../ui/icon/icon.component';
import { CommonModule, NgFor } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { EvaluationService,SubmittedEvaluation } from '../../core/services/api/evaluation.service';



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
  imports: [CommonLayoutComponent,CommonModule,CardsComponent, FormsModule,IconComponent, ReactiveFormsModule, ButtonComponent,Button, HeaderTextComponent, AlertsComponent],
  templateUrl: './evaluation-form.component.html',
  styleUrl: './evaluation-form.component.scss'
})
export class EvaluationFormComponent implements OnInit {
  items:any = [];
   // --- Component State ---
  viewState: 'loading' | 'ready' | 'error' = 'loading';
  errorMessage: string = '';
  
  currentUrl:any;
  fb: any;
  constructor(private router: Router,    private route: ActivatedRoute,
private evaluationService: EvaluationService,fb: FormBuilder) {
    this.currentUrl = this.router.url;
        this.evaluationForm = this.fb.group({}); 

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

// skills: SkillBlock[] = [
//   {
//     category: 'Primary Skill/s - Java, AWSss',
//     competencies: [
//       {
//         title: 'Excellent programming skills in Java Spring Boot',
//         selfRating: 4,
//         knowledgeRating: 4,
//         skillsRating: 4,
//         implementationRating: 4,
//         averageRating: 4
//       },
//       {
//         title: 'Experience in developing Restful & GraphQL APIs',
//         selfRating: 3,
//         knowledgeRating: 3,
//         skillsRating: 3,
//         implementationRating: 3,
//         averageRating: 3
//       },
//       {
//         title: 'Additional skillsets & its Competencies',
//         selfRating: 5,
//         knowledgeRating: 4,
//         skillsRating: 3,
//         implementationRating: 3,
//         averageRating: 4
//       }
//     ],
//     comments: 'Good understanding of core concepts, needs improvement in advanced topics'
//   },
//   {
//     category: 'Secondary Skill/s: Python',
//     competencies: [
//       {
//         title: 'Excellent programming skills in Python',
//         selfRating: 4,
//         knowledgeRating: 4,
//         skillsRating: 4,
//         implementationRating: 4,
//         averageRating: 4
//       },
//       {
//         title: 'Experience with building or maintaining cloud-native applications',
//         selfRating: 3,
//         knowledgeRating: 3,
//         skillsRating: 3,
//         implementationRating: 3,
//         averageRating: 3
//       },
//       {
//         title: 'Additional skillsets & Competencies',
//         selfRating: 2,
//         knowledgeRating: 4,
//         skillsRating: 4,
//         implementationRating: 4,
//         averageRating: 3
//       }
//     ],
//     comments: 'Shows good potential but limited hands-on with cloud-native tools'
//   }
// ];

//  capabilities: QuestionCapability[] = [
//   {
//     question: "Accountability",
//     context: "Managed a critical release with tight deadlines",
//     action: "Prioritized tasks, coordinated with cross-functional teams",
//     result: "Delivered on time with zero critical defects",
//     rating: 3
//   },
//   {
//     question: "Problem Solving",
//     context: "Faced performance issues in microservices",
//     action: "Analyzed logs, optimized database queries",
//     result: "Improved response time by 40%",
//     rating: 5
//   },
//   {
//     question: "Stakeholder Management",
//     context: "Client demanded last-minute feature changes",
//     action: "Negotiated timeline adjustments, aligned internal teams",
//     result: "Delivered updated feature with client satisfaction",
//     rating: 4
//   },
//   {
//     question: "Candidate will be benifit for the organisation",
//     context: "Client demanded last-minute feature changes",
//     action: "Negotiated timeline adjustments, aligned internal teams",
//     result: "Delivered updated feature with client satisfaction",
//     rating: 4
//   },
  
// ];
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
    // 1. Get the interview ID from the route's URL parameters.
    const interviewIdParam = this.route.snapshot.paramMap.get('interviewId');
    
    // 2. Add a "guard clause" to safely handle cases where the ID is missing.
    if (!interviewIdParam) {
      this.viewState = 'error';
      this.errorMessage = 'Interview ID was not provided in the URL.';
      return; // Stop execution if no ID is found.
    }

    // 3. Convert the ID from a string to a number.
    const interviewId = +interviewIdParam;

    // 4. Call the service to fetch the submitted data.
    this.evaluationService.getSubmittedEvaluation(interviewId).subscribe({
      next: (data: SubmittedEvaluation) => {
        try {
          // Parse the JSON string from the backend into a full JavaScript object.
          const feedbackData = JSON.parse(data.feedbackJson);
          
          // Build the form structure and populate it with the parsed data.
          this.buildAndPatchForm(feedbackData);
          
          this.viewState = 'ready'; // Set state to 'ready' to show the form in the HTML.
        } catch (e) {
          console.error("Error parsing feedback JSON:", e);
          this.viewState = 'error';
          this.errorMessage = 'The saved evaluation data could not be displayed.';
        }
      },
      error: (err) => {
        this.viewState = 'error';
        this.errorMessage = err.error?.message || 'An error occurred while loading the evaluation.';
        console.error('Failed to load evaluation data:', err);
      }
    });
  }
    /**
   * A helper method to correctly cast a control to a FormArray
   * so we can loop over its controls in the HTML template without type errors.
   * @param formGroup The parent FormGroup (e.g., a single skill block).
   * @param formArrayName The name of the FormArray within that group (e.g., 'competencies').
   * @returns The controls of the FormArray.
   */
  getFormArrayControls(formGroup: AbstractControl, formArrayName: string): AbstractControl[] {
    const formArray = formGroup.get(formArrayName) as FormArray;
    // Return the controls if the array exists, otherwise return an empty array to prevent errors.
    return formArray ? formArray.controls : [];
  }
    buildAndPatchForm(data: any): void {
    this.evaluationForm = this.fb.group({
      summary: this.fb.group({
        candidateName: [''], technology: [''], interviewLevel: [''],
        noticePeriod: [''], totalExperience: [''], relevantExperience: [''],
        currentLocation: [''], preferredLocation: ['']
      }),
      skills: this.fb.array(
        (data.skills || []).map((skillBlock: any) => this.createSkillBlockGroup(skillBlock))
      ),
      capabilities: this.fb.array(
        (data.capabilities || []).map((cap: any) => this.createCapabilityGroup(cap))
      ),
      feedback: this.fb.group({
        strengths: [''], learnability: [''], improvementAreas: [''],
        hasCapabilities: [''], justificationIfYes: [''], feedbackIfNo: [''],
        additionalObservations: [''], interviewNotes: ['']
      }),
      finalSubmission: this.fb.group({
        hiringDecision: [''], proposedRole: [''], interviewerName: [''],
        interviewerEmpId: [''], interviewDate: [''], interviewMode: [''],
        submittedByEmail: ['']
      })
    });

    // Use patchValue to fill the form with the fetched data.
    this.evaluationForm.patchValue(data);

    // Disable the entire form to make it a read-only view.
    this.evaluationForm.disable();
  }

   createSkillBlockGroup(skillBlock: any): FormGroup {
    return this.fb.group({
      category: [skillBlock.category],
      competencies: this.fb.array(
        (skillBlock.competencies || []).map((comp: any) => this.fb.group(comp))
      ),
      comments: [skillBlock.comments]
    });
  }

  createCapabilityGroup(capability: any): FormGroup {
    return this.fb.group(capability);
  }

  // Type-safe accessors for the template
  get skills(): FormArray {
    return this.evaluationForm.get('skills') as FormArray;
  }
  
  get capabilities(): FormArray {
    return this.evaluationForm.get('capabilities') as FormArray;
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