import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Route} from '../models/route';
import {FormControl, FormGroup} from '@angular/forms';
import {NIL} from 'uuid';
import {Source} from '../models/source';
import {SourcesService} from './sources.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesService extends BaseService{
  private routesUrl = '/api/routes';
  public routeSourceFormGroupName = 'source';
  public routeSourceSuccessFormGroupName = 'successSource';

  constructor(http: HttpClient,
              private sourcesService: SourcesService) {
    super(http);
    this.routesUrl = this.getBaseUrl() + '/api/routes';
  }

  createNewRoute(initialLocationId: string): Route {
    return {
      id: NIL,
      name: 'new route',
      sourceKey: NIL,
      routeTakenSourceKey: NIL,
      locationId: initialLocationId,
      destinationLocationId: NIL,
      timeStamp: 0,
      source: '',
      routeTakenScriptId: null
    };
  }

  createFormGroupForRoute(route: Route): FormGroup {
    return new FormGroup({
      id: new FormControl<string>(route.id),
      name: new FormControl<string>(route.name),
      sourceKey: new FormControl<string>(route.sourceKey),
      routeTakenSourceKey: new FormControl<string>(route.routeTakenSourceKey),
      locationId: new FormControl<string>(route.locationId),
      destinationLocationId: new FormControl<string>(route.destinationLocationId),
      newDestinationLocationName: new FormControl<string>(''),
      routeTakenScriptId: new FormControl<string>(route.routeTakenScriptId)
    });
  }

  createFormGroupForRouteWithSource(route: Route, sourceKey: Source, successSourceKey: Source): FormGroup {
    return new FormGroup({
      route: this.createFormGroupForRoute(route),
      [this.routeSourceFormGroupName]: this.sourcesService.createFormGroupForSource(sourceKey),
      [this.routeSourceSuccessFormGroupName]: this.sourcesService.createFormGroupForSource(successSourceKey)
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

  getRoutesForAdventure(adventureId: string): Observable<Route[]> {
    return this.http.get<Route[]>(this.routesUrl + '/adventure/' + adventureId)
      .pipe(
        catchError(this.handleError<Route[]>('getRoutesForAdventure', null))
      );
  }

  deleteRoute(route: Route): Observable<any> {
    return this.http.delete(this.routesUrl + '/' + route.id)
      .pipe(
        catchError(this.handleError<any>('deleteRoute', null))
      );
  }
}
