import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ADVENTURE_OBJECT_TYPES, AdventureObject} from '../../../../models/adventureObject';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../services/notification.service';
import {AdventureObjectService} from '../../../../services/adventureObject.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';

@Component({
  selector: 'app-ad-object-edit',
  templateUrl: './ad-object-edit.component.html',
  styleUrls: ['./ad-object-edit.component.scss']
})
export class AdObjectEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventureObject: AdventureObject;
  adventureObjectForm: FormGroup;
  adventureObjectTypes: string[] = ADVENTURE_OBJECT_TYPES;
  private subscriptions: Subscription = new Subscription();

  constructor(private adventureObjectService: AdventureObjectService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventureObject.currentValue) {
      this.adventureObjectForm = this.adventureObjectService.createAdventureObjectFormGroup(this.adventureObject);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateAdventureObject(): void {
    console.log(this.adventureObjectForm.value);
    // this.subscriptions.add(
    //   this.scriptService.updateScript(this.scriptForm.value).subscribe(() => {
    //     const notification: Notification = {
    //       type: NOTIFICATION_TYPE_SUCCESS,
    //       message: 'script updated'
    //     };
    //     this.notificationService.postNotification(notification);
    //   })
    // );
  }
}
