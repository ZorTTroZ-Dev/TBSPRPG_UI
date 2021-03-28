import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdventureService } from '../../services/adventure.service';
import { GameService } from '../../services/game.service';
import { Adventure } from '../../models/adventure';
import { Game } from '../../models/game';

import {switchMap, takeUntil, repeat, last, tap} from 'rxjs/operators';
import {Subject, timer} from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  adventure: Adventure;
  game: Game;


  constructor(private route: ActivatedRoute,
    private adventureService: AdventureService,
    private gameService: GameService) { }

  loadGame(adventure: Adventure): void {
    let gameLoaded = new Subject();
    this.gameService.getGameForAdventure(adventure.id).subscribe(
      gme => {
        if(gme === null) {
          this.gameService.startGame(adventure.id).subscribe();
          //we need to start polling for the game to be created
          timer(1, 500).pipe(
            switchMap( () => this.gameService.getGameForAdventure(adventure.id)),
            repeat(10),
            tap(gme => {
              if(gme !== null) {
                console.log(gme);
                this.game = gme;
                gameLoaded.next(gme);
              }
            }),
            takeUntil(gameLoaded),
            last()
          ).subscribe( gme => {
            console.log(gme);
          });
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
