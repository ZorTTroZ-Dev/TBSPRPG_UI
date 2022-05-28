import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Adventure} from '../../../../models/adventure';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {forkJoin, of, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SourcesService} from '../../../../services/sources.service';
import {SettingService} from '../../../../services/setting.service';
import {AdventureService} from '../../../../services/adventure.service';
import {NotificationService} from '../../../../services/notification.service';
import {Script} from '../../../../models/script';

@Component({
  selector: 'app-ae-form',
  templateUrl: './ae-form.component.html',
  styleUrls: ['./ae-form.component.scss']
})
export class AeFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  @Input() scripts: Script[];
  @Output() editAdventureChange = new EventEmitter<Adventure>();
  adventureForm: FormGroup;
  sourceLabel = 'Initial Adventure Content';
  initialSourceFormGroupName = 'initialSource';
  descriptionSourceLabel = 'Description';
  descriptionSourceFormGroupName = 'descriptionSource';
  private subscriptions: Subscription = new Subscription();

  constructor(private sourcesService: SourcesService,
              private settingService: SettingService,
              private adventureService: AdventureService,
              private notificationService: NotificationService) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.subscriptions.add(
        of(this.adventure).pipe(
          tap(adventure => {
            const initialSourceRequest = this.sourcesService.getSourceForAdventureForKey(
              adventure.id,
              adventure.initialSourceKey,
              this.settingService.getLanguage());
            const descriptionSourceRequest = this.sourcesService.getSourceForAdventureForKey(
              adventure.id,
              adventure.descriptionSourceKey,
              this.settingService.getLanguage());
            forkJoin([initialSourceRequest, descriptionSourceRequest]).subscribe(results => {
              this.adventureForm = this.adventureService.createAdventureFormGroupWithSource(
                adventure, results[0], results[1]
              );
            });
          })
        ).subscribe()
      );
    }
  }

  updateAdventure(): void {
    this.subscriptions.add(
      this.adventureService.updateAdventure(this.adventureForm.value).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'adventure updated'
        };
        this.notificationService.postNotification(notification);
        this.editAdventureChange.emit(this.adventureForm.value.adventure);
      })
    );
  }
}
