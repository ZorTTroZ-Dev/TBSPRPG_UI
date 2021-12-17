import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {PERMISSION_ADVENTURE_EDIT} from '../../guards/permission.guard';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(false)
  });
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  getStarted(): void {
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
          this.router.navigate(['/register', {}]);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
