import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../services/game.service';
import {Adventure} from '../../models/adventure';
import {Game} from '../../models/game';

import {catchError, first, map, mergeMap, pluck, switchMap, take, takeUntil, tap, timeout} from 'rxjs/operators';
import {of, Subject, Subscription, timer} from 'rxjs';
import {AdventureService} from '../../services/adventure.service';

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

  constructor(private route: ActivatedRoute,
              private adventureService: AdventureService,
              private gameService: GameService) {
    this.gameLoaded = new Subject<Game>();
    this.isGameError = false;
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
            throw new Error('adventure name parameter not provided');
          }
          return params.get('adventure');
        }),
        switchMap(adventureName => this.adventureService.getAdventureByName(adventureName)),
        tap(adventure => this.adventure = adventure), // save the adventure
        switchMap(adventure => this.gameService.startGame(adventure.id)),
        switchMap(() => timer(0, 500)),  // start a timer to load the game every half second
        takeUntil(this.gameLoaded), // try to load the game until it's loaded
        map(tic => {
          if (tic >= 20) {
            this.isGameError = true;
            throw new Error('failed to load game');
          }
          return tic;
        }), // only try for 20 half seconds which is 10 seconds
        switchMap(() => this.gameService.getGameForAdventure(this.adventure.id)),
        catchError((err: Error) => of(null)),  // pipe line continue with a null game if there is an error
      ).subscribe(game => {
        this.game = game;
        this.gameLoaded.next(game);
      })
    );

    // eventually throw an error if the game never loads
    // this.subscription.add(
    //   this.gameLoaded.pipe(
    //     first(),
    //     timeout(10000),
    //     catchError(() => {
    //       console.log('game never loaded');
    //       return of(null);
    //     })
    //   ).subscribe()
    // );
  }

  // private pollGame(): void {
  //   this.subscription.add(
  //     timer(1, 500).pipe(
  //       takeUntil(this.gameLoaded),
  //       take(20),
  //       switchMap(() => this.gameService.getGameForAdventure(this.adventure.id))
  //     ).subscribe(game => {
  //       if (game !== null) {
  //         this.game = game;
  //         this.gameLoaded.next(game);
  //       }
  //     })
  //   );
  // }
}
