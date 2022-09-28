import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {Route} from '../../../../models/route';
import {RoutesService} from '../../../../services/routes.service';
import {map, tap} from 'rxjs/operators';
import {NotificationService} from '../../../../services/notification.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {Location} from '../../../../models/location';
import {LocationService} from '../../../../services/location.service';
import {NIL} from 'uuid';

@Component({
  selector: 'app-ad-routes',
  templateUrl: './ad-routes.component.html',
  styleUrls: ['./ad-routes.component.scss']
})
export class AdRoutesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  @Output() sidebarLocationChange = new EventEmitter<string>();
  @Output() adventureRouteChange = new EventEmitter<Route>();
  routes: Route[];
  locationMap: Map<string, Location>;
  routeObservable: Subject<string>;
  locationObservable: Subject<string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private routesService: RoutesService,
              private locationsService: LocationService,
              private notificationService: NotificationService) {
    this.routes = [];
    this.routeObservable = new Subject<string>();
    this.locationObservable = new Subject<string>();
    this.locationMap = new Map<string, Location>();

    this.subscriptions.add(
      this.locationObservable.pipe(
        map(locationId => this.locationsService.getLocationById(locationId)),
        tap(response => {
          response.subscribe(location => {
            this.locationMap.set(location.id, location);
          });
        })
      ).subscribe()
    );

    this.subscriptions.add(
      this.routeObservable.pipe(
        map(adventureId => this.routesService.getRoutesForAdventure(adventureId)),
        tap(response => {
          response.subscribe(routes => {
            this.routes = routes;
            for (const route of this.routes) {
              if (!this.locationMap.has(route.locationId)) {
                this.locationMap.set(route.locationId, null);
                this.locationObservable.next(route.locationId);
              }
              if (!this.locationMap.has(route.destinationLocationId)) {
                this.locationMap.set(route.destinationLocationId, null);
                this.locationObservable.next(route.destinationLocationId);
              }
            }
          });
        })
      ).subscribe()
    );
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.routeObservable.next(this.adventure.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateRoute(route: Route): void {
    this.sidebarLocationChange.emit('route-edit');
    this.adventureRouteChange.emit(route);
  }

  newRoute(): void {
    this.sidebarLocationChange.emit('route-edit');
    this.adventureRouteChange.emit(this.routesService.createNewRoute(NIL));
  }

  deleteRoute(route: Route): void {
    this.subscriptions.add(
      this.routesService.deleteRoute(route).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'route deleted'
        };
        this.notificationService.postNotification(notification);
        this.routeObservable.next(this.adventure.id);
      })
    );
  }
}
