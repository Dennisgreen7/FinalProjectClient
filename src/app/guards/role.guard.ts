import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    let role = localStorage.getItem('role');
    if (role == "Admin") {
      return true;
    }
    this.router.navigate(['401']);
    alertify.error("You don't have Admin rights.");
    return false;
  }

}
