import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../models/adventure';
import {AdventureTableTypes} from '../../../view_models/adventure-table-types';
import {AdventureService} from '../../../services/adventure.service';
import {UserService} from '../../../services/user.service';
import {Subject, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../models/notification';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-adventures-table',
  templateUrl: './adventures-table.component.html',
  styleUrls: ['./adventures-table.component.scss']
})

export class AdventuresTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tableType: string;
  adventures: Adventure[];
  adventureObservable: Subject<string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private adventureService: AdventureService,
              private userService: UserService,
              private notificationService: NotificationService) {
    this.adventures = [];
    this.adventureObservable = new Subject<string>();

    this.subscriptions.add(
      this.adventureObservable.pipe(
        map(userId => this.adventureService.getAdventuresCreatedBy(userId)),
        tap(response => {
          response.subscribe(adventures => {
            this.adventures = adventures;
          });
        })
      ).subscribe()
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // the game has changed, get most recent content for display, and start polling
    if (changes.tableType.currentValue) {
      if (this.tableType === AdventureTableTypes.CREATED_ADVENTURES) {
        const userId = this.userService.getUserId();
        this.adventureObservable.next(userId);
      }
    }
  }

  deleteAdventure(adventure: Adventure): void {
    this.subscriptions.add(
      this.adventureService.deleteAdventure(adventure).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'adventure deleted'
        };
        this.notificationService.postNotification(notification);
        const userId = this.userService.getUserId();
        this.adventureObservable.next(userId);
      })
    );
  }

}
