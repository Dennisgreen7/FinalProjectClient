import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logo: string = "../assets/images/Logo.png";
  constructor() { }

  ngOnInit(): void {
  }

}
