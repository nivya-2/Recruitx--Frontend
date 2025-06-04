// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
      this.http.get<any>(this.profileUrl, { withCredentials: true }).subscribe({
        next: (data) => {
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
