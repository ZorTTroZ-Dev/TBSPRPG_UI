import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';
import {confirmPasswordValidator} from '../../../directives/password-validator.directive';
import {User} from '../../../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.email, Validators.required]),
    password: new UntypedFormControl('', Validators.required),
    confirmPassword: new UntypedFormControl('', Validators.required)
  }, {validators: confirmPasswordValidator});
  private subscriptions: Subscription = new Subscription();
  registrationFailed: boolean;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  fieldInvalid(name: string): boolean {
    return this.registerForm.get(name).invalid
      && (this.registerForm.get(name).dirty || this.registerForm.get(name).touched);
  }

  emailInvalid(): boolean {
    return this.fieldInvalid('email');
  }

  passwordInvalid(): boolean {
    return this.fieldInvalid('password');
  }

  confirmPasswordInvalid(): boolean {
    return ((this.registerForm.errors && this.registerForm.errors.confirmPassword) || this.confirmPassword.invalid)
    && (this.confirmPassword.dirty || this.confirmPassword.touched);
  }

  register(): void {
    const registrationData = this.registerForm.value;
    this.registrationFailed = false;
    this.subscriptions.add(
      this.userService.register(registrationData).subscribe(
        user => {
          if (user !== null) {
            this.user = user;
            document.getElementById('openVerifyRegistrationModal').click();
          } else {
            this.registerForm.reset();
            this.registrationFailed = true;
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
