import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AdventureService} from '../../../services/adventure.service';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.scss']
})
export class AdventureEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  adventureForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private adventureService: AdventureService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.pipe(
        map(params => {
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
          this.adventureForm.setValue(adventure);
        }
      })
    );
  }

  updateAdventure(): void {
  }

}
