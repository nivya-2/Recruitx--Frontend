// src/app/services/candidate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './auth.service';

export interface CandidateDetailsDTO {
  candidateID: number;
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
}

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = 'https://localhost:7144/api/JobDescription/my-job-descriptions/applicant-details'; // Adjust base URL as needed

  constructor(private http: HttpClient) {}

  getCandidateDetails(applicationId: number): Observable<ApiResponse<CandidateDetailsDTO>> {
    return this.http.get<ApiResponse<CandidateDetailsDTO>>(`${this.baseUrl}/${applicationId}`);
  }
}
