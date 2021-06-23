import {ComponentFixture, TestBed} from '@angular/core/testing';

import { GameComponent } from './game.component';
import {ActivatedRouteStub} from '../../testing/activated-route-stub';
import {ActivatedRoute} from '@angular/router';

let activatedRoute: ActivatedRouteStub;

describe('GameComponent', () => {
  let fixture: ComponentFixture<GameComponent>;
  let component: GameComponent;

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

  it('should load existing game', () => {});
  it('should start a new game if necessary', () => {});
  it('should give up if no game created in 10s', () => {});
});
