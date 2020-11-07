import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide : boolean;
  loginError: boolean;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loginError = false;
  }

  get email() { return this.loginForm.get('email'); }

  login(): void {
    var loginData = this.loginForm.value;
    this.userService.authenticate(loginData.email, loginData.password).subscribe(
      usr => {
        this.router.navigate(['/console', {}]);
      },
      error => {
        this.loginError = true;
      }
    );
  }
}
