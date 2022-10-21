import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre/genre.service';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  headerColor = "silver";
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Genre>();
  empdata: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private _genreService: GenreService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll() {
    this._genreService.getGenres().subscribe(result => {
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
