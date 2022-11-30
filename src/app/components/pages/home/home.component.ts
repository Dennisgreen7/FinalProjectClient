import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookInfoDialogComponent } from '../../dialogs/book-info-dialog/book-info-dialog.component';
import { BorrowdialogComponent } from '../../dialogs/borrowdialog/borrowdialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any;
  activeUser: any;
  bannerBackground: string = "../assets/images/Library.png";
  constructor(private _bookService: BookService, private dialog: MatDialog, private _authService: AuthService) { }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getAll();
  }
  getAll() {
    this._bookService.getBooksForBorrow().subscribe(result => {
      this.books = result;
    });
  }
  openDialog(id: any, userId: any) {
    const _dialog = this.dialog.open(BookInfoDialogComponent, {
      width: '500px',
      data: {
        id: id,
        userId: userId
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

  getLoggedInUser() {
    if (this._authService.isLoggedIn()) {
      this._authService.getMe().subscribe(r => {
        this.activeUser = r;
      });
    }
    return;
  }

}
