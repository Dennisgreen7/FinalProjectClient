import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre/genre.service';
import { GenreDialogComponent } from '../../dialogs/genre-dialog/genre-dialog.component';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  headerColor = "silver";
  displayedColumns: string[] = ['genreId', 'genreName', 'action'];
  dataSource = new MatTableDataSource<Genre>();
  empdata: any;
  mssg: any;
  activeUser: any = { usersFullName: localStorage.getItem('name'), usersRole: localStorage.getItem('role'), usersId: localStorage.getItem('id'), };
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private _genreService: GenreService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this._genreService.getGenres().subscribe(result => {
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
    const _dialog = this.dialog.open(GenreDialogComponent, {
      width: '500px',
      data: {
        id: id
      }
    });

    _dialog.afterClosed().subscribe(r => {
      this.getAll();
    });
  }

  editGenre(id: any) {
    this.openDialog(id);
  }

  removeGenre(id: any) {
    alertify.confirm("Remove Genre", "do you want to remove this genre?", () => {
      this._genreService.deleteGenre(id).subscribe(r => {
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
