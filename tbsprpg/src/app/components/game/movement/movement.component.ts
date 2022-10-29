import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {MapService} from '../../../services/map.service';
import {Route} from '../../../models/route';
import {Subject, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ContentService} from '../../../services/content.service';
import {GameContentRoute} from '../../../models/gameContentRoute';
import {Content} from '../../../models/content';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: GameContentRoute;
  @Output() contentChange = new EventEmitter<Content>();
  finalLocation: boolean;
  routes: Route[];
  routesLoaded: Subject<Route>;
  private subscription: Subscription = new Subscription();

  constructor(private mapService: MapService, private contentService: ContentService) {
    this.routesLoaded = new Subject<Route>();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routes = [];

    this.subscription.add(
      this.routesLoaded.pipe(
        tap(route => {
          if (route == null) { return; }
          const response = this.contentService.getSourceForSourceKey(this.game.game.id, route.sourceKey);
          response.subscribe(source => {
            route.source = source.text;
            this.routes.push(route);
          });
        })
      ).subscribe()
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.game.currentValue) {
      const locationRoutes = this.game.routes;
      if (locationRoutes.location.final) {
        this.finalLocation = true;
      }
      if (locationRoutes.routes !== null && locationRoutes.routes.length > 0) {
        for (const route of locationRoutes.routes) {
          this.routesLoaded.next(route);
        }
      }
    }
  }

  takeRoute(routeId: string): void {
    this.mapService.changeLocationViaRoute(this.game.game.id, routeId).subscribe(contentRoute => {
      this.contentChange.emit(contentRoute.contents);
      if (contentRoute.routes.location.final) {
        this.finalLocation = true;
      }
      this.routes = [];
      for (const route of contentRoute.routes.routes) {
        this.routesLoaded.next(route);
      }
    });
  }

}
