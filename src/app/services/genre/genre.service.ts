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
  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.apiUrl}/${this.url}`);
  }
  public updateGenre(genre: Genre): Observable<Genre[]> {
    return this.http.put<Genre[]>(
      `${environment.apiUrl}/${this.url}/${genre.genreId}`,
      genre
    );
  }

  public createGenre(genre: Genre): Observable<Genre[]> {
    return this.http.post<Genre[]>(
      `${environment.apiUrl}/${this.url}`,
      genre
    );
  }

  public deleteGenre(genre: Genre): Observable<Genre[]> {
    return this.http.delete<Genre[]>(
      `${environment.apiUrl}/${this.url}/${genre.genreId}`
    );
  }
}
