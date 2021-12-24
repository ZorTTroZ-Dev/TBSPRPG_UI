import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../../services/user.service';
import {PERMISSION_ADVENTURE_EDIT} from '../../../guards/permission.guard';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(false)
  });
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    const loginData = this.loginForm.value;
    this.subscriptions.add(
      this.userService.authenticate(loginData.email, loginData.password).subscribe(
        user => {
          if (user.permissions && user.permissions.includes(PERMISSION_ADVENTURE_EDIT)) {
            this.router.navigate(['/adventure', {}]);
          } else {
            this.router.navigate(['/adventure-explorer', {}]);
          }
        }, () => {
          // authentication failed; either they entered the wrong email address or password
          this.router.navigate(['/signin-failed', {}]);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
