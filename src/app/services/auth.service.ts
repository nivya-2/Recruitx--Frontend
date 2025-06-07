// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  meta?: any;
  data: T;
}
export interface UserProfile {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private profileUrl = 'https://localhost:7144/api/auth/profile';
  public role: string | null = null;
  public name: string | null = null;
  public email: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  fetchProfile(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<ApiResponse<UserProfile>>(this.profileUrl, { withCredentials: true }).subscribe({
        next: (response) => {
          const data=response.data;
          this.name = data.name;
          this.email = data.email;
          this.role = data.role;
          resolve(true);
        },
        error: () => {
          this.router.navigate(['/unauthorized']);
          reject(false);
        }
      });
    });
  }

  isAuthenticated(): boolean {
    return !!this.role;
  }

  hasRole(allowedRoles: string[]): boolean {
    return allowedRoles.includes(this.role || '');
  }
}
