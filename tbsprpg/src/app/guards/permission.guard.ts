import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
class PermissionGuardService  {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const permissions = route.data.permissions;
    if (this.userService.userHasPermissions(permissions)) {
      return true;
    }
    return this.router.parseUrl('/adventure-explorer');
  }
}

export const PermissionGuard: CanActivateFn = (next: ActivatedRouteSnapshot): boolean|UrlTree => {
  return inject(PermissionGuardService).canActivate(next);
};

export const PERMISSION_ADVENTURE_EDIT = 'adventure-edit';
