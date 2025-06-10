// src/app/services/email.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApplicationEmailRequest {
  applicationId: number;
}

export interface SendInterviewInvitationRequest {
  interviewId: number;
  meetingLink?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly baseUrl = 'https://localhost:7144/api/Email'; // Adjust if hosted elsewhere

  constructor(private http: HttpClient) {}

  // Send test email
  sendTestEmail(to: string): Observable<string> {
    const params = new HttpParams().set('to', to);
    return this.http.post(`${this.baseUrl}/send-test`, null, { params, responseType: 'text' });
  }

  // Send screening email
  sendScreeningEmail(request: ApplicationEmailRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/send-screening`, request, { responseType: 'text' });
  }

  // Send job offer email
  sendJobOfferEmail(request: ApplicationEmailRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/send-job-offer`, request, { responseType: 'text' });
  }

  // Send rejection email
  sendRejectionEmail(request: ApplicationEmailRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/send-rejection`, request, { responseType: 'text' });
  }

  // Send interview invitation
  sendInterviewInvitation(request: SendInterviewInvitationRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/send-interview-invitation`, request, { responseType: 'text' });
  }
}
