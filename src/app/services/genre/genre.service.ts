import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Genre } from 'src/app/models/genre';
@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private url: string = "Genre";

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.apiUrl}/${this.url}`);
  }

  getGenre(id: number) {
    return this.http.get<Genre>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(
      `${environment.apiUrl}/${this.url}/${genre.genreId}`,
      genre
    );
  }

  createGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(
      `${environment.apiUrl}/${this.url}`,
      genre
    );
  }

  deleteGenre(id: number): Observable<Genre> {
    return this.http.delete<Genre>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }
}
