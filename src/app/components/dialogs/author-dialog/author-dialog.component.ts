import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from 'src/app/services/author/author.service';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.css']
})
export class AuthorDialogComponent implements OnInit {
  editAuthor: any;
  mssg: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private _authorService: AuthorService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this._authorService.getAuthor(this.data.id).subscribe(response => {
        this.editAuthor = response;
        this.authorForm.setValue({
          authorId: this.editAuthor.data.authorId,
          authorName: this.editAuthor.data.authorName,
          authorCountry: this.editAuthor.data.authorCountry
        });
      });
    }
  }

  authorForm = this.builder.group({
    authorId: this.builder.control({ value: '', disabled: true }),
    authorName: this.builder.control('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*'), Validators.maxLength(50)]),
    authorCountry: this.builder.control('', [Validators.required, Validators.pattern('^[A-Z][A-Za-z]*$'), Validators.maxLength(50)])

  });

  saveAuthor() {
    if (this.authorForm.valid) {
      const editId = this.authorForm.getRawValue().authorId;
      if (editId != '' && editId != null) {
        this._authorService.updateAuthor(this.authorForm.getRawValue()).subscribe(response => {
          this.mssg = response;
          alertify.success(this.mssg.message);
          this.closeDialog();
        }, error => {
          alertify.error(error.error.message);
        });
      }
      else {
        this._authorService.createAuthor(this.authorForm.value).subscribe(response => {
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
