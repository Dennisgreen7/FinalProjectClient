import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book/book.service';
import { AuthorService } from 'src/app/services/author/author.service';
import { GenreService } from 'src/app/services/genre/genre.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent implements OnInit {

  editBook: any;
  authrosDb: any;
  genreDb: any;
  mssg: any
  currentYear:number= new Date().getFullYear();
  constructor(private builder: FormBuilder, private dialog: MatDialog, private _bookService: BookService, private _authorService: AuthorService, private _genreService: GenreService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getAuthors();
    this.getGenres();
    
    if (this.data.id != '' && this.data.id != null) {
      this._bookService.getBook(this.data.id).subscribe(response => {
        this.editBook = response;
        this.bookForm.setValue({
          bookId: this.editBook.data.bookId,
          bookName: this.editBook.data.bookName,
          authorId: this.editBook.data.authorId,
          bookPublishedYear: this.editBook.data.bookPublishedYear,
          genreId: this.editBook.data.genreId,
          bookLanguage: this.editBook.data.bookLanguage,
          bookNumOfPages: this.editBook.data.bookNumOfPages,
          bookCopys: this.editBook.data.bookCopys,
          bookAbout: this.editBook.data.bookAbout
        });
      });
    }
  }

  bookForm = this.builder.group({
    bookId: this.builder.control({ value: '', disabled: true }),
    bookName: this.builder.control('', Validators.required),
    authorId: this.builder.control('', Validators.required),
    bookPublishedYear: this.builder.control('', Validators.required),
    genreId: this.builder.control('', Validators.required),
    bookLanguage: this.builder.control('',[Validators.required,Validators.pattern('^[A-Z][A-Za-z\s]*$')]),
    bookNumOfPages: this.builder.control('', Validators.required),
    bookCopys: this.builder.control('', Validators.required),
    bookAbout: this.builder.control('', Validators.required)
  });

  getAuthors() {
    this._authorService.getAuthors().subscribe(result => {
      this.authrosDb = result;
    });
  }

  getGenres() {
    this._genreService.getGenres().subscribe(result => {
      this.genreDb = result;
    });
  }


  saveBook() {
    if (this.bookForm.valid) {

      const editId = this.bookForm.getRawValue().bookId;

      if (editId != '' && editId != null) {
        this._bookService.updateBook(this.bookForm.getRawValue()).subscribe(response => {
          this.mssg = response;
          alertify.success(this.mssg.message);
          this.closeDialog();
        }, error => {
          alertify.error(error.error.message);
        });
      }
      else {
        this._bookService.createBook(this.bookForm.value).subscribe(response => {
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
