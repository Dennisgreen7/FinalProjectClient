import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  activeUser: any = { usersFullName: localStorage.getItem('name'), usersRole: localStorage.getItem('role'), usersId: localStorage.getItem('id') };
  constructor() { }

  ngOnInit(): void {
  }

}
