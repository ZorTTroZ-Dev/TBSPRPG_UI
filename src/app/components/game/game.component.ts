import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameLayout } from './models/GameLayout';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  adventure: string;
  windowWidth: number;
  windowHeight: number;
  layout: GameLayout;

  constructor(private route: ActivatedRoute) {
    this.layout = new GameLayout();
  }

  ngOnInit(): void {
    //figure out the coordinates for everything
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.layout.updateValues(this.windowWidth, this.windowHeight);

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

    //for this skeleton we're going to assume they've started the game already
  }

  computeContentStyle(): any {
    //outline: 1px solid blue;position: absolute; top: 0; left: 0; width: {{windowWidth}}px; height: 616px;
    var style = { 
      'position': 'absolute',
      'top': this.layout.contentY + 'px',
      'left': this.layout.contentX + 'px',
      'width': this.layout.contentWidth + 'px',
      'height': this.layout.contentHeight + 'px',
      'overflow-y':'scroll'
    };
    return style;
  }

  computeMovementStyle(): any {
    var style = { 
      'position': 'absolute',
      'top': this.layout.movementY + 'px',
      'left': this.layout.movementX + 'px',
      'width': this.layout.movementWidth + 'px',
      'height': this.layout.movementHeight + 'px'
    };
    return style;
  }

  computeVerbStyle(): any {
    var style = { 
      'position': 'absolute',
      'top': this.layout.verbsY + 'px',
      'left': this.layout.verbsX + 'px',
      'width': this.layout.verbsWidth + 'px',
      'height': this.layout.verbsHeight + 'px'
    };
    return style;
  }

  computeInventoryStyle(): any {
    var style = { 
      'position': 'absolute',
      'top': this.layout.inventoryY + 'px',
      'left': this.layout.inventoryX + 'px',
      'width': this.layout.inventoryWidth + 'px',
      'height': this.layout.inventoryHeight + 'px',
      'overflow-y':'scroll'
    };
    return style;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.layout.updateValues(this.windowWidth, this.windowHeight);
  }
}
