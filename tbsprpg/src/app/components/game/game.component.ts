import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../services/game.service';
import {Adventure} from '../../models/adventure';
import {Game} from '../../models/game';

import {map, switchMap, tap} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {AdventureService} from '../../services/adventure.service';
import {GameContentRoute} from '../../models/gameContentRoute';
import {Content} from '../../models/content';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  adventure: Adventure;
  game: GameContentRoute;
  gameLoaded: Subject<Game>;
  isGameError: boolean;
  newContent: Content;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private adventureService: AdventureService,
              private gameService: GameService) {
    this.gameLoaded = new Subject<Game>();
    this.isGameError = false;
    this.game = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.pipe(
        map(params => {
          if (params.get('adventure') === '') {
            this.isGameError = true;
            throw new Error('adventure id parameter not provided');
          }
          return params.get('adventure');
        }),
        switchMap(adventureId => this.adventureService.getAdventureById(adventureId)),
        tap(adventure => this.adventure = adventure), // save the adventure
        switchMap(adventure => this.gameService.startGame(adventure.id)),
        tap(gameContentRoute => {
          this.game = gameContentRoute;
        })
      ).subscribe()
    );
  }

  contentChanged(newContent: Content): void {
    this.newContent = newContent;
  }
}
