import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Location} from '../models/location';
import {FormControl, FormGroup} from '@angular/forms';
import {SourcesService} from './sources.service';
import {Source} from '../models/source';
import {NIL} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService{
  private locationUrl: string;

  constructor(http: HttpClient, private sourcesService: SourcesService) {
    super(http);
    this.locationUrl = this.getBaseUrl() + '/api/locations';
  }

  createNewLocation(adventureId: string): Location {
    return {
      id: NIL,
      name: 'new location',
      adventureId,
      sourceKey: NIL,
      initial: false,
      final: false,
      enterScriptId: null,
      exitScriptId: null
    };
  }

  createFormGroupForLocation(location: Location): FormGroup {
    const formGroup = new FormGroup( {
      id: new FormControl<string>(''),
      name: new FormControl<string>(''),
      initial: new FormControl<boolean>(false),
      final: new FormControl<boolean>(false),
      sourceKey: new FormControl<string>(''),
      adventureId: new FormControl<string>(''),
      enterScriptId: new FormControl<string>(''),
      exitScriptId: new FormControl<string>('')
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
    return this.http.get<Location[]>(this.locationUrl + '/adventure/' + adventureId)
      .pipe(
        catchError(this.handleError<Location[]>('getLocationsForAdventure', null))
      );
  }

  updateLocation(locationData: any): Observable<any> {
    return this.http.put<any>(this.locationUrl, locationData).pipe(
      catchError(this.handleError<any>('updateLocation', null))
    );
  }

  getLocationById(locationId: string): Observable<Location> {
    return this.http.get<Location>(this.locationUrl + '/' + locationId)
      .pipe(
        catchError(this.handleError<Location>('getLocationById', null))
      );
  }
}
