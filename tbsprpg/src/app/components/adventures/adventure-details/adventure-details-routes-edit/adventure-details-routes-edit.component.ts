import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {forkJoin, Subject, Subscription} from 'rxjs';
import {RoutesService} from '../../../../services/routes.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Route} from '../../../../models/route';
import {SourcesService} from '../../../../services/sources.service';
import {tap} from 'rxjs/operators';
import {Source} from '../../../../models/source';
import {LocationService} from '../../../../services/location.service';

@Component({
  selector: 'app-adventure-details-routes-edit',
  templateUrl: './adventure-details-routes-edit.component.html',
  styleUrls: ['./adventure-details-routes-edit.component.scss']
})
export class AdventureDetailsRoutesEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location: Location;
  private subscriptions: Subscription = new Subscription();
  routeLoaded: Subject<Route>;
  routesFormArray: FormGroup[] = [];
  routes: Route[] = [];
  routeSourceLabel = 'Button Text';
  routeSourceFormGroupName = 'source';
  routeSourceSuccessLabel = 'Route Taken';
  routeSourceSuccessFormGroupName = 'successSource';
  locations: Location[] = [];

  constructor(private routesService: RoutesService,
              private sourcesService: SourcesService,
              private locationsService: LocationService) {
    this.routeLoaded = new Subject<Route>();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.routeLoaded.pipe(
        tap(route => {
          const sourceRequest = this.sourcesService.getSourceForAdventureForKey(this.location.adventureId, route.sourceKey, 'en');
          const successKeySourceRequest = this.sourcesService.getSourceForAdventureForKey(this.location.adventureId, route.successSourceKey, 'en');
          forkJoin([sourceRequest, successKeySourceRequest]).subscribe(results => {
            this.routes.push(route);
            this.addRouteToForm(route, results, [this.routeSourceFormGroupName, this.routeSourceSuccessFormGroupName]);
          });
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addRouteToForm(route: Route, source: Source[], sourceFieldName: string[]): void {
    this.routesFormArray.push(new FormGroup({
      route: new FormGroup({
        id: new FormControl(route.id),
        name: new FormControl(route.name),
        sourceKey: new FormControl(route.sourceKey),
        successSourceKey: new FormControl(route.successSourceKey),
        locationId: new FormControl(route.locationId),
        destinationLocationId: new FormControl(route.destinationLocationId),
        newDestinationLocationName: new FormControl('')
      }),
      [sourceFieldName[0]]: new FormGroup({
        id: new FormControl(source[0].id),
        name: new FormControl(source[0].name),
        key: new FormControl(source[0].key),
        adventureId: new FormControl(source[0].adventureId),
        text: new FormControl(source[0].text),
        language: new FormControl(source[0].language)
      }),
      [sourceFieldName[1]]: new FormGroup({
        id: new FormControl(source[1].id),
        name: new FormControl(source[1].name),
        key: new FormControl(source[1].key),
        adventureId: new FormControl(source[1].adventureId),
        text: new FormControl(source[1].text),
        language: new FormControl(source[1].language)
      })
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location.currentValue) {
      this.subscriptions.add(
        this.routesService.getRoutesForLocation(this.location.id).subscribe(routes => {
          routes.forEach(route => {
            this.routeLoaded.next(route);
          });
        })
      );
      this.subscriptions.add(
        this.locationsService.getLocationsForAdventure(this.location.adventureId).subscribe(locations => {
          this.locations = locations;
        })
      );
    }
  }

  updateRoutes(): void {
    const routesToPut = [];
    for (const value of this.routesFormArray.values()) {
      routesToPut.push(value.value);
    }
    this.subscriptions.add(
      this.routesService.updateRoutes(routesToPut).subscribe(result => {
        console.log(result);
      })
    );
  }
}
