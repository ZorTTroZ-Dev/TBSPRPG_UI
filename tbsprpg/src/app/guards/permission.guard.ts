import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
class PermissionGuardService  {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const permissions = route.data.permissions;
    if (this.userService.userHasPermissions(permissions)) {
      return true;
    }
    return this.router.parseUrl('/adventure-explorer');
  }
}

export const PermissionGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree => {
  return inject(PermissionGuardService).canActivate(next, state);
};

export const PERMISSION_ADVENTURE_EDIT = 'adventure-edit';
