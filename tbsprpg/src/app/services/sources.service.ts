import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Source} from '../models/source';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SourcesService extends BaseService {
  private sourcesUrl = '/api/sources';

  constructor(http: HttpClient, ) {
    super(http);
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
