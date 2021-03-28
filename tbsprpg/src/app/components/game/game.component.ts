import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdventureService } from '../../services/adventure.service';
import { GameService } from '../../services/game.service';
import { Adventure } from '../../models/adventure';
import { Game } from '../../models/game';

import {switchMap, takeUntil, repeat, last, tap, timeout, catchError} from 'rxjs/operators';
import {of, Subject, timer} from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  adventure: Adventure;
  game: Game;
  gameLoaded : Subject<Game>;

  constructor(private route: ActivatedRoute,
    private adventureService: AdventureService,
    private gameService: GameService) {
    this.gameLoaded = new Subject<Game>();
  }

  loadGame(adventure: Adventure): void {
    this.gameService.getGameForAdventure(adventure.id).subscribe(
      gme => {
        if(gme === null) {
          this.gameService.startGame(adventure.id).subscribe();
          //we need to start polling for the game to be created
          timer(1, 500).pipe(
            switchMap( () => this.gameService.getGameForAdventure(adventure.id)),
            tap(gme => {
              if(gme !== null) {
                //console.log(gme);
                this.game = gme;
                this.gameLoaded.next(gme);
              }
            }),
            takeUntil(this.gameLoaded),
            timeout(10000),
            catchError(error => { console.log("couldn't create a new game"); return of(null); })
          ).subscribe();
        } else {
          this.game = gme;
        }
    });
  }

  ngOnInit(): void {
    //I would like for people to be able to just click a link and be in the game
    //so this could be one of the most used entry points

    //start the loading process
    this.route.params.pipe(
      switchMap( params => this.adventureService.getAdventureByName(params['adventure']) )
    ).subscribe( adv => {
      this.adventure = adv;
      this.loadGame(adv);
    });
  }
}
