import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      alertify.error("Please login first!");
      return false;
    }
  }

}
