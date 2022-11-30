import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrowService } from 'src/app/services/borrow/borrow.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as alertify from 'alertifyjs';
import { Borrow } from 'src/app/models/borrow';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientBorrow } from 'src/app/models/clientBorrow';
import { Router } from '@angular/router';
@Component({
  selector: 'app-borrowdialog',
  templateUrl: './borrowdialog.component.html',
  styleUrls: ['./borrowdialog.component.css']
})
export class BorrowdialogComponent implements OnInit {

  constructor(private builder: FormBuilder, private dialog: MatDialog, private _borrowService: BorrowService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
  mssg: any;
  borrowedBook: any;
  borrow: ClientBorrow = new ClientBorrow();

  ngOnInit(): void {
    if (this.data.book != "" && this.data.book != null && this.data.userId != "" && this.data.userId != null) {
      this.borrow = { borrowingBookId: this.data.book.bookId, borrowingUserId: this.data.userId };
    }
  }


  async borrowBook() {
    if (this.borrow.borrowingBookId != 0 && this.borrow.borrowingUserId != 0) {
      this._borrowService.clientBorrow(this.borrow).subscribe(response => {
        this.mssg = response;
        alertify.success(this.mssg.message);
        this.closeDialog();
      }, error => {
        alertify.error(error.error.message);
      });
    }
    else {
      if (await localStorage.getItem('token') == null) {
        alertify.error("To borrow a book you need first login.");
        this.closeDialog();
        this.router.navigate(['login']);
      }
      else {
        alertify.error("Book wasn't borrowed successfully.");
      }
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
