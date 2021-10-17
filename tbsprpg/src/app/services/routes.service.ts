import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Source} from '../models/source';
import {catchError} from 'rxjs/operators';
import {Route} from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class RoutesService extends BaseService{
  private routesUrl = '/api/routes';

  constructor(http: HttpClient, ) {
    super(http);
  }

  getRoutesForLocation(locationId: string): Observable<Route[]> {
    return this.http.get<Route[]>(this.routesUrl + '/location/' + locationId)
      .pipe(
        catchError(this.handleError<Route[]>('getRoutesForLocation', null))
      );
  }
}
