import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthoursComponent } from './components/pages/authors/authorscomponent';
import { NavBarComponent } from './components/sharepage/nav-bar/nav-bar.component';
import { FooterComponent } from './components/sharepage/footer/footer.component';
import { GenreComponent } from './components/pages/genre/genre.component';
import { BookComponent } from './components/pages/book/book.component';
import { UserComponent } from './components/pages/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenreDialogComponent } from './components/dialogs/genre-dialog/genre-dialog.component';
import { AuthorDialogComponent } from './components/dialogs/author-dialog/author-dialog.component';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';
import { BookDialogComponent } from './components/dialogs/book-dialog/book-dialog.component';
import { BorrowComponent } from './components/pages/borrow/borrow.component';
import { BorrowDialogComponent } from './components/dialogs/borrow-dialog/borrow-dialog.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookInfoDialogComponent } from './components/dialogs/book-info-dialog/book-info-dialog.component';
import { BorrowdialogComponent } from './components/dialogs/borrowdialog/borrowdialog.component';
import { CustomerBorrowsComponent } from './components/pages/customer-borrows/customer-borrows.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { UnauthorizedComponent } from './components/pages/unauthorized/unauthorized.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthoursComponent,
    NavBarComponent,
    FooterComponent,
    GenreComponent,
    BookComponent,
    UserComponent,
    GenreDialogComponent,
    AuthorDialogComponent,
    UserDialogComponent,
    BookDialogComponent,
    BorrowComponent,
    BorrowDialogComponent,
    HomeComponent,
    ProductsComponent,
    BookInfoDialogComponent,
    BorrowdialogComponent,
    CustomerBorrowsComponent,
    LoginComponent,
    SignupComponent,
    AboutUsComponent,
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
