import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game} from '../../../models/game';
import {MapService} from '../../../services/map.service';
import {Route} from '../../../models/route';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit, OnChanges {
  @Input() game: Game;
  routes: Route[];

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.routes = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.game.currentValue) {
      this.mapService.getRoutesForGame(this.game.id).subscribe(routes => {
        for (const key of Object.keys(routes)) {
          this.routes.push(routes[key]);
        }
      });
    }
  }

}
