import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Game} from '../../../models/game';
import {MapService} from '../../../services/map.service';
import {Route} from '../../../models/route';
import {of, Subject, Subscription, timer} from 'rxjs';
import {catchError, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ContentService} from '../../../services/content.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: Game;
  isMovementError: boolean;
  finalLocation: boolean;
  routes: Route[];
  routesLoaded: Subject<Route>;
  routeTimeStamp: number;
  private subscription: Subscription = new Subscription();

  constructor(private mapService: MapService, private contentService: ContentService) {
    this.routesLoaded = new Subject<Route>();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routes = [];
    this.isMovementError = false;
    this.routeTimeStamp = 0;

    this.subscription.add(
      this.routesLoaded.pipe(
        tap(route => {
          if (route == null) { return; }
          const response = this.contentService.getSourceForSourceKey(this.game.id, route.sourceKey);
          response.subscribe(source => {
            route.source = source.text;
            this.routes.push(route);
          });
        })
      ).subscribe()
    );

    this.subscription.add(
      this.mapService.getPollRoutes().subscribe(() => {
        this.mapService.getRoutesForGameAfterTimeStamp(this.game.id, this.routeTimeStamp).subscribe(locationRoutes => {
          if (locationRoutes.location.final) {
            this.finalLocation = true;
            this.routesLoaded.next(null);
          }
          if (locationRoutes.routes !== null && locationRoutes.routes.length > 0) {
            this.routes = [];
            for (const route of locationRoutes.routes) {
              if (route.timeStamp > this.routeTimeStamp) {
                this.routeTimeStamp = route.timeStamp;
              }
              this.routesLoaded.next(route);
            }
          }
        });
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the game changes
    // load routes until we get a valid response

    if (changes.game.currentValue) {
      this.subscription.add(
        timer(0, 500).pipe(
          takeUntil(this.routesLoaded),
          map(tic => {
            if (tic >= 20) {
              this.isMovementError = true;
              throw new Error('failed to load game movements');
            }
            return tic;
          }), // only try for 20 half seconds which is 10 seconds
          switchMap(() => this.mapService.getRoutesForGame(this.game.id)),
          tap(locationRoutes => {
            if (locationRoutes.location.final) {
              this.finalLocation = true;
              this.routesLoaded.next(null);
            }
            if (locationRoutes.routes !== null && locationRoutes.routes.length > 0) {
              for (const route of locationRoutes.routes) {
                if (route.timeStamp > this.routeTimeStamp) {
                  this.routeTimeStamp = route.timeStamp;
                }
                this.routesLoaded.next(route);
              }
              this.pollRoutes();
            }
          }),
          catchError(() => of(null))
        ).subscribe()
      );
    }
  }

  pollRoutes(): void {
    this.subscription.add(
      timer(0, 10000).subscribe(tick => {
        this.mapService.pollRoutes(tick);
      })
    );
  }

  takeRoute(routeId: string): void {
    // make request to back end to change location
    // the movement buttons should update
    this.mapService.changeLocationViaRoute(this.game.id, routeId).subscribe(() => {
      this.contentService.pollContent(-1);
      this.mapService.pollRoutes(1);
    });
  }

}
