import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SourcesService} from '../../../../services/sources.service';
import {LocationService} from '../../../../services/location.service';
import {NotificationService} from '../../../../services/notification.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';

@Component({
  selector: 'app-adventure-details-location-edit',
  templateUrl: './ad-location-edit.component.html',
  styleUrls: ['./ad-location-edit.component.scss']
})
export class AdLocationEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location: Location;
  private sourceFormGroupKey = 'source';
  private locationFormGroupKey = 'location';
  sourceLabel = 'Location Content';
  locationForm: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private sourcesService: SourcesService,
              private locationService: LocationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location.currentValue) {
      this.createLocationForm();
      this.locationForm.controls[this.locationFormGroupKey].setValue(this.location);
      // look up the content for the location source key
      this.subscriptions.add(
        this.sourcesService.getSourceForAdventureForKey(this.location.adventureId,
          this.location.sourceKey, 'en').subscribe(result => {
            this.locationForm.controls[this.sourceFormGroupKey].setValue(result);
        })
      );
    }
  }

  createLocationForm(): void {
    this.locationForm = new FormGroup({
      location: this.locationService.createFormGroupForLocation(null),
      source: this.sourcesService.createFormGroupForSource(null)
    });
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
