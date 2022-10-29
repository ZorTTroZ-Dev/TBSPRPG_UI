import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LocationRoutes} from '../models/locationroutes';
import {ContentRoute} from '../models/contentRoute';

@Injectable({
  providedIn: 'root'
})
export class MapService extends BaseService {
  private mapUrl: string;

  constructor(http: HttpClient, ) {
    super(http);
    this.mapUrl = this.getBaseUrl() + '/api/maps';
  }

  getRoutesForGame(gameId: string): Observable<LocationRoutes> {
    return this.http.get<LocationRoutes>(this.mapUrl + '/' + gameId + '/routes')
      .pipe(
        catchError(this.handleError<LocationRoutes>('getRoutesForGame', null))
      );
  }

  getRoutesForGameAfterTimeStamp(gameId: string, timeStamp: number): Observable<LocationRoutes> {
    return this.http.get<LocationRoutes>(this.mapUrl + '/' + gameId + '/routes/after/' + timeStamp)
      .pipe(
        catchError(this.handleError<LocationRoutes>('getRoutesForGameAfterTimeStamp', null))
      );
  }

  changeLocationViaRoute(gameId: string, routeId: string): Observable<ContentRoute> {
    return this.http.get<ContentRoute>(this.mapUrl + '/' + gameId + '/changelocation/' + routeId)
      .pipe(
        catchError(this.handleError<ContentRoute>('startGame', null))
      );
  }
}
