import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl : string = '/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAuthToken(): string {
    return localStorage.getItem("jwttoken");
  }

  setAuthToken(token: string): void {
    localStorage.setItem("jwttoken", token);
  }

  authenticate(email: string, password: string) : Observable<User> {
    return this.http.post<User>(this.userUrl + '/authenticate', {
      username: email,
      password: password
    }, this.httpOptions).pipe(
      tap(usr => this.setAuthToken(usr.token))
    );
  }
}
