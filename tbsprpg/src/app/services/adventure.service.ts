import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Adventure } from '../models/adventure';
import { BaseService } from './base.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdventureService extends BaseService{
  private adventuresUrl = '/api/adventures';

  constructor(private http: HttpClient,) { 
    super();
  }

  getAdventures() : Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.adventuresUrl)
    .pipe(
      catchError(this.handleError<Adventure[]>('getAdventures', []))
    );
  }

  getAdventureByName(name: string) : Observable<Adventure> {
    return this.http.get<Adventure>(this.adventuresUrl + '/' + name)
    .pipe(
      catchError(this.handleError<Adventure>('getAdventureByName', null))
    );
  }
}
