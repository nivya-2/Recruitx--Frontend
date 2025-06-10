// File Path: src/app/services/evaluation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// The 'environment' import is no longer needed.

// ===================================================================
// INTERFACE DEFINITIONS (Matching the C# DTOs)
// ===================================================================

/**
 * Represents the data received from the backend to display the form header.
 * Matches EvaluationFormPocDto in C#.
 */
export interface EvaluationFormDetails {
  candidateName: string;
  jobRole: string;
  interviewLevel: string;
  interviewerPrompt: string;
}
export interface SubmittedEvaluation {
  candidateName: string;
  jobRole: string;
  interviewLevel: string;
  submittedByEmail: string;
  submittedAt: string; // The backend sends a date-time string
  feedbackJson: string; // The raw JSON string of the submitted form
}
/**
 * Represents the data sent to the backend when the form is submitted.
 * Matches SubmitEvaluationDto in C#.
 */
export interface EvaluationSubmission {
  token: string;
  submittedByEmail: string;
  feedbackJson: string; // The entire form state as a JSON string
}

/**
 * A simple interface for the successful submission response.
 */
export interface SubmissionResponse {
    message: string;
}


// ===================================================================
// SERVICE IMPLEMENTATION
// ===================================================================

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  // CORRECTED: The base URL is now hardcoded directly.
  // This must match the URL where your backend is running.
  private baseUrl = 'https://localhost:7144/api/evaluation';

  constructor(private http: HttpClient) { }

  /**
   * Validates a token and gets the details needed to display the form.
   * @param token The unique token from the URL.
   * @returns An Observable with the form details.
   */
  getFormDetails(token: string): Observable<EvaluationFormDetails> {
    // This calls GET https://localhost:7144/api/evaluation/{token}
    return this.http.get<EvaluationFormDetails>(`${this.baseUrl}/${token}`);
  }

  /**
   * Submits the completed evaluation form data to the backend.
   * @param submission The submission data object.
   * @returns An Observable with a simple success message.
   */
  submitEvaluation(submission: EvaluationSubmission): Observable<SubmissionResponse> {
    // This calls POST https://localhost:7144/api/evaluation/submit
    return this.http.post<SubmissionResponse>(`${this.baseUrl}/submit`, submission);
  }
  /**
   * Fetches a submitted evaluation for a given interview ID.
   * NOTE: This endpoint is secure and requires an authentication token.
   * The HttpInterceptor should automatically add the token.
   * @param interviewId The ID of the interview.
   */
  getSubmittedEvaluation(interviewId: number): Observable<SubmittedEvaluation> {
    // This calls GET /api/evaluation/view/{interviewId}
    return this.http.get<SubmittedEvaluation>(`${this.baseUrl}/view/${interviewId}`);
  }
}