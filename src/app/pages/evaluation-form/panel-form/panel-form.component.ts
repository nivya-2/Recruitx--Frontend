// // src/app/components/evaluation-form/evaluation-form.component.ts

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ButtonComponent } from '../../../ui/button/button.component';
// import { HeaderComponent } from '../../../layouts/header/header.component';
// import { CardsComponent } from '../../../ui/cards/cards.component';
// import { CommonLayoutComponent } from '../../../layouts/common-layout/common-layout.component';
// import { EvaluationService, EvaluationFormDetails, EvaluationSubmission } from '../../../core/services/api/evaluation.service';
// import { HeaderTextComponent } from "../../../ui/header-text/header-text.component";

// @Component({
//   selector: 'app-panel-form',
//   imports: [ButtonComponent, HeaderComponent, CardsComponent, CommonLayoutComponent, HeaderTextComponent],
//   templateUrl: './panel-form.component.html',
//   styleUrl: './panel-form.component.scss'
// })
// export class PanelFormComponent implements OnInit {
  
//   // --- Component State ---
//   formState: 'loading' | 'ready' | 'invalid' | 'submitted' = 'loading';
//   statusMessage: string = 'Validating your evaluation link...';
  
//   // --- Form Data ---
//   formDetails: EvaluationFormDetails | null = null;
//   evaluationForm!: FormGroup; // The '!' indicates it will be initialized in the constructor
//   private token: string | null = null;

//   // Static data for initial form structure
//   private initialSkillsData = [ /* ... your static skills array ... */ ];
//   private initialCapabilitiesData = [ /* ... your static capabilities array ... */ ];
  
//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     private evaluationService: EvaluationService
//   ) {}

//   ngOnInit(): void {
//     this.token = this.route.snapshot.queryParamMap.get('token');

//     if (!this.token) {
//       this.formState = 'invalid';
//       this.statusMessage = 'Evaluation link is missing or invalid.';
//       return;
//     }

//     this.evaluationService.getFormDetails(this.token).subscribe({
//       next: (details) => {
//         this.formDetails = details;
//         // Build the form AFTER we get the details
//         this.buildForm(); 
//         this.formState = 'ready';
//       },
//       error: (err) => {
//         this.formState = 'invalid';
//         this.statusMessage = err.error?.message || 'This evaluation link is no longer valid.';
//       }
//     });
//   }

//   // --- Form Building and Handling ---

//   buildForm(): void {
//     this.evaluationForm = this.fb.group({
//       // The 'summary' group matches the candidate info section
//       summary: this.fb.group({
//         candidateName: [{ value: this.formDetails?.candidateName, disabled: true }],
//         technology: [{ value: 'Java, AWS', disabled: true }], // You can pass this from backend too
//         interviewLevel: [{ value: this.formDetails?.interviewLevel, disabled: true }],
//         // ... other summary fields
//       }),
      
//       // 'skills' is a FormArray to handle multiple skill blocks
//       skills: this.fb.array(this.initialSkillsData.map(skillBlock => this.createSkillBlockGroup(skillBlock))),

//       // 'capabilities' is also a FormArray
//       capabilities: this.fb.array(this.initialCapabilitiesData.map(cap => this.createCapabilityGroup(cap))),
      
//       // 'feedback' group for the overall assessment
//       feedback: this.fb.group({
//         strengths: ['', Validators.required],
//         learnability: ['', Validators.required],
//         improvementAreas: ['', Validators.required],
//         // ... other feedback fields
//       }),

//       // New fields for the submission itself
//       submittedByEmail: ['', [Validators.required, Validators.email]],
//       hiringDecision: ['On Hold', Validators.required] // Default value
//     });
//   }

//   // Helper to create a FormGroup for a single skill block
//   createSkillBlockGroup(skillBlock: any): FormGroup {
//     return this.fb.group({
//       category: [skillBlock.category],
//       competencies: this.fb.array(skillBlock.competencies.map((comp: any) => this.createCompetencyGroup(comp))),
//       comments: ['']
//     });
//   }

//   // Helper to create a FormGroup for a single competency
//   createCompetencyGroup(competency: any): FormGroup {
//     return this.fb.group({
//       title: [competency.title],
//       selfRating: [competency.selfRating],
//       knowledgeRating: [0, [Validators.min(1), Validators.max(5)]],
//       skillsRating: [0, [Validators.min(1), Validators.max(5)]],
//       implementationRating: [0, [Validators.min(1), Validators.max(5)]],
//       averageRating: [{value: 0, disabled: true}]
//     });
//   }

//   // Helper to create a FormGroup for a single capability
//   createCapabilityGroup(capability: any): FormGroup {
//     return this.fb.group({
//       question: [capability.question],
//       context: ['', Validators.required],
//       action: ['', Validators.required],
//       result: ['', Validators.required],
//       rating: [0, [Validators.min(1), Validators.max(5)]]
//     });
//   }

//   // Type-safe accessors for the template
//   get skills(): FormArray {
//     return this.evaluationForm.get('skills') as FormArray;
//   }
  
//   get capabilities(): FormArray {
//     return this.evaluationForm.get('capabilities') as FormArray;
//   }

//   onSubmit(): void {
//     if (this.evaluationForm.invalid || !this.token) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     this.formState = 'loading';
//     this.statusMessage = 'Submitting your feedback...';

//     const submission: EvaluationSubmission = {
//       token: this.token,
//       submittedByEmail: this.evaluationForm.value.submittedByEmail,
//       // Serialize the entire form's value into a JSON string
//       feedbackJson: JSON.stringify(this.evaluationForm.value)
//     };
    
//     this.evaluationService.submitEvaluation(submission).subscribe({
//       next: (response) => {
//         this.formState = 'submitted';
//         this.statusMessage = response.message;
//       },
//       error: (err) => {
//         this.formState = 'invalid';
//         this.statusMessage = err.error?.message || 'There was a problem submitting your feedback.';
//       }
//     });
//   }
// }


// File Path: src/app/components/evaluation-form/evaluation-form.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,AbstractControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
// Import necessary standalone components for the template
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../ui/button/button.component';
import { CardsComponent } from '../../../ui/cards/cards.component';
import { CommonLayoutComponent } from '../../../layouts/common-layout/common-layout.component';
import { HeaderTextComponent } from '../../../ui/header-text/header-text.component';
import { EvaluationService, EvaluationFormDetails, EvaluationSubmission } from '../../../core/services/api/evaluation.service';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonLayoutComponent,
    CardsComponent,
    HeaderTextComponent,
    ButtonComponent
  ],
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.scss']
})
export class PanelFormComponent implements OnInit {
  
  // --- Component State ---
  formState: 'loading' | 'ready' | 'invalid' | 'submitted' = 'loading';
  statusMessage: string = 'Validating your evaluation link...';
  
  // --- Form Data ---
  formDetails: EvaluationFormDetails | null = null;
  evaluationForm!: FormGroup;
  private token: string | null = null;

  // We use this static data as the template to build the form structure.
  private initialSkillsData: any[] = [
    {
      category: 'Primary Skill/s - Java, AWS',
      competencies: [
        { title: 'Excellent programming skills in Java Spring Boot', selfRating: 4 },
        { title: 'Experience in developing Restful & GraphQL APIs', selfRating: 3 },
        { title: 'Additional skillsets & its Competencies', selfRating: 5 }
      ],
      comments: 'Good understanding of core concepts, needs improvement in advanced topics'
    },
    {
      category: 'Secondary Skill/s: Python',
      competencies: [
        { title: 'Excellent programming skills in Python', selfRating: 4 },
        { title: 'Experience with building or maintaining cloud-native applications', selfRating: 3 },
        { title: 'Additional skillsets & Competencies', selfRating: 2 }
      ],
      comments: 'Shows good potential but limited hands-on with cloud-native tools'
    }
  ];

  private initialCapabilitiesData: any[] = [
    { question: "Accountability" },
    { question: "Problem Solving" },
    { question: "Stakeholder Management" },
    { question: "Comments (Behavior, Attitude and Leadership capability)" }
  ];
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.formState = 'invalid';
      this.statusMessage = 'Evaluation link is missing or invalid.';
      return;
    }

    this.evaluationService.getFormDetails(this.token).subscribe({
      next: (details) => {
        this.formDetails = details;
        this.buildForm(); // Build the form after getting context from the API
        this.formState = 'ready';
      },
      error: (err) => {
        this.formState = 'invalid';
        this.statusMessage = err.error?.message || 'This evaluation link is no longer valid or has expired.';
      }
    });
  }

  buildForm(): void {
    this.evaluationForm = this.fb.group({
      summary: this.fb.group({
        candidateName: [{ value: this.formDetails?.candidateName || '', disabled: true }],
        technology: [{ value: 'Java, AWS', disabled: true }],
        interviewLevel: [{ value: this.formDetails?.interviewLevel || '', disabled: true }],
        noticePeriod: [{ value: '30 days', disabled: true }],
        totalExperience: [{ value: '6 years', disabled: true }],
        relevantExperience: [{ value: '4 years', disabled: true }],
        currentLocation: [{ value: 'Bangalore', disabled: true }],
        preferredLocation: [{ value: 'Kochi', disabled: true }]
      }),
      
      skills: this.fb.array(this.initialSkillsData.map(skillBlock => this.createSkillBlockGroup(skillBlock))),
      capabilities: this.fb.array(this.initialCapabilitiesData.map(cap => this.createCapabilityGroup(cap))),
      
      feedback: this.fb.group({
        strengths: ['', Validators.required],
        learnability: ['', Validators.required],
        improvementAreas: ['', Validators.required],
        hasCapabilities: ['', Validators.required],
        justificationIfYes: [''],
        feedbackIfNo: [''],
        additionalObservations: [''],
        interviewNotes: ['']
      }),

      finalSubmission: this.fb.group({
        hiringDecision: ['On Hold', Validators.required],
        proposedRole: [''],
        interviewerName: ['', Validators.required],
        interviewerEmpId: [''],
        interviewDate: [new Date().toISOString().split('T')[0], Validators.required],
        interviewMode: ['Teams', Validators.required],
        submittedByEmail: ['', [Validators.required, Validators.email]]
      })
    });
  }
/**
   * A helper method to correctly cast a Form Group's control to a FormArray
   * so we can loop over its controls in the HTML template.
   * @param formGroup The parent FormGroup (e.g., a single skill block).
   * @param formArrayName The name of the FormArray within that group (e.g., 'competencies').
   * @returns The controls of the FormArray.
   */
  getFormArrayControls(formGroup: AbstractControl, formArrayName: string): AbstractControl[] {
    const formArray = formGroup.get(formArrayName) as FormArray;
    return formArray.controls;
  }
  createSkillBlockGroup(skillBlock: any): FormGroup {
    return this.fb.group({
      category: [{ value: skillBlock.category, disabled: true }],
      competencies: this.fb.array(skillBlock.competencies.map((comp: any) => this.createCompetencyGroup(comp))),
      comments: ['', Validators.required]
    });
  }

  createCompetencyGroup(competency: any): FormGroup {
    return this.fb.group({
      title: [{ value: competency.title, disabled: true }],
      selfRating: [{ value: competency.selfRating, disabled: true }],
      knowledgeRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      skillsRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      implementationRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      averageRating: [{ value: 0, disabled: true }] // This could be calculated dynamically
    });
  }

  createCapabilityGroup(capability: any): FormGroup {
    // Handle the last item which is just a large comment box
    if (capability.question.startsWith('Comments')) {
      return this.fb.group({
        question: [{ value: capability.question, disabled: true }],
        fullComment: ['', Validators.required] // Use a different form control name
      });
    }
    return this.fb.group({
      question: [{ value: capability.question, disabled: true }],
      context: ['', Validators.required],
      action: ['', Validators.required],
      result: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  // Type-safe accessors to make the HTML template cleaner
  get skills(): FormArray {
    return this.evaluationForm.get('skills') as FormArray;
  }
  
  get capabilities(): FormArray {
    return this.evaluationForm.get('capabilities') as FormArray;
  }

  onSubmit(): void {
    if (this.evaluationForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.evaluationForm.markAllAsTouched();
      alert("Please fill out all required fields before submitting.");
      return;
    }

    if (!this.token) {
      this.statusMessage = "Cannot submit form due to an invalid link token.";
      return;
    }

    this.formState = 'loading';
    this.statusMessage = 'Submitting your feedback...';

    const submission: EvaluationSubmission = {
      token: this.token,
      // Get the email from the 'finalSubmission' form group
      submittedByEmail: this.evaluationForm.get('finalSubmission.submittedByEmail')?.value,
      // Serialize the entire form's value (including disabled fields) into a JSON string
      feedbackJson: JSON.stringify(this.evaluationForm.getRawValue())
    };
    
    this.evaluationService.submitEvaluation(submission).subscribe({
      next: (response: { message: string; }) => {
        this.formState = 'submitted';
        this.statusMessage = response.message;
      },
      error: (err: { error: { message: string; }; }) => {
        this.formState = 'invalid';
        this.statusMessage = err.error?.message || 'There was a problem submitting your feedback. Please try again.';
      }
    });
  }
}