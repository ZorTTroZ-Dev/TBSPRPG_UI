import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hide : boolean;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register() : void {
    //post to the users service to create a new user
    //everything goes ok go to the console
    this.router.navigate(['/console', {}]);
  }
}
