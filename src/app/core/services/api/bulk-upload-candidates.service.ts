import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MappedCandidateData {
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: number; // Optional, as it might be undefined
  totalExperienceYears: number;
  relevantExperienceYears: number;
  currentLocation: string;
  noticePeriod: number | null;
  source: string;
  role: string | null;
  subSource: string | null;
  skill: string | null;
  linkedin: string | null;
  currentEmployer: string | null;
  currentCTC: number;
  expectedCTC: number | null;
  preferedLocation: string | null;
}

/**
 * Represents the exact payload structure the C# backend API expects.
 * Note the PascalCase properties.
 */
export interface CandidatePayloadDTO {
  CandidateName: string;
  CandidateEmail: string;
  CandidatePhone: number; // The backend expects a non-nullable long
  TotalExperience: number;
  RelavantExperience: number; // Keep typo to match your C# DTO
  CurrentLocation: string;
  NoticePeriod: number | null;
  Source: string;
  Role: string | null;
  SubSource: string | null;
  Skill: string | null;
  Linkedin: string | null;
  CurrentEmployer: string | null;
  CurrentCTC: number;
  ExpectedCTC: number | null;
  PreferedLocation: string | null;
}
export interface BulkAddResultDTO {
  successCount: number;
  failureCount: number;
  failureMessages: string[];
}
@Injectable({
  providedIn: 'root'
})

export class BulkUploadCandidatesService {

 private baseUrl = 'https://localhost:7144/api/JobDescription/my-job-descriptions'; // Adjust base URL as needed

  constructor(private http: HttpClient) {}
    public bulkAddCandidates(
    jobRequisitionId: number,
    candidates: MappedCandidateData[] // Accepts the output of your existing method
  ): Observable<BulkAddResultDTO> {

    const url = `${this.baseUrl}/${jobRequisitionId}/bulk-add`;

    // Map the component's DTO (camelCase) to the backend's DTO (PascalCase)
    const payload: CandidatePayloadDTO[] = candidates.map(p => ({
      CandidateName: p.candidateName,
      CandidateEmail: p.candidateEmail,
      // Provide a default of 0 if phone is undefined or null, as the backend `long` is not nullable.
      CandidatePhone: p.candidatePhone ?? 0, 
      TotalExperience: p.totalExperienceYears,
      RelavantExperience: p.relevantExperienceYears, // Keep typo
      CurrentLocation: p.currentLocation,
      NoticePeriod: p.noticePeriod,
      Source: p.source,
      Role: p.role,
      SubSource: p.subSource,
      Skill: p.skill,
      Linkedin: p.linkedin,
      CurrentEmployer: p.currentEmployer,
      CurrentCTC: p.currentCTC,
      ExpectedCTC: p.expectedCTC,
      PreferedLocation: p.preferedLocation,
    }));
        

    console.log(payload);
    return this.http.post<BulkAddResultDTO>(url, payload, { withCredentials: true });
  }
 
}
