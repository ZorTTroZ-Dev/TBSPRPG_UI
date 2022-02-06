import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subscription} from 'rxjs';
import {LocationService} from '../../../../services/location.service';
import {Location} from '../../../../models/location';

@Component({
  selector: 'app-adventure-details-locations',
  templateUrl: './ad-locations.component.html',
  styleUrls: ['./ad-locations.component.scss']
})
export class AdLocationsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  locations: Location[];
  private subscriptions: Subscription = new Subscription();
  @Output() sidebarLocationChange = new EventEmitter<string>();
  @Output() adventureLocationChange = new EventEmitter<Location>();

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locations = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // the game has changed, get most recent content for display, and start polling
    if (changes.adventure.currentValue) {
      this.subscriptions.add(
        this.locationService.getLocationsForAdventure(this.adventure.id).subscribe(locations => {
          this.locations = locations;
        })
      );
    }
  }

  newLocation(): void {
    this.updateSidebarLocation('location-edit');
    this.updateAdventureLocation(this.locationService.createNewLocation(this.adventure.id));
  }

  updateLocations(location: Location): void {
    this.updateSidebarLocation('location-edit');
    this.updateAdventureLocation(location);
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocationChange.emit(newLocation);
  }

  updateAdventureLocation(location: Location): void {
    this.adventureLocationChange.emit(location);
  }
}
