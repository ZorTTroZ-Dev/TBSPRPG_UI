import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdventureService} from '../../services/adventure.service';
import {GameService} from '../../services/game.service';
import {Adventure} from '../../models/adventure';
import {Game} from '../../models/game';

import {catchError, first, map, mergeMap, switchMap, take, takeUntil, tap, timeout} from 'rxjs/operators';
import {iif, of, Subject, Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  adventure: Adventure;
  game: Game;
  gameLoaded: Subject<Game>;
  isGameError: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute/*,
              private adventureService: AdventureService,
              private gameService: GameService*/) {
    this.gameLoaded = new Subject<Game>();
    this.isGameError = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // start with a adventure name
    // load an adventure based on name (switchMap)
    // load a game for the user of that adventure id (switchMap)
    // if the game is null
    //   call start game
    //   wait for the game to be populated
    // game not null, save game
    this.subscription.add(
      this.route.paramMap.pipe(
        map(params => {
          if (params.get('adventure') === '') {
            this.isGameError = true;
            throw new Error('adventure name parameter not provided');
          }
          return params.get('adventure');
        }),
        catchError((err: Error) => of(err.message))
      ).subscribe()
      // this.route.params.pipe(
      //   switchMap(params => this.adventureService.getAdventureByName(params.adventure)),
      //   tap(adventure => this.adventure = adventure), // save the adventure
      //   switchMap(adventure => this.gameService.getGameForAdventure(adventure.id)),
      //   mergeMap(game => iif(
      //     () => game === null,
      //     this.gameService.startGame(this.adventure.id),
      //     of(game)
      //   ))
      // ).subscribe(() => {
      //   this.pollGame();
      // })
    );

    // eventually throw an error if the game never loads
    this.subscription.add(
      this.gameLoaded.pipe(
        first(),
        timeout(10000),
        catchError(() => {
          console.log('game never loaded');
          return of(null);
        })
      ).subscribe()
    );
  }

  private pollGame(): void {
    // this.subscription.add(
    //   timer(1, 500).pipe(
    //     takeUntil(this.gameLoaded),
    //     take(20),
    //     switchMap(() => this.gameService.getGameForAdventure(this.adventure.id))
    //   ).subscribe(game => {
    //     if (game !== null) {
    //       this.game = game;
    //       this.gameLoaded.next(game);
    //     }
    //   })
    // );
  }
}
