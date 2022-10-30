import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Game} from '../models/game';
import {BaseService} from './base.service';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GameUser} from '../models/gameUser';
import {FormControl, FormGroup} from '@angular/forms';
import {GameState} from '../models/gameState';
import {GameContentRoute} from '../models/gameContentRoute';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {
  private gamesUrl: string;

  constructor(http: HttpClient, ) {
    super(http);
    this.gamesUrl = this.getBaseUrl() + '/api/games';
  }

  createGameFormGroup(game: GameUser, gameState: GameState): FormGroup {
    const gameFormGroup = new FormGroup( {
      id: new FormControl<string>(''),
      adventureId: new FormControl<string>(''),
      userId: new FormControl<string>('')
    });
    const gameStateFormGroup = new FormGroup({
      gameId: new FormControl<string>(''),
      state: new FormControl<string>('')
    });
    gameFormGroup.setValue(game.game);
    gameStateFormGroup.setValue(gameState);
    return new FormGroup({
      game: gameFormGroup,
      gameState: gameStateFormGroup
    });
  }

  deleteGame(game: Game): Observable<any> {
    return this.http.delete(this.gamesUrl + '/' + game.id)
      .pipe(
        catchError(this.handleError<any>('deleteGame', null))
      );
  }

  getGamesForAdventure(adventureId: string): Observable<GameUser[]> {
    const options = {
      params: new HttpParams()
        .set('adventureId', adventureId)
    };
    return this.http.get<GameUser[]>(this.gamesUrl, options)
      .pipe(
        catchError(this.handleError<GameUser[]>('getGamesForAdventure', null))
      );
  }

  getGameForAdventure(adventureId: string): Observable<Game> {
    return this.http.get<Game>(this.gamesUrl + '/adventure/' + adventureId)
    .pipe(
      catchError(this.handleError<Game>('getGameForAdventure', null))
    );
  }

  startGame(adventureId: string): Observable<GameContentRoute> {
    return this.http.get<GameContentRoute>(this.gamesUrl + '/start/' + adventureId)
    .pipe(
      catchError(this.handleError<GameContentRoute>('startGame', null))
    );
  }

  getStateForGame(gameId: string): Observable<any> {
    return this.http.get<any>(this.gamesUrl + '/state/' + gameId)
      .pipe(
        catchError(this.handleError<any>('getStateForGame', null))
      );
  }

  updateGameState(gameState: GameState): Observable<any> {
    return this.http.put<any>(this.gamesUrl + '/state', {
      gameId: gameState.gameId,
      gameState: gameState.state
    }).pipe(
      catchError(this.handleError<any>('updateGameState', null))
    );
  }
}
