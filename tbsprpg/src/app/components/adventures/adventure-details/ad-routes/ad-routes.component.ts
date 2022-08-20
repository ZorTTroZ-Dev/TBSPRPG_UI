import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {Route} from '../../../../models/route';
import {RoutesService} from '../../../../services/routes.service';
import {map, tap} from 'rxjs/operators';
import {NotificationService} from '../../../../services/notification.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';

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
  routeObservable: Subject<string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private routesService: RoutesService,
              private notificationService: NotificationService) {
    this.routes = [];
    this.routeObservable = new Subject<string>();

    this.subscriptions.add(
      this.routeObservable.pipe(
        map(adventureId => this.routesService.getRoutesForAdventure(adventureId)),
        tap(response => {
          response.subscribe(routes => {
            this.routes = routes;
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
