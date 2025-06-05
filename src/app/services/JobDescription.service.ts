// src/app/services/job-description.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobDescriptionDTO {
  jobRequisitionId: number;
  jobDescriptionId?: number | null;
  role: string;
  workLocation: string;
  totalExperienceYears?: number | null;
  totalExperienceMonths?: number | null;
  relevantExperienceYears?: number | null;
  relevantExperienceMonths?: number | null;
  qualification: string;
  skillsMandatory: string;
  skillsPrimary: string;
  skillsGood: string;
  jobDescription: string;
  jobPurpose: string;
  jobSpecification: string;
  onboardingDate: string; // e.g. "15-08-2025"
}

@Injectable({
  providedIn: 'root'
})
export class JobDescriptionService {

  private apiUrl = 'https://localhost:7144/api/JobDescription/my-job-descriptions'; // replace with your real API endpoint

  constructor(private http: HttpClient) { }

  getJobDescription(jobRequisitionId: number): Observable<JobDescriptionDTO> {
    // Assuming your API endpoint to get job description by requisition Id
    return this.http.get<JobDescriptionDTO>(`${this.apiUrl}/${jobRequisitionId}`);
  }
}
