import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Content} from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService extends BaseService {
  private contentUrl = '/api/content';

  constructor(private http: HttpClient, ) {
    super();
  }

  getLatestContentForGame(gameId: string): Observable<Content> {
    return this.http.get<Content>(this.contentUrl + '/latest/' + gameId)
      .pipe(
        catchError(this.handleError<Content>('getLatestContentForGame', null))
      );
  }

  getLastContentForGame(gameId: string, count: number): Observable<Content> {
    return this.http.get<Content>(this.contentUrl + '/filter/' + gameId + '?direction=b&count=' + count)
      .pipe(
        catchError(this.handleError<Content>('getLastContentForGame', null))
      );
  }
}
