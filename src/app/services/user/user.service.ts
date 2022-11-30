import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "Users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.apiUrl}/${this.url}/${user.usersId}`,
      user
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.url}`,
      user
    );
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }
}
