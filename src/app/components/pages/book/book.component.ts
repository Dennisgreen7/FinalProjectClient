import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book/book.service';
import { BookDialogComponent } from '../../dialogs/book-dialog/book-dialog.component';
import * as alertify from 'alertifyjs';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  headerColor = "silver";
  displayedColumns: string[] = ['bookId', 'bookName', 'authorName', 'bookLanguage', 'genreName', 'bookPublishedYear', 'bookNumOfPages', 'bookCopys', 'action'];
  dataSource = new MatTableDataSource<Book>();
  empdata: any;
  mssg: any;
  activeUser: any = { usersFullName: localStorage.getItem('name'), usersRole: localStorage.getItem('role'), usersId: localStorage.getItem('id') };
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private _bookService: BookService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._bookService.getBooks().subscribe(result => {
      this.empdata = result;

      this.dataSource = new MatTableDataSource(this.empdata.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  openDialog(id: any) {
    const _dialog = this.dialog.open(BookDialogComponent, {
      width: '500px',
      data: {
        id: id
      }
    });

    _dialog.afterClosed().subscribe(r => {
      this.getAll();
    });
  }

  editBook(id: any) {
    this.openDialog(id);
  }

  removeBook(id: any) {
    alertify.confirm("Remove Book", "do you want to remove this book?", () => {
      this._bookService.deleteBook(id).subscribe(r => {
        this.mssg = r;
        this.getAll();
        alertify.success(this.mssg.message);
      }, error => {
        alertify.error(error.error.message);
      });
    }, function () {

    })
  }
}
