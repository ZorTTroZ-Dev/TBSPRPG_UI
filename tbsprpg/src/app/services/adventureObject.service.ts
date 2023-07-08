import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BaseService} from './base.service';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AdventureObject, GENERIC_ADVENTURE_OBJECT_TYPE} from '../models/adventureObject';
import {NIL} from 'uuid';
import {FormControl, FormGroup} from '@angular/forms';

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
      type: GENERIC_ADVENTURE_OBJECT_TYPE
    };
  }

  createAdventureObjectFormGroup(adventureObject: AdventureObject): FormGroup {
    const formGroup = new FormGroup( {
      id: new FormControl<string>(''),
      name: new FormControl<string>(''),
      adventureId: new FormControl<string>(''),
      description: new FormControl<string>(''),
      type: new FormControl<string>('')
    });
    formGroup.setValue(adventureObject);
    return formGroup;
  }

  getAdventureObjectsForAdventure(adventureId: string): Observable<AdventureObject[]> {
    return this.http.get<AdventureObject[]>(this.adventureObjectsUrl + '/adventure/' + adventureId)
      .pipe(
        catchError(this.handleError<AdventureObject[]>('getScriptsForAdventure', null))
      );
  }
  //
  // updateScript(scriptData: any): Observable<any> {
  //   return this.http.put<any>(this.scriptsUrl, {
  //     script: scriptData
  //   }).pipe(
  //     catchError(this.handleError<any>('updateScript', null))
  //   );
  // }
  //
  // deleteScript(script: Script): Observable<any> {
  //   return this.http.delete(this.scriptsUrl + '/' + script.id)
  //     .pipe(
  //       catchError(this.handleError<any>('deleteScript', null))
  //     );
  // }
}
