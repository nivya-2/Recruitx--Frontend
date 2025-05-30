import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface JobRequisition {
  requisitionId: string;
  jobTitle: string;
  deliveryUnit: string;
  location: string;
  hiringManager: string;
  uploadedOn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminJobRequisitionsService {
  private apiUrl = 'http://localhost:3000/job-requisitions'; // Update with your actual API endpoint
  // Example: 'https://recruitx.com/api/job-requisitions'

  constructor(private http: HttpClient) {}

  getJobRequisitions(): Observable<JobRequisition[]> {
    return this.http.get<JobRequisition[]>(this.apiUrl);
  }
  
  
}
