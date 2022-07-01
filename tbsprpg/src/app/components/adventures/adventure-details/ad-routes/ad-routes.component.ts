import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {Route} from '../../../../models/route';
import {RoutesService} from '../../../../services/routes.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-ad-routes',
  templateUrl: './ad-routes.component.html',
  styleUrls: ['./ad-routes.component.scss']
})
export class AdRoutesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  routes: Route[];
  routeObservable: Subject<string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private routesService: RoutesService) {
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

}
