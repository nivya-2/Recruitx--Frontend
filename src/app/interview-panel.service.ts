
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // 1. IMPORT map

// The ApiResponse interface must be defined here or imported
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

/**
 * A specific interface for the response from the 'GET /panel-meetings' endpoint.
 */
export interface PanelMeetingsResponse {
  data: any;
  success: boolean;
  message: string;
  searchParameters: {
    panelMemberEmail: string;
    searchDate: string;
  };
  interviews: InterviewMeetingDetails[];
}

/**
 * Represents the detailed information for a single interview meeting.
 */
export interface InterviewMeetingDetails {
  id: string;
  subject: string;
  candidateName: string;
  position: string;
  startTime: string; // The backend returns date-time strings (e.g., "2024-11-21T09:30:00Z")
  endTime: string;
  timeZone: string;
  teamsJoinUrl: string;
  organizer: string;
  attendees: MeetingAttendee[];
}
export interface PanelMember {
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}
/**
 * Represents an attendee in a meeting.
 */
export interface MeetingAttendee {
  name: string;
  email: string;
}
export interface ScheduleInterviewRequest {
  panelMemberEmails: string[];
  date: string;       // "dd-MM-yyyy"
  startTime: string;  // "h:mm AM/PM" format, e.g., "2:30 PM"
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
  startTime: string;
  endTime: string;
}
@Injectable({
  providedIn: 'root'
})
export class InterviewPanelService {

  private baseUrl = 'http://localhost:5053/api/interviewpanel';

  constructor(private http: HttpClient) { }

  /**
   * Fetches the list of interview panel members.
   *
   * @returns An Observable containing just the array of strings.
   */
getPanelMembers(): Observable<PanelMember[]> {
  return this.http.get<ApiResponse<PanelMember[]>>(`${this.baseUrl}/panel-members`).pipe(
    map(response => response.data)
  );
}
/**
//    * Fetches scheduled meetings for a specific panel member on a given date.
//    * @param email The email of the panel member.
//    * @param date The date in 'dd-MM-yyyy' format.
//    * @returns An Observable containing the specific response structure for this API call.
//    */
  getPanelMemberMeetings(email: string, date: string): Observable<PanelMeetingsResponse> {
    // Use HttpParams to safely handle URL query parameters.
    const params = new HttpParams()
      .set('email', email)
      .set('date', date);

    // Tell HttpClient to expect the new, specific PanelMeetingsResponse interface.
    return this.http.get<PanelMeetingsResponse>(`${this.baseUrl}/panel-meetings`, { params });
  }

/**
   * Sends a request to the backend to schedule a new Teams interview.
   * @param request The interview details.
   * @returns An Observable with the details of the created meeting.
   */
  scheduleInterview(request: ScheduleInterviewRequest): Observable<ScheduleInterviewResponse> {
    return this.http.post<ScheduleInterviewResponse>(`${this.baseUrl}/schedule-interview`, request);
  }
}

