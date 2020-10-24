import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  adventure: string;
  windowWidth: number;
  windowHeight: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //figure out the coordinates for everything
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

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

  computeContentStyle(): any {
    //outline: 1px solid blue;position: absolute; top: 0; left: 0; width: {{windowWidth}}px; height: 616px;
    var style = { 
      'position': 'absolute',
      'top': '0px',
      'left': '0px',
      'width': this.windowWidth + 'px',
      'height': this.windowHeight - (this.windowHeight / 1.61 / 1.61 / 1.61) + 'px',
      'overflow':'scroll'
    };
    return style;
  }

  computeMovementStyle(): any {
    var style = { 
      'position': 'absolute',
      'top': this.windowHeight - (this.windowHeight / 1.61 / 1.61 / 1.61) + 'px',
      'left': this.windowWidth - (this.windowWidth / 1.61 / 1.61 / 1.61) + 'px',
      'width': (this.windowWidth / 1.61 / 1.61 / 1.61) + 'px',
      'height': (this.windowHeight / 1.61 / 1.61 / 1.61) + 'px'
    };
    return style;
  }

  computeVerbStyle(): any {
    var style = { 
      'position': 'absolute',
      'top': this.windowHeight - (this.windowHeight / 1.61 / 1.61 / 1.61) + 'px',
      'left': '0px',
      'width': this.windowWidth - (this.windowWidth / 1.61 / 1.61 / 1.61) + 'px',
      'height': (this.windowHeight / 1.61 / 1.61 / 1.61) + 'px'
    };
    return style;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }
}
