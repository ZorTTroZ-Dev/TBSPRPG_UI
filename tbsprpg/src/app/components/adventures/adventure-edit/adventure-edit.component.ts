import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../models/adventure';
import {FormGroup} from '@angular/forms';
import {forkJoin, Subscription} from 'rxjs';
import {SourcesService} from '../../../services/sources.service';
import {SettingService} from '../../../services/setting.service';
import {AdventureService} from '../../../services/adventure.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../models/notification';
import {NotificationService} from '../../../services/notification.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.scss']
})

export class AdventureEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.subscriptions.add(
        this.sourcesService.getSourceForAdventureForKey(this.adventure.id,
          this.adventure.initialSourceKey, this.settingService.getLanguage()).subscribe(result => {
          this.adventureForm = this.adventureService.createAdventureFormGroupWithSource(
            this.adventure, result, result);
        })
      );
      // this.subscriptions.add (
      //   tap(() => {
      //     const initialSourceRequest = this.sourcesService.getSourceForAdventureForKey(
      //       this.adventure.id,
      //       this.adventure.initialSourceKey,
      //       this.settingService.getLanguage());
      //     const descriptionSourceRequest = this.sourcesService.getSourceForAdventureForKey(
      //       this.adventure.id,
      //       this.adventure.descriptionSourceKey,
      //       this.settingService.getLanguage());
      //     forkJoin([initialSourceRequest, descriptionSourceRequest]).subscribe(results => {
      //       this.adventureForm = this.adventureService.createAdventureFormGroupWithSource(
      //         this.adventure, results[0], results[1]
      //       );
      //     });
      //   })
      // );
    }
  }

  updateAdventure(): void {
    console.log(this.adventureForm.value);
    // this.subscriptions.add(
      // this.adventureService.updateAdventure(this.adventureForm.value).subscribe(() => {
      //   const notification: Notification = {
      //     type: NOTIFICATION_TYPE_SUCCESS,
      //     message: 'adventure updated'
      //   };
      //   this.notificationService.postNotification(notification);
      //   this.editAdventureChange.emit(this.adventureForm.value.adventure);
      // })
    // );
  }

}
