import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Route} from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class RoutesService extends BaseService{
  private routesUrl = '/api/routes';

  constructor(http: HttpClient, ) {
    super(http);
  }

  getRoutesForLocation(locationId: string): Observable<Route[]> {
    return this.http.get<Route[]>(this.routesUrl + '/location/' + locationId)
      .pipe(
        catchError(this.handleError<Route[]>('getRoutesForLocation', null))
      );
  }

  updateRoutes(routeData: any): Observable<any> {
    return this.http.put<any>(this.routesUrl, routeData).pipe(
      catchError(this.handleError<any>('updateRoutes', null))
    );
  }
}
