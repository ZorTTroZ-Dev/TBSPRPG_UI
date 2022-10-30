import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdventureService} from '../../../services/adventure.service';
import {Adventure} from '../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SettingService} from '../../../services/setting.service';
import {SourcesService} from '../../../services/sources.service';
import {UserService} from '../../../services/user.service';
import {PERMISSION_ADVENTURE_EDIT} from '../../../guards/permission.guard';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../models/game';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../models/notification';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-adventure-explorer',
  templateUrl: './adventure-explorer.component.html',
  styleUrls: ['./adventure-explorer.component.scss']
})
export class AdventureExplorerComponent implements OnInit, OnDestroy {
  adventures: Adventure[];
  adventureSubject: Subject<Adventure>;
  gameExistsSubject: Subject<Adventure>;
  sourceMap = new Map();
  showBreadcrumbs: boolean;
  private subscriptions: Subscription = new Subscription();
  adventureGames: Record<string, Game>;

  constructor(private adventureService: AdventureService,
              private sourcesService: SourcesService,
              private settingService: SettingService,
              private userService: UserService,
              private gameService: GameService,
              private notificationService: NotificationService) {
    this.adventures = [];
    this.adventureGames = {};
    this.adventureSubject = new Subject<Adventure>();
    this.gameExistsSubject = new Subject<Adventure>();
  }

  ngOnInit(): void {
    this.showBreadcrumbs = this.userService.userHasPermissions([PERMISSION_ADVENTURE_EDIT]);

    this.subscriptions.add(
      this.adventureSubject.pipe(
        tap(adventure => {
          this.sourcesService.getProcessedSourceForAdventureForKey(adventure.id, adventure.descriptionSourceKey,
            this.settingService.getLanguage()).subscribe(source => {
            this.sourceMap.set(source.adventureId, source.text);
          });
        })
      ).subscribe()
    );

    this.subscriptions.add(
      this.gameExistsSubject.pipe(
        tap(adventure => {
          this.gameService.getGameForAdventure(adventure.id).subscribe(game => {
            if (game !== null) {
              this.adventureGames[game.adventureId] = game;
            }
          });
        })
      ).subscribe()
    );

    this.subscriptions.add(
      this.adventureService.getPublishedAdventures().subscribe(result => {
        this.adventures = result;
        for (const adventure of this.adventures) {
          this.adventureSubject.next(adventure);
          this.gameExistsSubject.next(adventure);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  gameExistsForAdventure(adventureId: string): boolean {
    return this.adventureGames[adventureId] !== undefined;
  }

  restartGame(adventureId: string): void {
    this.subscriptions.add(
      this.gameService.deleteGame(this.adventureGames[adventureId]).subscribe(() => {
        this.adventureGames[adventureId] = undefined;
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'adventure restarted'
        };
        this.notificationService.postNotification(notification);
      })
    );
  }
}
