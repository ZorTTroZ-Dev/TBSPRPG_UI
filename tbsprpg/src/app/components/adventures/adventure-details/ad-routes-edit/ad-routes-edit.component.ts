import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {forkJoin, Subject, Subscription} from 'rxjs';
import {RoutesService} from '../../../../services/routes.service';
import {UntypedFormGroup} from '@angular/forms';
import {Route} from '../../../../models/route';
import {SourcesService} from '../../../../services/sources.service';
import {tap} from 'rxjs/operators';
import {LocationService} from '../../../../services/location.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {NotificationService} from '../../../../services/notification.service';
import {NIL} from 'uuid';
import {SettingService} from '../../../../services/setting.service';
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
  routeLoaded: Subject<Route>;
  routesFormArray: UntypedFormGroup[] = [];
  routes: Route[] = [];
  locations: Location[] = [];

  constructor(private routesService: RoutesService,
              private sourcesService: SourcesService,
              private locationsService: LocationService,
              private notificationService: NotificationService,
              private settingService: SettingService) {
    this.routeLoaded = new Subject<Route>();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.routeLoaded.pipe(
        tap(route => {
          const sourceRequest = this.sourcesService.getSourceForAdventureForKey(
            this.location.adventureId,
            route.sourceKey,
            this.settingService.getLanguage());
          const successKeySourceRequest = this.sourcesService.getSourceForAdventureForKey(
            this.location.adventureId,
            route.routeTakenSourceKey,
            this.settingService.getLanguage());
          forkJoin([sourceRequest, successKeySourceRequest]).subscribe(results => {
            this.routes.push(route);
            this.routesFormArray.push(this.routesService.createFormGroupForRouteWithSource(route, results[0], results[1]));
          });
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addRoute(): void {
    this.subscriptions.add(
      this.sourcesService.getSourceForAdventureForKey(
        this.location.adventureId, NIL,
        this.settingService.getLanguage())
      .subscribe(result => {
        const newRoute = this.routesService.createNewRoute(this.location.id);
        this.routesFormArray.push(this.routesService.createFormGroupForRouteWithSource(newRoute, result, result));
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
      this.routesService.updateRoutes(routesToPut).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'routes updated'
        };
        this.notificationService.postNotification(notification);
      })
    );
  }
}
