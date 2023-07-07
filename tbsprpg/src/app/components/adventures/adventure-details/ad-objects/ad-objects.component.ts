import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {AdventureObject} from '../../../../models/adventureObject';
import {Subject, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AdventureObjectService} from '../../../../services/adventureObject.service';

@Component({
  selector: 'app-ad-objects',
  templateUrl: './ad-objects.component.html',
  styleUrls: ['./ad-objects.component.scss']
})
export class AdObjectsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  @Output() sidebarLocationChange = new EventEmitter<string>();
  @Output() adventureObjectChange = new EventEmitter<AdventureObject>();
  @Output() adventureObjectsChange = new EventEmitter<AdventureObject[]>();
  adventureObjects: AdventureObject[];
  private subscriptions: Subscription = new Subscription();
  adventureObjectObservable: Subject<string>;

  constructor(private adventureObjectService: AdventureObjectService/*, private notificationService: NotificationService*/) {
    this.adventureObjects = [];
    this.adventureObjectObservable = new Subject<string>();

    this.subscriptions.add(
      this.adventureObjectObservable.pipe(
        map(adventureId => this.adventureObjectService.getAdventureObjectsForAdventure(adventureId)),
        tap(response => {
          response.subscribe(objects => {
            this.adventureObjects = objects;
          });
        })
      ).subscribe()
    );
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.adventureObjectObservable.next(this.adventure.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateAdventureObject(adventureObject: AdventureObject): void {
    // this.updateSidebarLocation('script-edit');
    // this.updateAdventureScript(script);
    // this.adventureScriptsChange.emit(this.scripts);
  }

  newAdventureObject(): void {
    // this.updateSidebarLocation('script-edit');
    // this.updateAdventureScript(this.scriptService.createNewScript(this.adventure.id));
    // this.adventureScriptsChange.emit(this.scripts);
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocationChange.emit(newLocation);
  }

  updateAdventureScript(adventureObject: AdventureObject): void {
    this.adventureObjectChange.emit(adventureObject);
  }

  deleteAdventureObject(adventureObject: AdventureObject): void {
    // this.subscriptions.add(
    //   this.scriptService.deleteScript(script).subscribe(() => {
    //     const notification: Notification = {
    //       type: NOTIFICATION_TYPE_SUCCESS,
    //       message: 'script deleted'
    //     };
    //     this.notificationService.postNotification(notification);
    //     this.scripts = this.scripts.filter(s => {
    //       return s.id !== script.id;
    //     });
    //   })
    // );
  }
}
