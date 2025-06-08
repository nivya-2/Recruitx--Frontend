import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResponse } from './CommonAPIResponse';

export interface UserDetails {
  userId: number;
  employeeId: string;
  name: string;
  jobTitle: string;
  roleTitle: string;
  location: string;
  deliveryUnit: string;
  email: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly baseUrl = 'https://localhost:7144/api/user'; // Adjust this base path as needed

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDetails[]> {
  return this.http.get<ApiResponse<UserDetails[]>>(`${this.baseUrl}/`)
    .pipe(
      map(response => {
        // Check if the API call was successful
        if (response.success && response.statusCode === 200) {
          // Extract and return the data array
          return response.data;
        } else {
          // Handle API errors based on status codes
          switch (response.statusCode) {
            case 401:
              throw new Error('Unauthorized: Please login again');
            case 403:
              throw new Error('Forbidden: You don\'t have permission to access this resource');
            case 404:
              throw new Error('Users not found');
            case 500:
              throw new Error('Internal server error: Please try again later');
            default:
              throw new Error(response.message || 'Failed to fetch users');
          }
        }
      }),

    );
}

  setUserInactive(userId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/set-inactive/${userId}`, {});
  }

  setUserActive(userId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/set-active/${userId}`, {});
  }
}
