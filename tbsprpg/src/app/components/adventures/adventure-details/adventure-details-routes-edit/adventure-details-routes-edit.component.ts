import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {Subject, Subscription} from 'rxjs';
import {RoutesService} from '../../../../services/routes.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Route} from '../../../../models/route';
import {SourcesService} from '../../../../services/sources.service';
import {tap} from 'rxjs/operators';

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

  constructor(private routesService: RoutesService,
              private sourcesService: SourcesService) {
    this.routeLoaded = new Subject<Route>();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.routeLoaded.pipe(
        tap(route => {
          this.sourcesService.getSourceForAdventureForKey(
            this.location.adventureId,
            route.sourceKey,
            'en').subscribe(source => {
            console.log(source);
          });
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addRouteToForm(route: Route): void {
    this.routesFormArray.push(new FormGroup({
      route: new FormGroup({
        id: new FormControl(route.id),
        name: new FormControl(route.name),
        sourceKey: new FormControl(route.sourceKey),
        successSourceKey: new FormControl(route.successSourceKey),
        locationId: new FormControl(route.locationId),
        destinationLocationId: new FormControl(route.destinationLocationId)
      })
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location.currentValue) {
      this.subscriptions.add(
        this.routesService.getRoutesForLocation(this.location.id).subscribe(routes => {
          this.routes = routes;
          routes.forEach(route => {
            this.addRouteToForm(route);
            this.routeLoaded.next(route);
          });
        })
      );
    }
  }

  // updateRoutes(): void {
  //   console.log(this.routesFormArray);
  // }
}
