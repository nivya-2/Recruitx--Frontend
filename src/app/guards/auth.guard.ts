// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      if (!this.auth.isAuthenticated()) {
        await this.auth.fetchProfile();
      }

      const roles = route.data['roles'] as string[];

      if (this.auth.hasRole(roles)) {
        return true;
      } else {
        console.log('Access denied. User role:', this.auth.role, 'Expected roles:', roles);
        return this.router.parseUrl('/unauthorized');
      }
    } catch {
                console.log('Access denied. User role:', this.auth.role);

      return this.router.parseUrl('/unauthorized');
    }
    
  }
  
}
