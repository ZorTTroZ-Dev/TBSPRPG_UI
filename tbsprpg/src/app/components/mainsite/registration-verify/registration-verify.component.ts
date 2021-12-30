import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';

@Component({
  selector: 'app-registration-verify',
  templateUrl: './registration-verify.component.html',
  styleUrls: ['./registration-verify.component.scss']
})
export class RegistrationVerifyComponent implements OnInit {
  @Input() user: User;
  verificationForm = new FormGroup({
    code: new FormControl('', Validators.required)
  });

  constructor() { }

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

  verify(): void {
    console.log(this.user);
  }
}
