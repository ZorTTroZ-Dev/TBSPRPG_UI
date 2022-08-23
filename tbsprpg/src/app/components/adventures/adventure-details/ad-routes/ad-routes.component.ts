import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {Route} from '../../../../models/route';
import {RoutesService} from '../../../../services/routes.service';
import {map, tap} from 'rxjs/operators';
import {NotificationService} from '../../../../services/notification.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {Location} from '../../../../models/location';

@Component({
  selector: 'app-ad-routes',
  templateUrl: './ad-routes.component.html',
  styleUrls: ['./ad-routes.component.scss']
})
export class AdRoutesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  routes: Route[];
  locationMap: Map<string, Location>;
  routeObservable: Subject<string>;
  locationObservable: Subject<string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private routesService: RoutesService,
              private notificationService: NotificationService) {
    this.routes = [];
    this.routeObservable = new Subject<string>();
    this.locationMap = new Map<string, Location>();

    this.subscriptions.add(
      this.locationObservable.subscribe(locationId => {
        console.log(locationId);
      })
    );

    this.subscriptions.add(
      this.routeObservable.pipe(
        map(adventureId => this.routesService.getRoutesForAdventure(adventureId)),
        tap(response => {
          response.subscribe(routes => {
            this.routes = routes;
            for (const route of this.routes) {
              if (!this.locationMap.has(route.locationId)) {
                this.locationObservable.next(route.locationId);
              }
              if (!this.locationMap.has(route.destinationLocationId)) {
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
