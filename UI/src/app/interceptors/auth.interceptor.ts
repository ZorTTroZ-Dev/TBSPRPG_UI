import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  //insert the authorization bearer token for each request to the back end
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwttoken = this.userService.getAuthToken();
    if(jwttoken) {
      const clonedReq = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + jwttoken)
      });
      return next.handle(clonedReq);
    }
    return next.handle(request);
  }
}
