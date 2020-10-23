import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  email : string;

  constructor() { }

  ngOnInit(): void {
  }

  getStarted(): void {
    //check if we have an account for this email
    //if so go to a login screen
    //else go to a registration page
  }
}
