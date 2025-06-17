// File Path: src/app/services/evaluation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- Import the map operator
import { ApiResponse } from './auth.service';

export interface EvaluationFormDetails {
  candidateName: string;
  jobRole: string;
  interviewLevel: string;
  interviewerPrompt: string;
  summary: any; // Add summary, or expand with specific properties
  skills: any[]; // This is the crucial part - the backend sends the skills structur
   proposedRole: string;
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
  getFormDetails(token: string): Observable<ApiResponse<EvaluationFormDetails>> {
    // This calls GET https://localhost:7144/api/evaluation/{token}
    return this.http.get<ApiResponse<EvaluationFormDetails>>(`${this.baseUrl}/${token}`);
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
 getSubmittedEvaluation(interviewId: number): Observable<ApiResponse<SubmittedEvaluation>> {
    // The backend returns the raw DTO, which matches our interface.
    // No mapping needed if the backend doesn't use a wrapper.
    // If the backend *did* use a wrapper like { data: ..., message: ... },
    // you would use map() here to extract the data.
    return this.http.get<ApiResponse<SubmittedEvaluation>>(`${this.baseUrl}/view/${interviewId}`);
  }
}
