import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';

// Import necessary standalone components for the template
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
export class PanelFormComponent implements OnInit, OnDestroy {
  
  // --- Component State ---
  formState: 'loading' | 'ready' | 'invalid' | 'submitted' = 'loading';
  statusMessage: string = 'Validating your evaluation link...';
  
  // --- Form Data ---
  formDetails: EvaluationFormDetails | null = null;
  evaluationForm!: FormGroup;
  private token: string | null = null;
  private formSubscriptions: Subscription = new Subscription();

  // This data is now only used to define the STRUCTURE of the capabilities section.
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

 // In panel-form.component.ts

ngOnInit(): void {
  this.token = this.route.snapshot.queryParamMap.get('token');

  if (!this.token) {
    this.formState = 'invalid';
    this.statusMessage = 'Evaluation link is missing or invalid.';
    return;
  }
  
  this.evaluationService.getFormDetails(this.token).subscribe({
    next: (response) => {
      const details = response.data; // Assuming the response structure is ApiResponse<EvaluationFormDetails>

      this.formDetails = details;
      
      // STEP 1: Build the empty form skeleton. It has no data yet.
      this.buildForm(); 
      
      // STEP 2: Dynamically create the rows for the 'skills' FormArray.
      // The form now has the correct structure.
      this.populateSkillsArray(details.skills);
      
      // STEP 3: Populate the entire form (summary, feedback, and the newly
      // created skills/competencies) with data using patchValue.
      // this.populateFormWithData(details);
      this.evaluationForm.get('summary')?.patchValue(details.summary);

       this.evaluationForm.get('finalSubmission')?.patchValue({
        proposedRole: details.proposedRole
      });

      // STEP 4: Set up the dynamic calculations. This is now safe because we
      // know the form structure is complete and stable.
      this.setupAverageRatingCalculations();
      
      this.formState = 'ready';
    },
    error: (err) => {

      if (err.status === 410 || err.status === 404) {
        // Use the detailed message from the backend if it exists, otherwise use a smart default.
        this.statusMessage = 'This evaluation link is invalid or has already been submitted.';
      } else {
        // For all other errors (like 500 server error, or network issues), show a generic message.
        this.statusMessage = 'An unexpected error occurred. Please try again later.';
      }
      // ... same error handling
    }
  });
}

  ngOnDestroy(): void {
    this.formSubscriptions.unsubscribe();
  }

  buildForm(): void {
  this.evaluationForm = this.fb.group({
    summary: this.fb.group({
      candidateName: [{ value: '', disabled: true }],
technology: [{ value: '', disabled: true }],
interviewLevel: [{ value: '', disabled: true }],
noticePeriod: [{ value: '', disabled: true }],
totalExperience: [{ value: '', disabled: true }],
relevantExperience: [{ value: '', disabled: true }],
currentLocation: [{ value: '', disabled: true }],
preferredLocation: [{ value: '', disabled: true }]
    }),
    
    // --- THIS IS THE KEY CHANGE ---
    // Initialize 'skills' as a completely empty FormArray.
    skills: this.fb.array([]), 
    
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
        hiringDecision: ['', Validators.required],
        proposedRole: [''],
        interviewerName: ['', Validators.required],
        interviewerEmpId: [''],
        interviewDate: [new Date().toISOString().split('T')[0], Validators.required],
        interviewMode: ['Teams', Validators.required],
        submittedByEmail: ['', [Validators.required, Validators.email]]
      })
    });
  }

   setupConditionalValidators(): void {
    const feedbackGroup = this.evaluationForm.get('feedback');
    if (!feedbackGroup) return;

    const hasCapabilitiesCtrl = feedbackGroup.get('hasCapabilities');
    const justificationCtrl = feedbackGroup.get('justificationIfYes');
    const feedbackCtrl = feedbackGroup.get('feedbackIfNo');

    if (!hasCapabilitiesCtrl || !justificationCtrl || !feedbackCtrl) return;

    const sub = hasCapabilitiesCtrl.valueChanges.pipe(startWith(hasCapabilitiesCtrl.value)).subscribe(value => {
      if (value === 'Yes') {
        justificationCtrl.setValidators(Validators.required);
        feedbackCtrl.clearValidators();
      } else if (value === 'No') {
        justificationCtrl.clearValidators();
        feedbackCtrl.setValidators(Validators.required);
      } else {
        justificationCtrl.clearValidators();
        feedbackCtrl.clearValidators();
      }
      justificationCtrl.updateValueAndValidity();
      feedbackCtrl.updateValueAndValidity();
    });

    this.formSubscriptions.add(sub);
  }
/**
 * Dynamically builds the 'skills' FormArray based on data from the API.
 * @param skillsData The array of skill blocks from the EvaluationFormDetails.
 */
  populateSkillsArray(skillsData: any[]): void {
  // A safety check in case the API returns no skills
  if (!skillsData) return;

  // Get a direct reference to the 'skills' FormArray
  const skillsFormArray = this.evaluationForm.get('skills') as FormArray;
  

  // Loop through the data and push a new, fully-formed group for each item.
  // Your existing createSkillBlockGroup method is perfect for this.
  skillsData.forEach(skillBlock => {
    skillsFormArray.push(this.createSkillBlockGroup(skillBlock));
  });
}
  populateFormWithData(data: any): void {
    if (!data) return;
    // `patchValue` populates the form controls with matching names from the data object.
    this.evaluationForm.patchValue(data);
  }

  createSkillBlockGroup(skillBlock: any): FormGroup {
    // This now only creates the structure, without the complex calculation logic.
    return this.fb.group({
      category: [{ value: skillBlock.category, disabled: true }],
      competencies: this.fb.array(skillBlock.competencies.map((comp: any) => this.createCompetencyGroup(comp))),
      comments: ['', Validators.required]
    });
  }

  createCompetencyGroup(competency: any): FormGroup {
    // This method is now clean and only defines the controls for a single competency row.
    return this.fb.group({
      title: [{ value: competency.title, disabled: true }],
      selfRating: [{ value: competency.selfRating, disabled: true }],
      knowledgeRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      skillsRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      implementationRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      averageRating: [{ value: 0, disabled: true }]
    });
  }
  
  /**
   * New dedicated method to set up all dynamic form logic.
   * This is called AFTER the form is built and populated to ensure calculations run on load.
   */
  setupAverageRatingCalculations(): void {
    this.skills.controls.forEach(skillGroup => {
      const competenciesArray = skillGroup.get('competencies') as FormArray;
      
      competenciesArray.controls.forEach(competencyGroup => {
        const knowledgeControl = competencyGroup.get('knowledgeRating');
        const skillsControl = competencyGroup.get('skillsRating');
        const implementationControl = competencyGroup.get('implementationRating');
        const averageControl = competencyGroup.get('averageRating');

        if (!knowledgeControl || !skillsControl || !implementationControl || !averageControl) {
          return; // Safety check
        }

        const ratingChanges$ = merge(
          knowledgeControl.valueChanges,
          skillsControl.valueChanges,
          implementationControl.valueChanges
        ).pipe(startWith(null)); // `startWith` triggers the subscription immediately on setup.

        const sub = ratingChanges$.subscribe(() => {
          const knowledge = knowledgeControl.value;
          const skills = skillsControl.value;
          const implementation = implementationControl.value;

          const allRatingsValid = [knowledge, skills, implementation].every(
            rating => typeof rating === 'number' && rating >= 1 && rating <= 5
          );

          if (allRatingsValid) {
            const average = (knowledge + skills + implementation) / 3;
            averageControl.setValue(parseFloat(average.toFixed(2)), { emitEvent: false });
          } else {
            averageControl.setValue(0, { emitEvent: false });
          }
        });
        
        this.formSubscriptions.add(sub);
      });
    });
  }

  createCapabilityGroup(capability: any): FormGroup {
    if (capability.question.startsWith('Comments')) {
      return this.fb.group({
        question: [{ value: capability.question, disabled: true }],
        fullComment: ['', Validators.required]
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

  getFormArrayControls(formGroup: AbstractControl, formArrayName: string): AbstractControl[] {
    const formArray = formGroup.get(formArrayName) as FormArray;
    return formArray.controls;
  }

  // Type-safe accessors to make the HTML template cleaner
  get skills(): FormArray {
    return this.evaluationForm.get('skills') as FormArray;
  }
  
  get capabilities(): FormArray {
    return this.evaluationForm.get('capabilities') as FormArray;
  }

  onSubmit(): void {
      this.evaluationForm.markAllAsTouched();

    if (this.evaluationForm.invalid) {
      this.evaluationForm.markAllAsTouched();
      alert("Please fill out all required fields before submitting. Check for any red-bordered fields.");
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
      submittedByEmail: this.evaluationForm.get('finalSubmission.submittedByEmail')?.value,
      // getRawValue() is crucial to include disabled fields like candidateName in the final JSON
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

