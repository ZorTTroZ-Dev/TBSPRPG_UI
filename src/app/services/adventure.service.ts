import { Injectable } from '@angular/core';
import { Adventure } from '../models/adventure';
import { ADVENTURES } from '../models/mock-adventures';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  constructor() { }

  getAdventures() : Observable<Adventure[]> {
    return of(ADVENTURES);
  }
}
