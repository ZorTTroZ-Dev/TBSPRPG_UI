import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Source} from '../models/source';
import {catchError} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
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

  createFormGroupForSource(source: Source): FormGroup {
    const formGroup = new FormGroup({
      id: new FormControl<string>(''),
      name: new FormControl<string>(''),
      key: new FormControl<string>(''),
      adventureId: new FormControl<string>(''),
      text: new FormControl<string>(''),
      language: new FormControl<string>(''),
      scriptId: new FormControl<string>('')
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

  getAllSourceForAdventure(adventureId: string): Observable<Source[]> {
    let sourceUrl = this.sourcesUrl;
    if (adventureId !== NIL) {
      sourceUrl += '/adventure/' + adventureId;
    }
    return this.http.get<Source[]>(sourceUrl)
      .pipe(
        catchError(this.handleError<Source[]>('getAllSourceForAdventure', null))
      );
  }
}
