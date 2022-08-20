import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Location} from '../../../../models/location';
import {RoutesService} from '../../../../services/routes.service';
import {Script} from '../../../../models/script';
import {Route} from '../../../../models/route';
import {Adventure} from '../../../../models/adventure';
import {LocationService} from '../../../../services/location.service';
import {ScriptService} from '../../../../services/script.service';

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

  constructor(private routesService: RoutesService,
              private locationsService: LocationService,
              private scriptsService: ScriptService) { }

  ngOnInit(): void {
    this.routeSourceFormGroupName = this.routesService.routeSourceFormGroupName;
    this.routeSourceSuccessFormGroupName = this.routesService.routeSourceSuccessFormGroupName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.route !== undefined && changes.route.currentValue) {
      this.standalone = true;
      this.routesService.createFormGroupForRouteObservable(
        this.route, this.adventure.id
      ).subscribe(formGroup => {
        this.routeForm = formGroup;
      });
      this.locationsService.getLocationsForAdventure(this.adventure.id).subscribe(locations => {
        this.locations = locations;
      });
      this.scriptsService.getScriptsForAdventure(this.adventure.id).subscribe(scripts => {
        this.scripts = scripts;
      });
    }
  }

  ngOnDestroy(): void {
  }
}
