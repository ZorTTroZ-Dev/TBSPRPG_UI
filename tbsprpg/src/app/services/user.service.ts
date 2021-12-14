import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

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

  authenticate(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.userUrl + '/authenticate', {
      username: email,
      password
    }, this.httpOptions).pipe(
      tap(usr => {
        this.setAuthToken(usr.token);
        this.setUserId(usr.id);
        this.setUser(usr);
      })
    );
  }
}
