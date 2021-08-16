// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../Service/auth.service';
// NGRX

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }
}
