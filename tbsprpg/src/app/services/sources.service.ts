import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Source} from '../models/source';
import {catchError} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SourcesService extends BaseService {
  private sourcesUrl: string;

  constructor(http: HttpClient, ) {
    super(http);
    this.sourcesUrl = this.getBaseUrl() + '/api/sources';
  }

  createFormGroupForSource(source: Source): FormGroup {
    const formGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      key: new FormControl(''),
      adventureId: new FormControl(''),
      text: new FormControl(''),
      language: new FormControl('')
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
    return this.http.get<Source>(this.sourcesUrl + '/adventure/' + adventureId, options)
      .pipe(
        catchError(this.handleError<Source>('getSourceForAdventureForKey', null))
      );
  }
}
