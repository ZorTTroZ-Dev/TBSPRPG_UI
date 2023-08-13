import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BaseService} from './base.service';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AdventureObject, GENERIC_ADVENTURE_OBJECT_TYPE} from '../models/adventureObject';
import {NIL} from 'uuid';
import {FormControl, FormGroup} from '@angular/forms';
import {Location} from '../models/location';

@Injectable({
  providedIn: 'root'
})

export class AdventureObjectService extends BaseService {
  private adventureObjectsUrl: string;

  constructor(http: HttpClient, ) {
    super(http);
    this.adventureObjectsUrl = this.getBaseUrl() + '/api/objects';
  }

  createNewAdventureObject(adventureId: string): AdventureObject {
    return {
      id: NIL,
      name: 'new object',
      description: 'object description',
      adventureId,
      type: GENERIC_ADVENTURE_OBJECT_TYPE,
      locations: []
    };
  }

  createAdventureObjectFormGroup(adventureObject: AdventureObject): FormGroup {
    const formGroup = new FormGroup( {
      id: new FormControl<string>(''),
      name: new FormControl<string>(''),
      adventureId: new FormControl<string>(''),
      description: new FormControl<string>(''),
      type: new FormControl<string>(''),
      locations: new FormControl<Location[]>([])
    });
    formGroup.setValue(adventureObject);
    return formGroup;
  }

  getAdventureObjectsForAdventure(adventureId: string): Observable<AdventureObject[]> {
    return this.http.get<AdventureObject[]>(this.adventureObjectsUrl + '/adventure/' + adventureId)
      .pipe(
        catchError(this.handleError<AdventureObject[]>('getAdventureObjectsForAdventure', null))
      );
  }

  getAdventureObjectsForLocation(locationId: string): Observable<AdventureObject[]> {
    return this.http.get<AdventureObject[]>(this.adventureObjectsUrl + '/location/' + locationId)
      .pipe(
        catchError(this.handleError<AdventureObject[]>('getAdventureObjectsForLocation', null))
      );
  }

  updateAdventureObject(adventureObjectData: any): Observable<any> {
    return this.http.put<any>(this.adventureObjectsUrl, {
      obj: adventureObjectData
    }).pipe(
      catchError(this.handleError<any>('updateAdventureObject', null))
    );
  }

  deleteAdventureObject(adventureObject: AdventureObject): Observable<any> {
    return this.http.delete(this.adventureObjectsUrl + '/' + adventureObject.id)
      .pipe(
        catchError(this.handleError<any>('deleteAdventureObject', null))
      );
  }
}
