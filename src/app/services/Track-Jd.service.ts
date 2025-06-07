// services/track-jd.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './auth.service';

export interface TrackJdDTO {
  jobRequisitionId: number;
  roleTitle: string;
  businessUnit: string;
  createdDate: string;
  jobStatus: string;
  actions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TrackJdService {
  private apiUrl = `https://localhost:7144/api/JobDescription/my-job-descriptions`;

  constructor(private http: HttpClient) { }

  getJobDescriptionsForUser(): Observable<ApiResponse<TrackJdDTO[]>> {
    // With credentials: true to include cookies in the request
    return this.http.get<ApiResponse<TrackJdDTO[]>>(`${this.apiUrl}`, { 
      withCredentials: true 
    });
  }
}