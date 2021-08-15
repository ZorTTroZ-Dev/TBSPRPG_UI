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

  constructor(private http: HttpClient, ) {
    super();
  }

  getRoutesForGame(gameId: string): Observable<Route[]> {
    return this.http.get<Route[]>(this.mapUrl + '/' + gameId + '/routes')
      .pipe(
        catchError(this.handleError<Route[]>('getRoutesForGame', null))
      );
  }
}
