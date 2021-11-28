import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Game} from '../models/game';
import {BaseService} from './base.service';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {
  private gamesUrl = '/api/games';

  constructor(http: HttpClient, ) {
    super(http);
  }

  getGamesForAdventure(adventureId: string): Observable<Game[]> {
    const options = {
      params: new HttpParams()
        .set('adventureId', adventureId)
    };
    return this.http.get<Game[]>(this.gamesUrl, options)
      .pipe(
        catchError(this.handleError<Game[]>('getGamesForAdventure', null))
      );
  }

  getGameForAdventure(adventureId: string): Observable<Game> {
    return this.http.get<Game>(this.gamesUrl + '/adventure/' + adventureId)
    .pipe(
      catchError(this.handleError<Game>('getGameForAdventure', null))
    );
  }

  startGame(adventureId: string): Observable<any> {
    return this.http.get<any>(this.gamesUrl + '/start/' + adventureId)
    .pipe(
      catchError(this.handleError<any>('startGame', null))
    );
  }
}
