import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subscription} from 'rxjs';
import {GameService} from '../../../../services/game.service';
import {Game} from '../../../../models/game';

@Component({
  selector: 'app-ad-games',
  templateUrl: './ad-games.component.html',
  styleUrls: ['./ad-games.component.scss']
})
export class AdGamesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  games: Game[];
  private subscriptions: Subscription = new Subscription();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.games = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.subscriptions.add(
        this.gameService.getGamesForAdventure(this.adventure.id).subscribe(games => {
          this.games = games;
          console.log(games);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  deleteGame(game: Game): void {
    this.subscriptions.add(
      this.gameService.deleteGame(game).subscribe(() => {
        console.log('game deleted');
      })
    );
  }
}
