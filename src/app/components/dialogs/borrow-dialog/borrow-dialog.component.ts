import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrowService } from 'src/app/services/borrow/borrow.service';
import { BookService } from 'src/app/services/book/book.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-borrow-dialog',
  templateUrl: './borrow-dialog.component.html',
  styleUrls: ['./borrow-dialog.component.css']
})
export class BorrowDialogComponent implements OnInit {

  editBorrow: any;
  usersDb: any;
  booksDb: any;
  mssg: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private _borrowService: BorrowService, private _bookService: BookService, private _userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getBooks();
    this.getUsers();

    if (this.data.id != '' && this.data.id != null) {
      this._borrowService.getBorrow(this.data.id).subscribe(response => {
        this.editBorrow = response;

        this.borrowForm.setValue({
          borrowingId: this.editBorrow.data.borrowingId,
          borrowingBookId: this.editBorrow.data.borrowingBookId,
          borrowingUserId: this.editBorrow.data.borrowingUserId,
          borrowingDate: this.editBorrow.data.borrowingDate,
          borrowingReturnDate: this.editBorrow.data.borrowingReturnDate,
          borrowingReturnedDate: this.editBorrow.data.borrowingReturnedDate,
        });
      });
    }
  }

  borrowForm = this.builder.group({
    borrowingId: this.builder.control({ value: '', disabled: true }),
    borrowingBookId: this.builder.control('', Validators.required),
    borrowingUserId: this.builder.control('', Validators.required),
    borrowingDate: this.builder.control({ value: '', disabled: true }),
    borrowingReturnDate: this.builder.control('', Validators.required),
    borrowingReturnedDate: this.builder.control({ value: '', disabled: true })
  });

  getBooks() {
    this._bookService.getBooksForBorrow().subscribe(result => {
      this.booksDb = result;
    });
  }

  getUsers() {
    this._userService.getUsers().subscribe(result => {
      this.usersDb = result;
    });
  }

  saveBorrow() {
    if (this.borrowForm.valid) {
      const editId = this.borrowForm.getRawValue().borrowingId;
      if (editId != '' && editId != null) {
        this._borrowService.updateorrow(this.borrowForm.getRawValue()).subscribe(response => {
          this.mssg = response;
          alertify.success(this.mssg.message);
          this.closeDialog();
        }, error => {
          alertify.error(error.error.message);
        });
      }
      else {
        this._borrowService.createBorrow(this.borrowForm.value).subscribe(response => {
          this.mssg = response;
          alertify.success(this.mssg.message);
          this.closeDialog();
        }, error => {
          alertify.error(error.error.message);
        });
      }
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
