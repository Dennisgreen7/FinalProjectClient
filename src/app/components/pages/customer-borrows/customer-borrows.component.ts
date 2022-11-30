import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Borrow } from 'src/app/models/borrow';
import { BorrowService } from 'src/app/services/borrow/borrow.service';
import { BorrowDialogComponent } from '../../dialogs/borrow-dialog/borrow-dialog.component';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-customer-borrows',
  templateUrl: './customer-borrows.component.html',
  styleUrls: ['./customer-borrows.component.css']
})
export class CustomerBorrowsComponent implements OnInit {
  headerColor = "silver";
  displayedColumns: string[] = ['borrowingId', 'bookName', 'userName', 'borrowingDate', 'borrowingReturnDate', 'borrowingReturnedDate', 'action'];
  dataSource = new MatTableDataSource<Borrow>();
  empdata: any;
  mssg: any;
  activeUser: any = { usersFullName: localStorage.getItem('name'), usersRole: localStorage.getItem('role'), usersId: localStorage.getItem('id') };
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private _borrowService: BorrowService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  filterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  getAll() {
    this._borrowService.getBorrowsByClient(Number(localStorage.getItem('id'))).subscribe(result => {
      this.empdata = result;
      this.dataSource = new MatTableDataSource(this.empdata.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  returnBook(borrow: Borrow) {
    this._borrowService.returnBook(borrow).subscribe(r => {
      this.mssg = r;
      this.getAll();
      alertify.success(this.mssg.message);
    }, error => {
      alertify.error(error.error.message);
    });
  }

  removeBorrow(id: any) {
    alertify.confirm("Remove Borrow", "do you want to remove this borrow", () => {
      this._borrowService.deleteBorrow(id).subscribe(r => {
        this.mssg = r;
        this.getAll();
        alertify.success(this.mssg.message);
      }, error => {
        alertify.error(error.error?.message);
      });
    }, function () {

    })
  }
}
