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
  private sourcesUrl = '/api/sources';

  constructor(http: HttpClient, ) {
    super(http);
  }

  createFormGroupForSource(source: Source): FormGroup {
    if (source !== null) {
      return new FormGroup({
        id: new FormControl(source.id),
        name: new FormControl(source.name),
        key: new FormControl(source.key),
        adventureId: new FormControl(source.adventureId),
        text: new FormControl(source.text),
        language: new FormControl(source.language)
      });
    }
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      key: new FormControl(''),
      adventureId: new FormControl(''),
      text: new FormControl(''),
      language: new FormControl('')
    });
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
