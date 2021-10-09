import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-adventure-details-routes-edit',
  templateUrl: './adventure-details-routes-edit.component.html',
  styleUrls: ['./adventure-details-routes-edit.component.scss']
})
export class AdventureDetailsRoutesEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location: Location;
  private subscriptions: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location.currentValue) {
      console.log(this.location);
    }
  }

}
