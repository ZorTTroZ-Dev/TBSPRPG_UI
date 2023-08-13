import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SourcesService} from '../../../../services/sources.service';
import {LocationService} from '../../../../services/location.service';
import {NotificationService} from '../../../../services/notification.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {SettingService} from '../../../../services/setting.service';
import {ScriptService} from '../../../../services/script.service';
import {Script} from '../../../../models/script';
import {AdventureObject} from '../../../../models/adventureObject';
import {AdventureObjectService} from '../../../../services/adventureObject.service';

@Component({
  selector: 'app-adventure-details-location-edit',
  templateUrl: './ad-location-edit.component.html',
  styleUrls: ['./ad-location-edit.component.scss']
})
export class AdLocationEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location: Location;
  scripts: Script[];
  adventureObjects: AdventureObject[];
  sourceLabel = 'Location Content';
  locationForm: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private sourcesService: SourcesService,
              private locationService: LocationService,
              private scriptService: ScriptService,
              private adventureObjectService: AdventureObjectService,
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
          this.location.sourceKey, this.settingService.getLanguage()).subscribe(sources => {
          this.adventureObjectService.getAdventureObjectsForLocation(this.location.id).subscribe(result => {
            this.location.adventureObjects = result;
            this.locationForm = this.locationService.createLocationFormGroupWithSource(this.location, sources);
            this.locationForm.addControl('objectsSelect', new FormControl<any>(''));
          });
        })
      );

      // look up scripts available for this adventure
      this.subscriptions.add(
        this.scriptService.getScriptsForAdventure(this.location.adventureId).subscribe(result => {
          this.scripts = result;
        })
      );
      // look up objects available for this adventure
      this.subscriptions.add(
        this.adventureObjectService.getAdventureObjectsForAdventure(this.location.adventureId).subscribe(result => {
          this.adventureObjects = result;
        })
      );
    }
  }

  updateLocation(): void {
    this.locationForm.patchValue({
      location: { adventureObjects: this.location.adventureObjects }
    });
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

  addObject(): void {
    const adventureObjectId = this.locationForm.value.objectsSelect;
    if (this.location.adventureObjects === null) {
      this.location.adventureObjects = [];
    }
    this.location.adventureObjects.push(this.adventureObjects.find(
      adventureObject => adventureObject.id === adventureObjectId));
  }

  removeObject(adventureObjectId: string): void {
    this.location.adventureObjects = this.location.adventureObjects.filter(
      adventureObject => adventureObject.id !== adventureObjectId);
  }
}
