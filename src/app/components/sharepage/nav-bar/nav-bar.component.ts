import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  logo: string = "../assets/images/Logo.png";
  isAdmin: boolean = false;
  isLogged: boolean = false;
  userImg: any = localStorage.getItem('userImage');
  @Input() activeUser: any;
  async ngOnChanges(changes: any) {
    if (changes.activeUser.currentValue?.usersRole == "Admin") {
      this.isAdmin = !this.isAdmin;
    }
    if (await this.activeUser != undefined) {
      this.getUserImage();
    }
  }

  constructor(private _authService: AuthService, private router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this.isLogged = this.isLoggedIn();
  }
  async logout() {
    this._authService.signOut();
  }
  login() {
    this.router.navigate(['login']);
  }
  getUserImage() {
    this._userService.getUser(this.activeUser?.usersId).subscribe(result => {
      this.userImg = result;
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
