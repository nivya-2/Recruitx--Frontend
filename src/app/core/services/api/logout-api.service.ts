import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutApiService {

   constructor(private http: HttpClient, private router: Router) {}

  logout() {
  // return this.http.get('http://localhost:7144/api/Auth/logout').subscribe({
  //   next: (res) => {
  //     console.log('Logout successful');
  //     // Clear client-side storage if any
  //     this.router.navigate(['/login']);
  //   },
  //   error: (err) => {
  //     console.error('Logout failed', err);
  //   },
  // });
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'https://localhost:7144/api/Auth/logout';

  }
}
