import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book/book.service';
import { BorrowdialogComponent } from '../borrowdialog/borrowdialog.component';

@Component({
  selector: 'app-book-info-dialog',
  templateUrl: './book-info-dialog.component.html',
  styleUrls: ['./book-info-dialog.component.css']
})
export class BookInfoDialogComponent implements OnInit {
  book: any;
  userId: any;
  constructor(private _bookService: BookService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null || this.data.userId != '' && this.data.userId != null) {
      this.userId = this.data.userId;
      this._bookService.getBook(this.data.id).subscribe(response => {
        this.book = response;
      });
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  borrowBook(book: any, userId: any) {
    const _dialog = this.dialog.open(BorrowdialogComponent, {
      width: '500px', height: '450px',
      data: {
        book: book,
        userId: userId,
      },
    });
  }
}
