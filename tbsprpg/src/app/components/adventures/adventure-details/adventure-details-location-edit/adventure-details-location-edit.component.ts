import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../../../models/location';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SourcesService} from '../../../../services/sources.service';

@Component({
  selector: 'app-adventure-details-location-edit',
  templateUrl: './adventure-details-location-edit.component.html',
  styleUrls: ['./adventure-details-location-edit.component.scss']
})
export class AdventureDetailsLocationEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location: Location;
  locationForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    content: new FormControl('')
  });
  private subscriptions: Subscription = new Subscription();

  constructor(private sourcesService: SourcesService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location.currentValue) {
      this.locationForm.patchValue(this.location);
      // look up the content for the location source key
      // TODO: Need to attach adventure id to location
      // TODO: Need to add the source key to the location
      // TODO: Add language toggle
      this.subscriptions.add(
        this.sourcesService.getSourceForAdventureForKey(
          '54343248-32cc-4a50-a7fc-1c27274ab99e',
          '91ae3507-6aa8-4fbc-9e9b-055d93ed8e18', 'en')
          .subscribe(result => {
            this.locationForm.controls['content'].setValue(result.text);
        })
      );
    }
  }

}
