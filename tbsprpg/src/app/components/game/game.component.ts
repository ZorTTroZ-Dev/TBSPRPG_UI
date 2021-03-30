import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdventureService } from '../../services/adventure.service';
import { GameService } from '../../services/game.service';
import { Adventure } from '../../models/adventure';
import { Game } from '../../models/game';

import {switchMap, takeUntil, tap, take, timeout, catchError, first} from 'rxjs/operators';
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

  pollStartedGame(adventure: Adventure): void {
    timer(1, 500).pipe(
      switchMap( () => this.gameService.getGameForAdventure(adventure.id)),
      tap(gme => {
        if(gme !== null) {
          this.game = gme;
          this.gameLoaded.next(gme);
        }
      }),
      takeUntil(this.gameLoaded),
      take(20)
    ).subscribe();
  }

  loadGame(adventure: Adventure): void {
    this.gameService.getGameForAdventure(adventure.id).subscribe(
      gme => {
        if(gme === null) {
          this.gameService.startGame(adventure.id).subscribe();
          this.pollStartedGame(adventure);
        } else {
          this.game = gme;
          this.gameLoaded.next(gme);
        }
    });
  }

  ngOnInit(): void {
    //start the loading process
    this.route.params.pipe(
      switchMap( params => this.adventureService.getAdventureByName(params['adventure']) )
    ).subscribe( adv => {
      this.adventure = adv;
      this.loadGame(adv);
    });

    //eventually throw an error if the game never loads
    this.gameLoaded.pipe(
      first(),
      timeout(10000),
      catchError(error => {
        console.log("game never loaded");
        return of(null);
      })
    ).subscribe();
  }
}
