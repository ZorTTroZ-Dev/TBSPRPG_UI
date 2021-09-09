import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Adventure } from '../models/adventure';
import { BaseService } from './base.service';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdventureService extends BaseService{
  private adventuresUrl = '/api/adventures';

  constructor(http: HttpClient, ) {
    super(http);
  }

  getAdventures(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.adventuresUrl)
    .pipe(
      catchError(this.handleError<Adventure[]>('getAdventures', []))
    );
  }

  getAdventureByName(name: string): Observable<Adventure> {
    return this.http.get<Adventure>(this.adventuresUrl + '/' + name)
    .pipe(
      catchError(this.handleError<Adventure>('getAdventureByName', null))
    );
  }

  getAdventureById(id: string): Observable<Adventure> {
    return this.http.get<Adventure>(this.adventuresUrl + '/' + id)
      .pipe(
        catchError(this.handleError<Adventure>('getAdventureByName', null))
      );
  }

  getAdventuresCreatedBy(userId: string): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.adventuresUrl + '?CreatedBy=' + userId)
      .pipe(
        catchError(this.handleError<Adventure[]>('getAdventuresCreatedBy', []))
      );
  }
}
