import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobDescription {
  id: string;
  roleTitle: string;
  deliveryUnit: string;
  createdDate: string; // Backend returns DateTime; we'll handle format in UI
  associatedJr: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobDescriptionService {
  private apiUrl = 'https://localhost:7144/api/JD'; // <-- Update this


  constructor(private http: HttpClient) {}

  getJobDescriptions(): Observable<JobDescription[]> {
    return this.http.get<JobDescription[]>(this.apiUrl);
  }
}
