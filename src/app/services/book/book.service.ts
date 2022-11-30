import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Book } from 'src/app/models/book';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url: string = "Books";

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/${this.url}`);
  }

  getBooksForBorrow(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/${this.url}/BooksForBorrow`);
  }

  getBook(id: number) {
    return this.http.get<Book>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(
      `${environment.apiUrl}/${this.url}/${book.bookId}`,
      book
    );
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(
      `${environment.apiUrl}/${this.url}`,
      book
    );
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }

  filterBooks(filterIndex: number, searchValue: string): Observable<Book[]> {
    return this.http.get<Book[]>("https://localhost:7034/api/Books/FilterBooks/" + filterIndex + "?searchValue=" + searchValue);
  }
}
