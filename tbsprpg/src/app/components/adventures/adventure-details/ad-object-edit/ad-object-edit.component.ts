import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ADVENTURE_OBJECT_TYPES, AdventureObject} from '../../../../models/adventureObject';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../services/notification.service';
import {AdventureObjectService} from '../../../../services/adventureObject.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {Location} from '../../../../models/location';
import {LocationService} from '../../../../services/location.service';

@Component({
  selector: 'app-ad-object-edit',
  templateUrl: './ad-object-edit.component.html',
  styleUrls: ['./ad-object-edit.component.scss']
})
export class AdObjectEditComponent implements OnInit, OnChanges, OnDestroy {
  nameSourceLabel = 'Name Text';
  descriptionSourceLabel = 'Description Text';
  nameSourceFormGroupName: string;
  descriptionSourceFormGroupName: string;
  @Input() adventureObject: AdventureObject;
  adventureObjectForm: FormGroup;
  adventureObjectTypes: string[] = ADVENTURE_OBJECT_TYPES;
  locations: Location[];
  private subscriptions: Subscription = new Subscription();

  constructor(private adventureObjectService: AdventureObjectService,
              private locationsService: LocationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.nameSourceFormGroupName = this.adventureObjectService.nameSourceFormGroupName;
    this.descriptionSourceFormGroupName = this.adventureObjectService.descriptionSourceFormGroupName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventureObject.currentValue) {
      this.subscriptions.add(
        this.adventureObjectService.createFormGroupForAdventureObjectObservable(
          this.adventureObject, this.adventureObject.adventureId
        ).subscribe(formGroup => {
          this.adventureObjectForm = formGroup;
          const adventureObjectFormGroup = this.adventureObjectForm.get('adventureObject') as FormGroup;
          adventureObjectFormGroup.addControl('locationsSelect', new FormControl<any>(''));
        })
      );
      // look up locations in this adventure
      this.subscriptions.add(
        this.locationsService.getLocationsForAdventure(this.adventureObject.adventureId).subscribe(result => {
          this.locations = result;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateAdventureObject(): void {
    this.adventureObjectForm.patchValue({
      adventureObject:
      {
        locations: this.adventureObject.locations
      }
    });
    this.subscriptions.add(
      this.adventureObjectService.updateAdventureObject(this.adventureObjectForm.value).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'object updated'
        };
        this.notificationService.postNotification(notification);
      })
    );
  }

  addLocation(): void {
    const adventureObjectFormGroup = this.adventureObjectForm.get('adventureObject') as FormGroup;
    const locationId = adventureObjectFormGroup.value.locationsSelect;
    if (this.adventureObject.locations === null) {
      this.adventureObject.locations = [];
    }
    this.adventureObject.locations.push(this.locations.find(
      location => location.id === locationId));
  }

  removeLocation(locationId: string): void {
    this.adventureObject.locations = this.adventureObject.locations.filter(
      location => location.id !== locationId);
  }
}
