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
    this.isMovementError = false;

    this.subscription.add(
      this.routesLoaded.pipe(
        tap(route => {
          const response = this.contentService.getSourceForSourceKey(this.game.id, route.sourceKey);
          response.subscribe(source => {
            route.source = source.text;
            this.routes.push(route);
          });
        })
      ).subscribe()
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
          tap(routes => {
            if (routes !== null && routes.length > 0) {
              for (const route of routes) {
                this.routesLoaded.next(route);
              }
            }
          }),
          catchError(() => of(null))
        ).subscribe()
      );
    }
  }

}
