import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Candidate {
  id: number;
  name: string;
  mobNumber: number;
  email: string;
  currentEmployer: string;
  totalExp: string;
  relevantExp: string;
  // interviewRoundNumber: number;
  stage: string;
}

@Injectable({
  providedIn: 'root'
})
export class JdCandidateService {

  private baseUrl = 'https://localhost:7144/api/Interviews/schedule'; 

  constructor(private http: HttpClient) {}

  getCandidatesByJdId(jrId: number): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/${jrId}`);
  }
}
