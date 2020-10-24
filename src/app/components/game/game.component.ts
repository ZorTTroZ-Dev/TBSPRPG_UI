import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  adventure: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.adventure = params['adventure'];
    });

    //I would like for people to be able to just click a link and be in the game
    //so this could be one of the most used entry points

    //check if someone is logged in, if not kick back to login screen

    //check if we have an adventure and it's valid,
    //if not we'll kick back to console, eventually let them pick from a dialog box

    //contact the games service to see if they've started this game,
    //if so pick up from where they left off
    //otherwise post a new game for this adventure
  }

}
