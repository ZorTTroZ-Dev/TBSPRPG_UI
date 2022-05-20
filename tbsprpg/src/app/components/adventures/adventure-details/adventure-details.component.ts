import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdventureService} from '../../../services/adventure.service';
import {map, switchMap} from 'rxjs/operators';
import {Adventure} from '../../../models/adventure';
import {Location} from '../../../models/location';
import {Script} from '../../../models/script';

@Component({
  selector: 'app-adventure-details',
  templateUrl: './adventure-details.component.html',
  styleUrls: ['./adventure-details.component.scss']
})

export class AdventureDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  adventure: Adventure;
  location: Location;
  script: Script;
  sidebarLocation: string = null;

  constructor(private route: ActivatedRoute,
              private adventureService: AdventureService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.pipe(
        map(params => {
          if (params.get('location')) {
            this.sidebarLocation = params.get('location');
          } else {
            this.sidebarLocation = 'home';
          }
          if (params.get('adventureId') === '') {
            return null;
          }
          return params.get('adventureId');
        }),
        switchMap(adventureId => {
          if (adventureId !== null) {
            return this.adventureService.getAdventureById(adventureId);
          }
          return of(null);
        })
      ).subscribe(adventure => {
        if (adventure !== null) {
          this.adventure = adventure;
        }
      })
    );
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocation = newLocation;
  }

  updateAdventureLocation(location: Location): void {
    this.location = location;
  }

  updateAdventureEdit(adventure: Adventure): void {
    this.adventure = adventure;
  }

  updateAdventureScript(script: Script): void {
    this.script = script;
  }
}
