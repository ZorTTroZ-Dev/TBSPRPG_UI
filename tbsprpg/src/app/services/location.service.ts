import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Location} from '../models/location';
import {FormControl, FormGroup} from '@angular/forms';
import {SourcesService} from './sources.service';
import {Source} from '../models/source';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService{
  private locationUrl: string;

  constructor(http: HttpClient, private sourcesService: SourcesService) {
    super(http);
    this.locationUrl = this.getBaseUrl() + '/api/locations';
  }

  createFormGroupForLocation(location: Location): FormGroup {
    const formGroup = new FormGroup( {
      id: new FormControl(''),
      name: new FormControl(''),
      initial: new FormControl(''),
      sourceKey: new FormControl(''),
      adventureId: new FormControl('')
    });
    formGroup.setValue(location);
    return formGroup;
  }

  createLocationFormGroupWithSource(location: Location, source: Source): FormGroup {
    return new FormGroup({
      location: this.createFormGroupForLocation(location),
      source: this.sourcesService.createFormGroupForSource(source)
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
