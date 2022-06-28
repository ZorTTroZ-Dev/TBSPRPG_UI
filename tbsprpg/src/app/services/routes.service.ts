import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Route} from '../models/route';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
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

  createFormGroupForRoute(route: Route): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(route.id),
      name: new UntypedFormControl(route.name),
      sourceKey: new UntypedFormControl(route.sourceKey),
      routeTakenSourceKey: new UntypedFormControl(route.routeTakenSourceKey),
      locationId: new UntypedFormControl(route.locationId),
      destinationLocationId: new UntypedFormControl(route.destinationLocationId),
      newDestinationLocationName: new UntypedFormControl(''),
      routeTakenScriptId: new UntypedFormControl(route.routeTakenScriptId)
    });
  }

  createFormGroupForRouteWithSource(route: Route, sourceKey: Source, successSourceKey: Source): UntypedFormGroup {
    return new UntypedFormGroup({
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
}
