import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Adventure } from '../models/adventure';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {
  private adventuresUrl = '/api/adventures';

  constructor(private http: HttpClient,) { }

  getAdventures() : Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.adventuresUrl)
    .pipe(
      catchError(this.handleError<Adventure[]>('getAdventures', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
