import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface InterviewDTO {
  interviewId:string;
  candidateName: string;
  jobRole: string;
  date: string;
  time: string;
  interviewRound: string;
  interviewerName: string;
  jobDescription: string;
  createdDate: string;
  status: string;
}

export interface ToScheduleDto {
  id: string;
  roleTitle: string;
  deliveryUnit: string;
  location: string;
  experience: number;
  createdDate: string;
  assoJr: string;
  actions: string[];
}

export interface ToShortlistDto {
  interviewId:string;
  id: string;
  jdId: string;
  name: string;
  interviewDate: string;
  interviewType: string;
  actions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class InterviewServiceService {
  private baseUrl = 'https://localhost:7144/api/Interviews';

  constructor(private http: HttpClient) {}

  getAllInterviews(): Observable<InterviewDTO[]> {
    return this.http.get<{ data: InterviewDTO[] }>(this.baseUrl).pipe(
      map((response) => response.data) // unwrap the data array
    );
  }

  getToScheduleInterviews(): Observable<ToScheduleDto[]> {
    return this.http
      .get<{ data: ToScheduleDto[] }>(`${this.baseUrl}/to-schedule`)
      .pipe(map((response) => response.data));
  }

  getToShortlistInterviews(): Observable<ToShortlistDto[]> {
    return this.http
      .get<{ data: ToShortlistDto[] }>(`${this.baseUrl}/to-shortlist`)
      .pipe(map((response) => response.data));
  }
}
