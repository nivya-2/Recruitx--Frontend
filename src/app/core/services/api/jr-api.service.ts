import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobRequisitionDto } from '../../../pages/admin-jr-upload/admin-jr-upload.component';
import {ApiResponse} from './CommonAPIResponse';
export interface JobRequisitionSummaryDto {
  id: number;
  title: string;
  skills: string[];
  openPositions: number | null;
  postedDate: string | null;
  location: string | null;
}
export interface JobRequisitionInfo {
  id: number;
  jobTitle: string;
  department: string;
  location: string;
  openPositions: number;
  requestedDate: string;
  hiringManager: string;
  raisedBy: string;
  raisedByRole: string;
  qualification: string;
}
export interface AssignJrPayload {
  jobRequisitionId: number;
  assignedTo: number;
}
@Injectable({ providedIn: 'root' })
export class JrApiService {
  private apiUrl = 'https://localhost:7144/api/JobRequisition';

  constructor(private http: HttpClient) {}

  createJobRequisition(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getAll(): Observable<ApiResponse<JobRequisitionDto[]>> {
    return this.http.get<ApiResponse<JobRequisitionDto[]>>(this.apiUrl);
  }
  getOpenJobSummaries(): Observable<ApiResponse<JobRequisitionSummaryDto[]>> {
  return this.http.get<ApiResponse<JobRequisitionSummaryDto[]>>(`${this.apiUrl}/unassigned`);
}
getJobDetailsById(id: number): Observable<ApiResponse<JobRequisitionInfo>> {
    return this.http.get<ApiResponse<JobRequisitionInfo>>(`${this.apiUrl}/info/${id}`);
  }
  assignJobRequisition(id: number, payload: AssignJrPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/assign`, payload);
  }

  delete(id: number): Observable<void> {
    // Construct the URL for the specific resource, e.g., /api/JobRequisition/123
    const url = `${this.apiUrl}/${id}`;
    
    // Send an HTTP DELETE request.
    // We expect a 204 No Content response, so the Observable's type is <void>.
    return this.http.delete<void>(url);
  }
}
