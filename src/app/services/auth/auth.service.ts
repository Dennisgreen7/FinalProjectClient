import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user';
import { UserLogin } from 'src/app/models/userLogin';
import { UserRegistraion } from 'src/app/models/userRegistration';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  register(user: UserRegistraion): Observable<UserRegistraion> {
    return this.http.post<UserRegistraion>('https://localhost:7034/api/Auth/register', user);
  }

  login(user: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://localhost:7034/api/Auth/login', user);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  storeUser(userValue: any) {
    localStorage.setItem('name', userValue.usersFullName);
    localStorage.setItem('id', userValue.usersId);
    localStorage.setItem('role', userValue.usersRole);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getMe(): Observable<User> {
    return this.http.get<User>('https://localhost:7034/api/Auth');
  }

}
