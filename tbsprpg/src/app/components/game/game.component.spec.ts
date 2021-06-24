import {ComponentFixture, TestBed} from '@angular/core/testing';

import { GameComponent } from './game.component';
import {ActivatedRouteStub} from '../../testing/activated-route-stub';
import {ActivatedRoute} from '@angular/router';
import {Game} from '../../models/game';

import { v4 as uuidv4 } from 'uuid';

let activatedRoute: ActivatedRouteStub;

describe('GameComponent', () => {
  let fixture: ComponentFixture<GameComponent>;
  let component: GameComponent;
  const testGame: Game = {
    id: uuidv4(),
    adventureid: uuidv4(),
    userid: uuidv4()
  };

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load existing game', () => {});
  // it('should display spinner until game loads', () => {});

  it('should fail if no adventure param', () => {
    activatedRoute.setParamMap({adventure: ''});
    fixture.detectChanges();

    // should display error html
    expect(component.isGameError).toBe(true);
    expect(fixture.nativeElement.querySelector('.game-error')).not.toBeNull();
  });

  // it('should call start game', () => {});
  // it('should give up if no game loaded in 10s', () => {});
});
