import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BaseService} from './base.service';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LUA_SCRIPT_TYPE, Script} from '../models/script';
import {NIL} from 'uuid';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ScriptService extends BaseService {
  private scriptsUrl: string;

  constructor(http: HttpClient, ) {
    super(http);
    this.scriptsUrl = this.getBaseUrl() + '/api/scripts';
  }

  createNewScript(adventureId: string): Script {
    return {
      id: NIL,
      name: 'new script',
      adventureId,
      content: 'code here',
      includes: [],
      type: LUA_SCRIPT_TYPE
    };
  }

  createScriptFormGroup(script: Script): UntypedFormGroup {
    const formGroup = new UntypedFormGroup( {
      id: new UntypedFormControl(''),
      name: new UntypedFormControl(''),
      adventureId: new UntypedFormControl(''),
      content: new UntypedFormControl(''),
      type: new UntypedFormControl(''),
      includes: new UntypedFormControl('')
    });
    formGroup.setValue(script);
    return formGroup;
  }

  getScriptsForAdventure(adventureId: string): Observable<Script[]> {
    return this.http.get<Script[]>(this.scriptsUrl + '/adventure/' + adventureId)
      .pipe(
        catchError(this.handleError<Script[]>('getScriptsForAdventure', null))
      );
  }

  updateScript(scriptData: any): Observable<any> {
    return this.http.put<any>(this.scriptsUrl, {
      script: scriptData
    }).pipe(
      catchError(this.handleError<any>('updateScript', null))
    );
  }

  deleteScript(script: Script): Observable<any> {
    return this.http.delete(this.scriptsUrl + '/' + script.id)
      .pipe(
        catchError(this.handleError<any>('deleteScript', null))
      );
  }
}
