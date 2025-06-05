import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutApiService {

   constructor(private http: HttpClient, private router: Router) {}

  logout() {
    return this.http.post('http://localhost:5053/api/Auth/logout', {}).subscribe({
      next: (res) => {
        console.log('Logout successful');
        // Clear any localStorage or sessionStorage tokens
        // localStorage.removeItem('authToken');
        // Redirect to login
        // this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}
