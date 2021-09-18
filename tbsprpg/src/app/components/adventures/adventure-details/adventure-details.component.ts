import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdventureService} from '../../../services/adventure.service';
import {map, switchMap} from 'rxjs/operators';
import {Adventure} from '../../../models/adventure';

@Component({
  selector: 'app-adventure-details',
  templateUrl: './adventure-details.component.html',
  styleUrls: ['./adventure-details.component.scss']
})

export class AdventureDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  adventure: Adventure;
  location: string = null;

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
            this.location = params.get('location');
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
}
