import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Author } from 'src/app/models/author';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private url: string = "Authors";
  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUrl}/${this.url}`);
  }

  getAuthor(id: number) {
    return this.http.get<Author>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(
      `${environment.apiUrl}/${this.url}/${author.authorId}`,
      author
    );
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(
      `${environment.apiUrl}/${this.url}`,
      author
    );
  }

  deleteAuthor(id: number): Observable<Author> {
    return this.http.delete<Author>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }
}
