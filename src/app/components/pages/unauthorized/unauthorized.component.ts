import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  logo: string = "../assets/images/401.png";
  activeUser: any = { usersFullName: localStorage.getItem('name'), usersRole: localStorage.getItem('role'), usersId: localStorage.getItem('id') };
  constructor() { }

  ngOnInit(): void {
  }

}
