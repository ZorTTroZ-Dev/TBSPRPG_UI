import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';
import {confirmPasswordValidator} from '../../../directives/password-validator.directive';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: confirmPasswordValidator});
  private subscriptions: Subscription = new Subscription();
  registrationFailed: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

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
    console.log(registrationData);
    this.subscriptions.add(
      this.userService.register(registrationData).subscribe(
        user => {
          if (user !== null) {
            document.getElementById('openVerifyRegistrationModal').click();
          } else {
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
