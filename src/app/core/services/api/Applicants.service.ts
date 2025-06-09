import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './auth.service';

export interface CandidateDTO {
  candidateId: number;
  applicationId: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: number;
  totalExperienceYears: number;
  source: string;
  actions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'https://localhost:7144/api/JobDescription/my-job-descriptions/applicants'; // adjust base URL as needed

  constructor(private http: HttpClient) {}

  getCandidatesByJobRequisitionId(jobId: number): Observable<ApiResponse<CandidateDTO[]>> {
    return this.http.get<ApiResponse<CandidateDTO[]>>(`${this.baseUrl}/${jobId}`);
  }
}
