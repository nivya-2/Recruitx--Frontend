import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../core/services/api/CommonAPIResponse';
import { map, Observable } from 'rxjs';

export interface Team {
  userId: number;
  memberName: string;
  jobTitle: string;
  jrAssigned: number;
  reportingLead?: string;
  actions: string[];
}

interface JrProgress {
  current: number;
  total: number;
}

export interface AssignedJr {
  jobId: number;
  jobTitle: string;
  du: string;
  location: string;
  status: string;
  jrProgress: JrProgress; // Use a specific type if you know the structure
  hiringManager: string;
  assignedOn: string;
  closeBy: string;
}


@Injectable({
  providedIn: 'root'
})
export class MyTeamService {

  private apiUrl = 'https://localhost:7144/api/Users';

  constructor(private http: HttpClient) { }

  getTeamMembers(): Observable<ApiResponse<Team[]>> {
    return this.http.get<ApiResponse<Team[]>>(`${this.apiUrl}/all-team`);
  }

  getAssignedJrs(userId: number): Observable<ApiResponse<AssignedJr[]>> {
    return this.http.get<ApiResponse<AssignedJr[]>>(`${this.apiUrl}/${userId}/job-requisitions`);
  }
}
