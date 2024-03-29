import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Content} from '../models/content';
import {Source} from '../models/source';

@Injectable({
  providedIn: 'root'
})
export class ContentService extends BaseService {
  private contentUrl: string;

  constructor(http: HttpClient, ) {
    super(http);
    this.contentUrl = this.getBaseUrl() + '/api/contents';
  }

  getContentForGameAfterPosition(gameId: string, currentPosition: number): Observable<Content> {
    return this.http.get<Content>(this.contentUrl + '/' + gameId + '/after/' + currentPosition)
      .pipe(
        catchError(this.handleError<Content>('getLatestContentForGame', null))
      );
  }

  getLastContentForGame(gameId: string, count: number): Observable<Content> {
    return this.http.get<Content>(this.contentUrl + '/' + gameId + '/filter?direction=b&count=' + count)
      .pipe(
        catchError(this.handleError<Content>('getLastContentForGame', null))
      );
  }

  getSourceForSourceKey(gameId: string, sourceKey: string): Observable<Source> {
    return this.http.get<Source>(this.contentUrl + '/' + gameId + '/text/' + sourceKey)
      .pipe(
        catchError(this.handleError<Source>('getSourceForSourceKey', null))
      );
  }

  getProcessedSourceForSourceKey(gameId: string, sourceKey: string): Observable<Source> {
    return this.http.get<Source>(this.contentUrl + '/' + gameId + '/text/' + sourceKey + '/processed')
      .pipe(
        catchError(this.handleError<Source>('getProcessedSourceForSourceKey', null))
      );
  }
}
