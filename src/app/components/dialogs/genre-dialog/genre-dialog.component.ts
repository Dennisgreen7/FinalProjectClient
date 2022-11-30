import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenreService } from 'src/app/services/genre/genre.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.css']
})
export class GenreDialogComponent implements OnInit {

  editGenre: any;
  mssg: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private _genreService: GenreService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this._genreService.getGenre(this.data.id).subscribe(response => {
        this.editGenre = response;
        this.genreForm.setValue({
          genreId: this.editGenre.data.genreId,
          genreName: this.editGenre.data.genreName
        });
      });
    }
  }

  genreForm = this.builder.group({
    genreId: this.builder.control({ value: '', disabled: true }),
    genreName: this.builder.control('', [Validators.required,Validators.pattern('^[A-Z][A-Za-z\s]*$')])

  });

  saveGenre() {
    if (this.genreForm.valid) {
      const editId = this.genreForm.getRawValue().genreId;
      if (editId != '' && editId != null) {
        this._genreService.updateGenre(this.genreForm.getRawValue()).subscribe(response => {
          this.mssg = response;
          alertify.success(this.mssg.message);
          this.closeDialog();
        }, error => {
          alertify.error(error.error.message);
        });
      }
      else {
        this._genreService.createGenre(this.genreForm.value).subscribe(response => {
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
