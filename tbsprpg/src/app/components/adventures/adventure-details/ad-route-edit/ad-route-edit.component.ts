import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Location} from '../../../../models/location';
import {RoutesService} from '../../../../services/routes.service';
import {Script} from '../../../../models/script';
import {Route} from '../../../../models/route';
import {Adventure} from '../../../../models/adventure';
import {LocationService} from '../../../../services/location.service';
import {ScriptService} from '../../../../services/script.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {NotificationService} from '../../../../services/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ad-route-edit',
  templateUrl: './ad-route-edit.component.html',
  styleUrls: ['./ad-route-edit.component.scss']
})
export class AdRouteEditComponent implements OnInit, OnChanges, OnDestroy {
  // you need to pass these
  @Input() route: Route;
  @Input() adventure: Adventure;

  // or you need to pass these
  @Input() routeForm: FormGroup;
  @Input() locations: Location[];
  @Input() scripts: Script[];

  routeSourceLabel = 'Button Text';
  routeSourceSuccessLabel = 'Route Taken';
  routeSourceFormGroupName: string;
  routeSourceSuccessFormGroupName: string;
  standalone: boolean;

  private subscriptions: Subscription = new Subscription();

  constructor(private routesService: RoutesService,
              private locationsService: LocationService,
              private scriptsService: ScriptService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.routeSourceFormGroupName = this.routesService.routeSourceFormGroupName;
    this.routeSourceSuccessFormGroupName = this.routesService.routeSourceSuccessFormGroupName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.route !== undefined && changes.route.currentValue) {
      this.standalone = true;
      this.subscriptions.add(
        this.routesService.createFormGroupForRouteObservable(
          this.route, this.adventure.id
        ).subscribe(formGroup => {
          this.routeForm = formGroup;
        })
      );
      this.subscriptions.add(
        this.locationsService.getLocationsForAdventure(this.adventure.id).subscribe(locations => {
          this.locations = locations;
        })
      );
      this.subscriptions.add(
        this.scriptsService.getScriptsForAdventure(this.adventure.id).subscribe(scripts => {
          this.scripts = scripts;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateRoute(): void {
    this.subscriptions.add(
      this.routesService.updateRoute(this.routeForm.value).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'route updated'
        };
        this.notificationService.postNotification(notification);
      })
    );
  }
}
