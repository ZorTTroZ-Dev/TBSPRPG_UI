import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide : boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    //authenticate
    //post to authenticate api endpoint
    //add jwt token to local storage
    //go to the console
    this.router.navigate(['/console', {}]);
  }
}
