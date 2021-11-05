import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Location} from '../models/location';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService{
  private locationUrl = '/api/locations';

  constructor(http: HttpClient) {
    super(http);
  }

  createFormGroupForLocation(location: Location): FormGroup {
    if (location !== null) {
      return new FormGroup( {
        id: new FormControl(location.id),
        name: new FormControl(location.name),
        initial: new FormControl(location.initial),
        sourceKey: new FormControl(location.sourceKey),
        adventureId: new FormControl(location.adventureId)
      });
    }
    return new FormGroup( {
      id: new FormControl(''),
      name: new FormControl(''),
      initial: new FormControl(''),
      sourceKey: new FormControl(''),
      adventureId: new FormControl('')
    });
  }

  getLocationsForAdventure(adventureId: string): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationUrl + '/' + adventureId)
      .pipe(
        catchError(this.handleError<Location[]>('getLocationsForAdventure', null))
      );
  }

  updateLocation(locationData: any): Observable<any> {
    return this.http.put<any>(this.locationUrl, locationData).pipe(
      catchError(this.handleError<any>('updateLocation', null))
    );
  }
}
