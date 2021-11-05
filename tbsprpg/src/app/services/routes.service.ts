import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Route} from '../models/route';
import {FormControl, FormGroup} from '@angular/forms';
import {NIL} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RoutesService extends BaseService{
  private routesUrl = '/api/routes';

  constructor(http: HttpClient, ) {
    super(http);
  }

  createNewRoute(initialLocationId: string): Route {
    return {
      id: NIL,
      name: 'new route',
      sourceKey: NIL,
      successSourceKey: NIL,
      locationId: initialLocationId,
      destinationLocationId: initialLocationId,
      timeStamp: 0,
      source: ''
    };
  }

  createFormGroupForRoute(route: Route): FormGroup {
    return new FormGroup({
      id: new FormControl(route.id),
      name: new FormControl(route.name),
      sourceKey: new FormControl(route.sourceKey),
      successSourceKey: new FormControl(route.successSourceKey),
      locationId: new FormControl(route.locationId),
      destinationLocationId: new FormControl(route.destinationLocationId),
      newDestinationLocationName: new FormControl('')
    });
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
