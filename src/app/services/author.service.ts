import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private url: string = "Authors";
  constructor(private http: HttpClient) { }
  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUrl}/${this.url}`);
  }
  public updateAuthor(author: Author): Observable<Author[]> {
    return this.http.put<Author[]>(
      `${environment.apiUrl}/${this.url}/${author.authorId}`,
      author
    );
  }

  public createAuthor(author: Author): Observable<Author[]> {
    return this.http.post<Author[]>(
      `${environment.apiUrl}/${this.url}`,
      author
    );
  }

  public deleteAuthor(author: Author): Observable<Author[]> {
    return this.http.delete<Author[]>(
      `${environment.apiUrl}/${this.url}/${author.authorId}`
    );
  }
}
