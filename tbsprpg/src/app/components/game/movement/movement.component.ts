import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Game} from '../../../models/game';
import {MapService} from '../../../services/map.service';
import {Route} from '../../../models/route';
import {switchMap} from 'rxjs/operators';
import {from, Subscription} from 'rxjs';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: Game;
  routes: Route[];
  private subscription: Subscription = new Subscription();

  constructor(private mapService: MapService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routes = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.game.currentValue) {
      this.subscription.add(
        this.mapService.getRoutesForGame(this.game.id).pipe(
          switchMap(routes => from(routes))
        ).subscribe(route => {
          this.routes.push(route);
        })
      );
    }
  }

}
