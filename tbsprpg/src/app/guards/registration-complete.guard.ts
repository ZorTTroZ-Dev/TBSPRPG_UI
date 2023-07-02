import {inject, Injectable} from '@angular/core';
import {CanActivateFn, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
class RegistrationCompleteGuardService  {
  constructor(private userService: UserService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.getUser().registrationComplete) {
      document.getElementById('openVerifyRegistrationModal').click();
    }
    return true;
  }
}

export const RegistrationCompleteGuard: CanActivateFn = ():
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  return inject(RegistrationCompleteGuardService).canActivate();
};
