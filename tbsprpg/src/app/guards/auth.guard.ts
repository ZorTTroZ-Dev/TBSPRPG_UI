import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

class AuthorizationGuardService  {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean|UrlTree {
    if (this.userService.getAuthToken() !== null) {
      return true;
    }
    return this.router.parseUrl('/');
  }
}

export const AuthGuard: CanActivateFn = (): boolean|UrlTree => {
  return inject(AuthorizationGuardService).canActivate();
};
