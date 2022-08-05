import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Location} from '../../../../models/location';
import {RoutesService} from '../../../../services/routes.service';
import {Script} from '../../../../models/script';
import {Route} from '../../../../models/route';

@Component({
  selector: 'app-ad-route-edit',
  templateUrl: './ad-route-edit.component.html',
  styleUrls: ['./ad-route-edit.component.scss']
})
export class AdRouteEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() route: Route;
  @Input() routeForm: FormGroup;
  @Input() locations: Location[];
  @Input() scripts: Script[];
  routeSourceLabel = 'Button Text';
  routeSourceSuccessLabel = 'Route Taken';
  routeSourceFormGroupName: string;
  routeSourceSuccessFormGroupName: string;
  standalone: boolean;

  constructor(private routesService: RoutesService) { }

  ngOnInit(): void {
    this.routeSourceFormGroupName = this.routesService.routeSourceFormGroupName;
    this.routeSourceSuccessFormGroupName = this.routesService.routeSourceSuccessFormGroupName;
    this.standalone = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.route.currentValue) {
      this.standalone = true;
    }
  }

  ngOnDestroy(): void {
  }

}
