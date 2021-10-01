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
  private sourceFormGroupKey = 'source';
  locationForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    initial: new FormControl(''),
    source: new FormGroup({
      text: new FormControl('')
    })
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
      this.subscriptions.add(
        this.sourcesService.getSourceForAdventureForKey(this.location.adventureId,
          this.location.sourceKey, 'en').subscribe(result => {
            this.locationForm.controls[this.sourceFormGroupKey].patchValue(result);
        })
      );
    }
  }

}
