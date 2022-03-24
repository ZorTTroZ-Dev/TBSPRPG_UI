import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {GameService} from '../../../../services/game.service';
import {Game} from '../../../../models/game';
import {GameUser} from '../../../../models/gameUser';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-ad-games',
  templateUrl: './ad-games.component.html',
  styleUrls: ['./ad-games.component.scss']
})
export class AdGamesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  games: GameUser[];
  gameObservable: Subject<string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private gameService: GameService) {
    this.games = [];
    this.gameObservable = new Subject<string>();

    this.subscriptions.add(
      this.gameObservable.pipe(
        map(adventureId => this.gameService.getGamesForAdventure(adventureId)),
        tap(response => {
          response.subscribe(games => {
            this.games = games;
          });
        })
      ).subscribe()
    );
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.gameObservable.next(this.adventure.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  deleteGame(game: Game): void {
    this.subscriptions.add(
      this.gameService.deleteGame(game).subscribe(() => {
        console.log('game deleted');
        this.gameObservable.next(this.adventure.id);
      })
    );
  }
}
