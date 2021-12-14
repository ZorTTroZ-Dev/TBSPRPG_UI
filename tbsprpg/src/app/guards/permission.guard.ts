import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const user = this.userService.getUser();
    if (user === null) {
      return this.router.parseUrl('/login');
    }
    const permissions = route.data.permissions;
    if ((permissions.length > 0 && user.permissions === null)
      || permissions.filter(perm => !user.permissions.includes(perm)).length > 0) {
      return this.router.parseUrl('/adventure-explorer');
    } else {
      return true;
    }
  }
}

export const PERMISSION_ADVENTURE_EDIT = 'adventure-edit';
