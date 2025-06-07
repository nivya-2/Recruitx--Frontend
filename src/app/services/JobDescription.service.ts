// src/app/services/job-description.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './auth.service';

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

  private apiUrl = 'https://localhost:7144/api/JobDescription'; // replace with your real API endpoint

  constructor(private http: HttpClient) { }

   getJobDescription(jobRequisitionId: number): Observable<ApiResponse<JobDescriptionDTO>> {
    // This endpoint should point to your method for getting a saved JD
    return this.http.get<ApiResponse<JobDescriptionDTO>>(`${this.apiUrl}/my-job-descriptions/${jobRequisitionId}`, { withCredentials: true });
  }

  /**
   * --- NEW METHOD ---
   * Fetches initial data from a Job Requisition to PRE-FILL a new Job Description form.
   * Used for the 'Generate JD' action.
   * NOTE: The URL here is an example. You must match it to your actual backend endpoint.
   */
  generateJdFromRequisition(jobRequisitionId: number): Observable<ApiResponse<JobDescriptionDTO>> {
    // This endpoint should fetch base details (like role, location) from the requisition itself.
    // The backend would map these details to a JobDescriptionDTO.
    return this.http.get<ApiResponse<JobDescriptionDTO>>(`${this.apiUrl}/draft/${jobRequisitionId}`, { withCredentials: true });
  }

  /**
   * --- NEW METHOD ---
   * Saves or updates a job description.
   * Used by the 'onSave' method in your DetailsComponent.
   */
  updateJobDescription(jobRequisitionId: number, jdData: JobDescriptionDTO): Observable<ApiResponse<JobDescriptionDTO>> {
    // Uses HTTP PUT to send the updated data to the server.
    // The server would then persist these changes to the database.
    return this.http.post<ApiResponse<JobDescriptionDTO>>(`${this.apiUrl}/save-draft`, jdData, { withCredentials: true , responseType: 'text' as 'json'});
  }

   submitJobDescription(jobRequisitionId: number, jdData: JobDescriptionDTO): Observable<ApiResponse<JobDescriptionDTO>>{
    // Uses HTTP PUT to send the updated data to the server.
    // The server would then persist these changes to the database.
    return this.http.put<ApiResponse<JobDescriptionDTO>>(`${this.apiUrl}/generateJD`, jdData, { withCredentials: true ,responseType: 'text' as 'json'});
  }
}
