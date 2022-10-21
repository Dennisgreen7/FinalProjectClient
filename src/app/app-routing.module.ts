import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoursComponent } from './components/authors/authorscomponent';
import { GenreComponent } from './components/genre/genre.component';
import { BookComponent } from './components/book/book.component';
const routes: Routes = [
  { path: 'authors', component: AuthoursComponent },
  { path: 'genres', component: GenreComponent },
  { path: 'books', component: BookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
