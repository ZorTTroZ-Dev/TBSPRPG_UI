import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean;
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

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  login(): void {
    const loginData = this.loginForm.value;
    this.userService.authenticate(loginData.email, loginData.password).subscribe(
      user => {
        if (user.permissions && user.permissions.includes('adventure_edit')) {
          this.router.navigate(['/adventure', {}]);
        } else {
          this.router.navigate(['/adventure-explorer', {}]);
        }
      },
      error => {
        this.loginError = true;
        console.error(error);
      }
    );
  }
}
