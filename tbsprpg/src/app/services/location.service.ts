import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Route} from '../models/route';
import {catchError} from 'rxjs/operators';
import {Location} from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService{
  private locationUrl = '/api/locations';

  constructor(http: HttpClient) {
    super(http);
  }

  getLocationsForAdventure(adventureId: string): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationUrl + '/' + adventureId)
      .pipe(
        catchError(this.handleError<Route[]>('getLocationsForAdventure', null))
      );
  }
}
