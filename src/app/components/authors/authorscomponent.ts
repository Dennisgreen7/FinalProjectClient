import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthoursComponent implements OnInit {
  headerColor ="silver";
  displayedColumns: string[] = ['id', 'name', 'country', 'action'];
  dataSource = new MatTableDataSource<Author>();
  empdata: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private _authorService: AuthorService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll() {
    this._authorService.getAuthors().subscribe(result => {
      this.empdata = result;
      this.dataSource = new MatTableDataSource(this.empdata.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
}
