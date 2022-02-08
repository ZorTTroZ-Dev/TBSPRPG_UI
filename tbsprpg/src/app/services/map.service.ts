import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LocationRoutes} from '../models/locationroutes';

@Injectable({
  providedIn: 'root'
})
export class MapService extends BaseService {
  private mapUrl: string;
  private pollRoutesObservable: Subject<number>;

  constructor(http: HttpClient, ) {
    super(http);
    this.pollRoutesObservable = new Subject<number>();
    this.mapUrl = this.getBaseUrl() + '/api/maps';
  }

  pollRoutes(trigger: number): void {
    this.pollRoutesObservable.next(trigger);
  }

  getPollRoutes(): Observable<number> {
    return this.pollRoutesObservable.asObservable();
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

  changeLocationViaRoute(gameId: string, routeId: string): Observable<any> {
    return this.http.get<any>(this.mapUrl + '/' + gameId + '/changelocation/' + routeId)
      .pipe(
        catchError(this.handleError<any>('startGame', null))
      );
  }
}
