import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book/book.service';
import { BookInfoDialogComponent } from '../../dialogs/book-info-dialog/book-info-dialog.component';
import { BorrowdialogComponent } from '../../dialogs/borrowdialog/borrowdialog.component';
import * as alertify from 'alertifyjs';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  books: any;
  headerColor: string = "silver";
  constructor(private _bookService: BookService, private dialog: MatDialog, private _authService: AuthService) { }
  totalLength: any;
  page: number = 1;
  activeUser: any;
  ngOnInit(): void {
    this.getLoggedInUser();
    this.getAll();
  }
  getAll() {
    this._bookService.getBooksForBorrow().subscribe(result => {
      this.books = result;
      this.totalLength = this.books.data.length;
    });
  }

  openDialog(id: any, userId: any) {
    const _dialog = this.dialog.open(BookInfoDialogComponent, {
      width: '500px', height: '700px',
      data: {
        id: id,
        userId: userId,
      },
    });
    _dialog.afterClosed().subscribe(r => {
      this.getAll()
    });
  }

  bookInfo(id: any, userId: any) {
    this.openDialog(id, userId);
  }

  borrowBook(book: any, userId: any) {
    const _dialog = this.dialog.open(BorrowdialogComponent, {
      width: '500px', height: '450px',
      data: {
        book: book,
        userId: userId,
      },
    });
    _dialog.afterClosed().subscribe(r => {
      this.getAll()
    });
  }

  filterIndex: number = 0;
  onSelectedFilter(value: string): void {
    this.filterIndex = parseInt(value);
  }
  searchValue: string = '';
  onSelectedSearchValue(value: string): void {
    this.searchValue = value;
  }


  filterBook() {
    if (this.searchValue === "") {
      alertify.error("Error, search bar is empty.");
      return;
    }
    else if (Number.isNaN(this.filterIndex) || this.filterIndex === 0) {
      alertify.error("Error, invalid filter parameter.");
      return;
    }

    this._bookService.filterBooks(this.filterIndex, this.searchValue).subscribe(result => {
      this.books = result;
      this.totalLength = this.books.data.length;
    }, error => {
      alertify.error(error.error.message);
    });
  }

  getLoggedInUser() {
    this._authService.getMe().subscribe(r => {
      this.activeUser = r;
    });
  }

}
