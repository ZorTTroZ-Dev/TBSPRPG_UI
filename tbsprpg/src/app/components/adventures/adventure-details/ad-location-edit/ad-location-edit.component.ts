import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {UntypedFormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SourcesService} from '../../../../services/sources.service';
import {LocationService} from '../../../../services/location.service';
import {NotificationService} from '../../../../services/notification.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {SettingService} from '../../../../services/setting.service';
import {ScriptService} from '../../../../services/script.service';
import {Script} from '../../../../models/script';

@Component({
  selector: 'app-adventure-details-location-edit',
  templateUrl: './ad-location-edit.component.html',
  styleUrls: ['./ad-location-edit.component.scss']
})
export class AdLocationEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location: Location;
  scripts: Script[];
  sourceLabel = 'Location Content';
  locationForm: UntypedFormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private sourcesService: SourcesService,
              private locationService: LocationService,
              private scriptService: ScriptService,
              private notificationService: NotificationService,
              private settingService: SettingService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location && changes.location.currentValue) {
      // look up the content for the location source key
      this.subscriptions.add(
        this.sourcesService.getSourceForAdventureForKey(this.location.adventureId,
          this.location.sourceKey, this.settingService.getLanguage()).subscribe(result => {
          this.locationForm = this.locationService.createLocationFormGroupWithSource(this.location, result);
        })
      );
      // look up scripts available for this adventure
      this.subscriptions.add(
        this.scriptService.getScriptsForAdventure(this.location.adventureId).subscribe(result => {
          this.scripts = result;
        })
      );
    }
  }

  updateLocation(): void {
    this.subscriptions.add(
      this.locationService.updateLocation(this.locationForm.value).subscribe(() => {
        // we'll want to pop up a message if the update is cool
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'location updated'
        };
        this.notificationService.postNotification(notification);
      })
    );
  }
}
