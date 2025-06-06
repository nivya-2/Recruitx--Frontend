// services/pending-jd.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PendingJd {
  jobRequisitionId: number;
  roleTitle: string;
  businessUnit: string;
  location: string;
  openPositions: number;
  createdDate: string;
  hiringManager: string;
  actions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PendingJdService {
  private apiUrl = 'https://localhost:7144/api/JobDescription/pending';  // Adjust URL to your API

  constructor(private http: HttpClient) {}

  getPendingJds(): Observable<PendingJd[]> {
    return this.http.get<PendingJd[]>(this.apiUrl, { withCredentials: true });
  }
}
