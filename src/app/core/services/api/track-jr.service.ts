import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './auth.service';
export interface TrackJobRequisitionDTO {
  id: number;
  role: string;
  departmentName: string | null;
  locationName: string | null;
  hiringManagerName: string | null;
  status: string;
  numPositions: number;
  filledPositions: number;
  assignedTo: string;
  assignedOn: string; // Keep as string, will be in "YYYY-MM-DD" format from JSON
  closeBy: string;   // Keep as string
}
@Injectable({
  providedIn: 'root'
})

export class TrackJrService {

 private apiUrl = 'https://localhost:7144/api/JobRequisition/assigned-by-me';

  constructor(private http: HttpClient) { }

  /**
   * Fetches the tracking dashboard data.
   * The backend automatically filters this data based on the user's role.
   */
  public getTrackingDashboard(): Observable<ApiResponse<TrackJobRequisitionDTO[]>> {
    const url = `${this.apiUrl}`;
    
    // Use withCredentials: true if your API relies on cookie-based authentication (like from a login)
    return this.http.get<ApiResponse<TrackJobRequisitionDTO[]>>(url, { withCredentials: true });
  }}
