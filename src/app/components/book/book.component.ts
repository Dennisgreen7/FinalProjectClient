import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book/book.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  headerColor = "silver";
  displayedColumns: string[] = ['id', 'name', 'author', 'language', 'genre', 'year', 'pages', 'copys', 'action'];
  dataSource = new MatTableDataSource<Book>();
  empdata: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private _bookService: BookService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll() {
    this._bookService.getBooks().subscribe(result => {
      this.empdata = result;
      console.log(result);

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
