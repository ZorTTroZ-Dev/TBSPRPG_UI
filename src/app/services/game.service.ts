import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  updateState() {
    //or we make an update call and call gets on things that could be affected, it's probably
    //the most modulear

    //ok this will do a post which will update all of the status of the game on the backend

    //{game: "demo", command: "Pickup Banana"}
  }

  getGames() {
    //gets a list of available tbsp games, for now it will just be the demo, this won't be
    //used in game it will be used in the outer interface
  }
}
