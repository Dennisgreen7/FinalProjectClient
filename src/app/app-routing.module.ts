import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoursComponent } from './components/pages/authors/authorscomponent';
import { GenreComponent } from './components/pages/genre/genre.component';
import { BookComponent } from './components/pages/book/book.component';
import { UserComponent } from './components/pages/user/user.component';
import { BorrowComponent } from './components/pages/borrow/borrow.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CustomerBorrowsComponent } from './components/pages/customer-borrows/customer-borrows.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { UnauthorizedComponent } from './components/pages/unauthorized/unauthorized.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'authors', component: AuthoursComponent, canActivate: [RoleGuard] },
  { path: 'genres', component: GenreComponent, canActivate: [RoleGuard] },
  { path: 'books', component: BookComponent, canActivate: [RoleGuard] },
  { path: 'users', component: UserComponent, canActivate: [RoleGuard] },
  { path: 'borrows', component: BorrowComponent, canActivate: [RoleGuard] },
  { path: 'borrow-books', component: ProductsComponent },
  { path: 'cust-borrows', component: CustomerBorrowsComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent },
  { path: '401', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
