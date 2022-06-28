import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Source} from '../models/source';
import {catchError} from 'rxjs/operators';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {NIL} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SourcesService extends BaseService {
  private readonly sourcesUrl: string;

  constructor(http: HttpClient, ) {
    super(http);
    this.sourcesUrl = this.getBaseUrl() + '/api/sources';
  }

  createFormGroupForSource(source: Source): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl(''),
      key: new UntypedFormControl(''),
      adventureId: new UntypedFormControl(''),
      text: new UntypedFormControl(''),
      language: new UntypedFormControl(''),
      scriptId: new UntypedFormControl('')
    });
    if (source !== null) {
      formGroup.setValue(source);
    }
    return formGroup;
  }

  getSourceForAdventureForKey(adventureId: string,
                              key: string, language: string): Observable<Source> {
    const options = {
      params: new HttpParams()
        .set('key', key)
        .set('language', language)
    };
    let sourceUrl = this.sourcesUrl;
    if (adventureId !== NIL) {
      sourceUrl += '/adventure/' + adventureId;
    }
    return this.http.get<Source>(sourceUrl, options)
      .pipe(
        catchError(this.handleError<Source>('getSourceForAdventureForKey', null))
      );
  }

  getProcessedSourceForAdventureForKey(adventureId: string,
                                       key: string, language: string): Observable<Source> {
    const options = {
      params: new HttpParams()
        .set('key', key)
        .set('language', language)
    };
    let sourceUrl = this.sourcesUrl;
    if (adventureId !== NIL) {
      sourceUrl += '/adventure/' + adventureId + '/processed';
    }
    return this.http.get<Source>(sourceUrl, options)
      .pipe(
        catchError(this.handleError<Source>('getProcessedSourceForAdventureForKey', null))
      );
  }
}
