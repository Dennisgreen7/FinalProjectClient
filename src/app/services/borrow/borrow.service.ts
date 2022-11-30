import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Borrow } from 'src/app/models/borrow';
import { ClientBorrow } from 'src/app/models/clientBorrow';
@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  private url: string = "Borrowings";
  constructor(private http: HttpClient) { }

  getBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${environment.apiUrl}/${this.url}`);
  }

  getBorrow(id: number) {
    return this.http.get<Borrow>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  updateorrow(borrow: Borrow): Observable<Borrow> {
    return this.http.put<Borrow>(
      `${environment.apiUrl}/${this.url}/${borrow.borrowingId}`,
      borrow
    );
  }

  createBorrow(borrow: Borrow): Observable<Borrow> {
    return this.http.post<Borrow>(
      `${environment.apiUrl}/${this.url}`,
      borrow
    );
  }

  deleteBorrow(id: number): Observable<Borrow> {
    return this.http.delete<Borrow>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }

  returnBook(borrow: Borrow): Observable<Borrow> {
    return this.http.patch<Borrow>(
      `${environment.apiUrl}/${this.url}/${borrow.borrowingId}`,
      borrow
    );
  }

  clientBorrow(borrow: ClientBorrow): Observable<ClientBorrow> {
    return this.http.post<ClientBorrow>(
      "https://localhost:7034/api/Borrowings/AddBorrowClient",
      borrow
    );
  }
  getBorrowsByClient(id: number) {
    return this.http.get<Borrow[]>(`${environment.apiUrl}/${this.url}/ClientBorrows/${id}`);
  }
}
