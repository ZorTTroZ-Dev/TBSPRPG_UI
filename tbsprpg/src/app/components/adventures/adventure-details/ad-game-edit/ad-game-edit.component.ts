import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {GameUser} from '../../../../models/gameUser';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Adventure} from '../../../../models/adventure';
import {GameService} from '../../../../services/game.service';
import {GameState} from '../../../../models/gameState';

@Component({
  selector: 'app-ad-game-edit',
  templateUrl: './ad-game-edit.component.html',
  styleUrls: ['./ad-game-edit.component.scss']
})
export class AdGameEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: GameUser;
  @Input() adventure: Adventure;
  gameForm: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private gameService: GameService,
              /* private notificationService: NotificationService */) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.game.currentValue) {
      this.subscriptions.add(
        this.gameService.getStateForGame(this.game.game.id).subscribe(state => {
          const gameState = ({
            gameId: this.game.game.id,
            state: JSON.stringify(state)
          }) as GameState;
          this.gameForm = this.gameService.createGameFormGroup(this.game, gameState);
          console.log(this.gameForm.value);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
