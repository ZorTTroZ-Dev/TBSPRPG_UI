import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdventureService } from '../../services/adventure.service';
import { Adventure } from '../../models/adventure';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  adventure: Adventure;

  constructor(private route: ActivatedRoute,
    private adventureService: AdventureService) { }

  ngOnInit(): void {
    //I would like for people to be able to just click a link and be in the game
    //so this could be one of the most used entry points

    //let's try this using switch map
    this.route.params.pipe(
      switchMap( params => this.adventureService.getAdventureByName(params['adventure']) )
    ).subscribe( adv => {
      this.adventure = adv;
    });

    //contact the games service to see if they've started this game,
    //if so pick up from where they left off
    //otherwise post a new game for this adventure

    //for this skeleton we're going to assume they've started the game already
  }
}
