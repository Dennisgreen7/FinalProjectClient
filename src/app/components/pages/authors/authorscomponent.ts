import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author/author.service';
import { AuthorDialogComponent } from '../../dialogs/author-dialog/author-dialog.component';
import * as alertify from 'alertifyjs';
import { AnyForUntypedForms } from '@angular/forms';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthoursComponent implements OnInit {
  headerColor = "silver";
  displayedColumns: string[] = ['authorId', 'authorName', 'authorCountry', 'action'];
  dataSource = new MatTableDataSource<Author>();
  empdata: any;
  mssg: any;
  activeUser: any = { usersFullName: localStorage.getItem('name'), usersRole: localStorage.getItem('role'), usersId: localStorage.getItem('id') };
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private _authorService: AuthorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._authorService.getAuthors().subscribe(result => {
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
    const _dialog = this.dialog.open(AuthorDialogComponent, {
      width: '500px',
      data: {
        id: id
      }
    });

    _dialog.afterClosed().subscribe(r => {
      this.getAll();
    });
  }

  editAuthor(id: any) {
    this.openDialog(id);
  }

  removeAuthor(id: any) {
    alertify.confirm("Remove Author", "do you want to remove this author?", () => {
      this._authorService.deleteAuthor(id).subscribe(r => {
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
