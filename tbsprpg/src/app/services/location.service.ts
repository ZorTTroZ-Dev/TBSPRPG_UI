import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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
        catchError(this.handleError<Location[]>('getLocationsForAdventure', null))
      );
  }

  updateLocation(locationData: any): Observable<any> {
    return this.http.post<any>(this.locationUrl, locationData).pipe(
      catchError(this.handleError<any>('updateLocation', null))
    );
  }
}
