// src/app/services/interview-panel.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // This is needed again

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface InterviewMeeting {
  id: string;
  subject: string;
  candidateName: string;
  startTime: string; // 'HH:mm' format
  endTime: string;
  interviewerEmails: string[];
}
export interface PanelMember {
  name: string;
  email: string;
}

export interface InterviewMeeting {
  id: string;
  subject: string;
  candidateName: string;
  startTime: string; // 'HH:mm' format
  endTime: string;   // 'HH:mm' format
  interviewerEmails: string[];
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface PanelMeetingsResponse {
  success: boolean;
  message: string;
  searchParameters: {
    panelMemberEmail: string;
    searchDate: string;
  };
  interviews: InterviewMeeting[];
}

export interface ScheduleInterviewRequest {
  panelMemberEmails: string[];
  date: string;
  startTime: string;
  endTime: string;
  candidateName: string;
  interviewLevel: string;
  jobRole: string;
}

export interface ScheduleInterviewResponse {
  id: string;
  subject: string;
  teamsJoinUrl: string;
  webLink: string;
}


@Injectable({
  providedIn: 'root'
})
export class InterviewPanelService {

  private baseUrl = 'https://localhost:7144/api/interviewpanel';

  constructor(private http: HttpClient) { }

  /**
   * Fetches the list of all interview panel members.
   */
   getPanelMembers(): Observable<PanelMember[]> {
    // 1. Tell HttpClient to expect the ApiResponse wrapper.
    return this.http.get<ApiResponse<PanelMember[]>>(`${this.baseUrl}/panel-members`).pipe(
      // 2. Use the map operator to extract the 'data' array before returning it.
      map(response => response.data)
    );
  }

  /**
   * Fetches all meetings for a single interviewer on a specific date.
   */
  getPanelMemberMeetings(email: string, date: string): Observable<InterviewMeeting[]> {
    const params = new HttpParams()
      .set('email', email)
      .set('date', date);
      
    // 1. Tell HttpClient to expect the ApiResponse that wraps our array.
    return this.http.get<ApiResponse<InterviewMeeting[]>>(`${this.baseUrl}/panel-meetings`, { params }).pipe(
      // 2. Use the map operator to extract and return only the 'data' property (the array).
      map(response => response.data)
    );
  }
  getPanelMemberMeetingss(): Observable<InterviewMeeting[]> {
   
    // 1. Tell HttpClient to expect the ApiResponse that wraps our array.
    return this.http.get<ApiResponse<InterviewMeeting[]>>(`https://localhost:7144/api/InterviewPanel/panel-meetings?email=jessicabrown%40RecruitXexp.onmicrosoft.com&date=10-06-2025`).pipe(
      // 2. Use the map operator to extract and return only the 'data' property (the array).
      map(response => response.data)
    );
  }

  scheduleInterview(request: ScheduleInterviewRequest): Observable<ScheduleInterviewResponse> {
    return this.http.post<ScheduleInterviewResponse>(`${this.baseUrl}/schedule-interview`, request);
  }
}