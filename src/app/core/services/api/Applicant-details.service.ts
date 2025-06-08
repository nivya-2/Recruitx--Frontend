// src/app/services/candidate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CandidateDetailsDTO {
  candidateID: number;
  applicationID: number;
  candidateName: string;
  candidatePhone: string;
  candidateEmail: string;
  totalExperience: string;
  relavantExperience: string;
  noticePeriod: string;
  currentCTC: number;
  expectedCTC: number;
  source: string;
  currentLocation: string;
  currentEmployer: string;
  status: string;
  jrStatus:string;
}

export interface TimelineStep {
  label: string;
  date?: string;
  completed: boolean;
}

export interface ApplicationDetailsPageDTO {
  candidateInfo: CandidateDetailsDTO;
  statusTimeline: TimelineStep[];
  isProcessFinished: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class CandidateService1 {
  private baseUrl = 'https://localhost:7144/api/JobDescription/my-job-descriptions/applicant-details'; // Adjust base URL as needed

  constructor(private http: HttpClient) {}

  getApplicationPageDetails(applicationId: number): Observable<{ data: ApplicationDetailsPageDTO }> {
    return this.http.get<{ data: ApplicationDetailsPageDTO }>(`${this.baseUrl}/${applicationId}`);
  }

    updateApplicationStatus(applicationId: number, action: 'progress' | 'reject'): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${applicationId}/update-status`, { action });
  }
}
