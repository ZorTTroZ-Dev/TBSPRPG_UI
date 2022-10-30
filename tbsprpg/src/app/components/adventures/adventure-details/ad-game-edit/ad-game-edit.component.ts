import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GameUser} from '../../../../models/gameUser';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Adventure} from '../../../../models/adventure';
import {GameService} from '../../../../services/game.service';
import {GameState} from '../../../../models/gameState';
import * as ace from 'ace-builds';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {NotificationService} from '../../../../services/notification.service';

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

  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  aceEditor: ace.Ace.Editor;

  constructor(private gameService: GameService,
              private notificationService: NotificationService) { }

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
          this.initializeEditor();
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeEditor(): void {
    ace.config.set('fontSize', '16px');
    ace.config.set('basePath', 'https://ace.c9.io/build/src-noconflict/');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.renderer.attachToShadowRoot();
    this.aceEditor.session.setValue(this.gameForm.value.gameState.state);
    this.aceEditor.setTheme('ace/theme/monokai');
    this.aceEditor.session.setMode('ace/mode/json');
    this.aceEditor.session.setTabSize(4);
    this.aceEditor.session.setUseSoftTabs(true);
  }

  updateGame(): void {
    console.log('UPDATE!');
  }

  updateGameState(): void {
    this.gameForm.patchValue({
      gameState: {
        state: this.aceEditor.getValue()
      }
    });
    this.subscriptions.add(
      this.gameService.updateGameState(this.gameForm.value.gameState).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'game state updated'
        };
        this.notificationService.postNotification(notification);
      })
    );
  }
}
