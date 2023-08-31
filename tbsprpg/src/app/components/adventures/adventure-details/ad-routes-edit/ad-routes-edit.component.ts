import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {Subscription} from 'rxjs';
import {RoutesService} from '../../../../services/routes.service';
import {FormGroup} from '@angular/forms';
import {Route} from '../../../../models/route';
import {SourcesService} from '../../../../services/sources.service';
import {LocationService} from '../../../../services/location.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {NotificationService} from '../../../../services/notification.service';
import {NIL} from 'uuid';
import {Script} from '../../../../models/script';

@Component({
  selector: 'app-adventure-details-routes-edit',
  templateUrl: './ad-routes-edit.component.html',
  styleUrls: ['./ad-routes-edit.component.scss']
})
export class AdRoutesEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location: Location;
  @Input() scripts: Script[];
  private subscriptions: Subscription = new Subscription();
  routesFormArray: FormGroup[] = [];
  routes: Route[] = [];
  locations: Location[] = [];

  constructor(private routesService: RoutesService,
              private sourcesService: SourcesService,
              private locationsService: LocationService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addRoute(): void {
    const newRoute = this.routesService.createNewRoute(this.location.id);
    this.subscriptions.add(
      this.routesService.createFormGroupForRouteObservable(
        newRoute,
        this.location.adventureId)
      .subscribe(formGroup => {
        this.routesFormArray.push(formGroup);
        this.routes.push(newRoute);
      })
    );
  }

  removeRoute(routeIndex: number): void {
    this.routes.splice(routeIndex, 1);
    this.routesFormArray.splice(routeIndex, 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location && changes.location.currentValue && this.location.id !== NIL) {
      this.subscriptions.add(
        this.routesService.getRoutesForLocation(this.location.id).subscribe(routes => {
          routes.forEach(route => {
            this.routesService.createFormGroupForRouteObservable(route, this.location.adventureId).subscribe(formGroup => {
              this.routes.push(route);
              this.routesFormArray.push(formGroup);
            });
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
      this.routesService.updateRoutes(this.location.id, routesToPut).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'routes updated'
        };
        this.notificationService.postNotification(notification);
      })
    );
  }
}
