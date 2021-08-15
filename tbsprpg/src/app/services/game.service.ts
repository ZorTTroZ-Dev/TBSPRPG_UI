import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from '../models/game';
import { BaseService } from './base.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {
  private gamesUrl = '/api/games';

  constructor(private http: HttpClient, ) {
    super();
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
