import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Script} from '../../../../models/script';
import {Subject, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ScriptService} from '../../../../services/script.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-ad-scripts',
  templateUrl: './ad-scripts.component.html',
  styleUrls: ['./ad-scripts.component.scss']
})
export class AdScriptsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  @Output() sidebarLocationChange = new EventEmitter<string>();
  @Output() adventureScriptChange = new EventEmitter<Script>();
  @Output() adventureScriptsChange = new EventEmitter<Script[]>();
  scripts: Script[];
  private subscriptions: Subscription = new Subscription();
  scriptObservable: Subject<string>;

  constructor(private scriptService: ScriptService, private notificationService: NotificationService) {
    this.scripts = [];
    this.scriptObservable = new Subject<string>();

    this.subscriptions.add(
      this.scriptObservable.pipe(
        map(adventureId => this.scriptService.getScriptsForAdventure(adventureId)),
        tap(response => {
          response.subscribe(scripts => {
            this.scripts = scripts;
          });
        })
      ).subscribe()
    );
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.scriptObservable.next(this.adventure.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateScript(script: Script): void {
    this.updateSidebarLocation('script-edit');
    this.updateAdventureScript(script);
    this.adventureScriptsChange.emit(this.scripts);
  }

  newScript(): void {
    this.updateSidebarLocation('script-edit');
    this.updateAdventureScript(this.scriptService.createNewScript(this.adventure.id));
    this.adventureScriptsChange.emit(this.scripts);
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocationChange.emit(newLocation);
  }

  updateAdventureScript(script: Script): void {
    this.adventureScriptChange.emit(script);
  }

  deleteScript(script: Script): void {
    this.subscriptions.add(
      this.scriptService.deleteScript(script).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'script deleted'
        };
        this.notificationService.postNotification(notification);
        this.scripts = this.scripts.filter(s => {
          return s.id !== script.id;
        });
      })
    );
  }
}
