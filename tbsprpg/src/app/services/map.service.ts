import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Route} from '../models/route';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService extends BaseService {
  private mapUrl = '/api/maps';

  constructor(http: HttpClient, ) {
    super(http);
  }

  getRoutesForGame(gameId: string): Observable<Route[]> {
    return this.http.get<Route[]>(this.mapUrl + '/' + gameId + '/routes')
      .pipe(
        catchError(this.handleError<Route[]>('getRoutesForGame', null))
      );
  }

  getRoutesForGameAfterTimeStamp(gameId: string, timeStamp: number): Observable<Route[]> {
    return this.http.get<Route[]>(this.mapUrl + '/' + gameId + '/routes/after/' + timeStamp)
      .pipe(
        catchError(this.handleError<Route[]>('getRoutesForGameAfterTimeStamp', null))
      );
  }
}
