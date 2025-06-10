// File Path: src/app/services/evaluation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- Import the map operator

export interface EvaluationFormDetails {
  skills(skills: any): unknown;
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

export interface EvaluationSubmission {
  token: string;
  submittedByEmail: string;
  feedbackJson: string; // The entire form state as a JSON string
}


export interface SubmissionResponse {
    message: string;
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  
}

// Your existing SubmittedEvaluation interface
export interface SubmittedEvaluation {
  candidateName: string;
  feedbackJson: string;}

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

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
getSubmittedEvaluation(interviewId: string): Observable<ApiResponse<SubmittedEvaluation>> {
    // Tell the HttpClient to expect the wrapper type
    return this.http.get<ApiResponse<SubmittedEvaluation>>(`${this.baseUrl}/view/${interviewId}`);
  }
}
