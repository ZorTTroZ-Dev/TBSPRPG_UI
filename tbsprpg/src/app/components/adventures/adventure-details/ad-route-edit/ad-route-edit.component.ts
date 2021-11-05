import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Location} from '../../../../models/location';
import {RoutesService} from '../../../../services/routes.service';

@Component({
  selector: 'app-ad-route-edit',
  templateUrl: './ad-route-edit.component.html',
  styleUrls: ['./ad-route-edit.component.scss']
})
export class AdRouteEditComponent implements OnInit {
  @Input() routeForm: FormGroup;
  @Input() locations: Location[];
  routeSourceLabel = 'Button Text';
  routeSourceSuccessLabel = 'Route Taken';
  routeSourceFormGroupName: string;
  routeSourceSuccessFormGroupName: string;

  constructor(private routesService: RoutesService) { }

  ngOnInit(): void {
    this.routeSourceFormGroupName = this.routesService.routeSourceFormGroupName;
    this.routeSourceSuccessFormGroupName = this.routesService.routeSourceSuccessFormGroupName;
  }

}
