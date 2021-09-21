import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-adventure-details-location-edit',
  templateUrl: './adventure-details-location-edit.component.html',
  styleUrls: ['./adventure-details-location-edit.component.scss']
})
export class AdventureDetailsLocationEditComponent implements OnInit, OnChanges {
  @Input() location: Location;
  locationForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });
  // private subscriptions: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // the game has changed, get most recent content for display, and start polling
    if (changes.location.currentValue) {
      this.locationForm.setValue(this.location);
    }
  }

}
