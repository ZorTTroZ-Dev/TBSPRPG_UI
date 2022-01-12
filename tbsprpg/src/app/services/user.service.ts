import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

import { Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {BaseService} from './base.service';
import {PERMISSION_ADVENTURE_EDIT} from '../guards/permission.guard';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private userUrl: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(http: HttpClient) {
    super(http);
    this.userUrl = this.getBaseUrl() + '/api/users';
  }

  getAuthToken(): string {
    return sessionStorage.getItem('jwtToken');
  }

  setAuthToken(token: string): void {
    sessionStorage.setItem('jwtToken', token);
  }

  getUserId(): string {
    return sessionStorage.getItem('userId');
  }

  setUserId(userId: string): void {
    sessionStorage.setItem('userId', userId);
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  setUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  userHasPermissions(permissions: string[]): boolean {
    const user = this.getUser();
    return !(user === null
      || (permissions.length > 0 && user.permissions === null)
      || permissions.filter(perm => !user.permissions.includes(perm)).length > 0);
  }

  getLandingPage(user: User): string {
    if (user.permissions && user.permissions.includes(PERMISSION_ADVENTURE_EDIT)) {
      return '/adventure';
    } else {
      return '/adventure-explorer';
    }
  }

  authenticate(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.userUrl + '/authenticate', {
      email,
      password
    }, this.httpOptions).pipe(
      tap(usr => {
        this.setAuthToken(usr.token);
        this.setUserId(usr.id);
        this.setUser(usr);
      })
    );
  }

  register(registrationData: any): Observable<User> {
    return this.http.post<User>(this.userUrl + '/register', registrationData).pipe(
      catchError(this.handleError<User>('register', null))
    );
  }

  registerVerify(userId: string, registrationKey: string): Observable<User> {
    return this.http.post<User>(this.userUrl + '/register/verify', {
      userId,
      registrationKey
    }, this.httpOptions).pipe(
      tap(user => {
        this.setAuthToken(user.token);
        this.setUserId(user.id);
        this.setUser(user);
      }),
      catchError(this.handleError<User>('register/verify', null))
    );
  }

  registerResend(userId: string): Observable<User> {
    return this.http.post<User>(this.userUrl + '/register/resend', {
      userId
    }, this.httpOptions).pipe(
      catchError(this.handleError<User>('register/resend', null))
    );
  }
}
