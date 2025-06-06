import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CandidateDTO {
  candidateId: number;
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

  getCandidatesByJobRequisitionId(jobId: number): Observable<CandidateDTO[]> {
    return this.http.get<CandidateDTO[]>(`${this.baseUrl}/${jobId}`);
  }
}
