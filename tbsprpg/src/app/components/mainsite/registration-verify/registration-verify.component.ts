import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-verify',
  templateUrl: './registration-verify.component.html',
  styleUrls: ['./registration-verify.component.scss']
})
export class RegistrationVerifyComponent implements OnInit, OnDestroy {
  @Input() user: User;
  verificationForm = new UntypedFormGroup({
    code: new UntypedFormControl('', Validators.required)
  });
  private subscriptions: Subscription = new Subscription();
  verificationFailed: boolean;
  codeResent: boolean;
  codeResendFailed: boolean;

  constructor(private router: Router, private userService: UserService) { }

  get code(): AbstractControl {
    return this.verificationForm.get('code');
  }

  fieldInvalid(name: string): boolean {
    return this.verificationForm.get(name).invalid
      && (this.verificationForm.get(name).dirty || this.verificationForm.get(name).touched);
  }

  codeInvalid(): boolean {
    return this.fieldInvalid('code');
  }

  ngOnInit(): void {
  }

  resendCode(): void {
    this.codeResent = false;
    this.codeResendFailed = false;
    this.subscriptions.add(
      this.userService.registerResend(this.user.id).subscribe(
        user => {
          if (user !== null) {
            this.codeResent = true;
          } else {
            this.codeResendFailed = true;
          }
        }
      )
    );
  }

  verify(): void {
    const verificationFormData = this.verificationForm.value;
    this.verificationFailed = false;
    if (this.user === undefined) {
      this.user = this.userService.getUser();
    }
    this.subscriptions.add(
      this.userService.registerVerify(this.user.id, verificationFormData.code).subscribe(
        user => {
          if (user !== null) {
            document.getElementById('closeVerifyRegistrationModal').click();
            this.router.navigate([
              this.userService.getLandingPage(user), {}
            ]);
          } else {
            this.verificationForm.reset();
            this.verificationFailed = true;
          }
        }
      )
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
