import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  email : string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getStarted(): void {
    //check if we have an account for this email, use a user service
    //if so go to a login screen
    //else go to a registration page
    this.router.navigate(['/login', {}]);
  }
}
