import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { GameComponent } from './game.component';
import {ActivatedRouteStub} from '../../testing/activated-route-stub';
import {ActivatedRoute} from '@angular/router';
import {Game} from '../../models/game';
import { v4 as uuidv4 } from 'uuid';
import {of} from 'rxjs';
import {GameService} from '../../services/game.service';
import {Adventure} from '../../models/adventure';
import {AdventureService} from '../../services/adventure.service';
import {Component, Input} from '@angular/core';

let activatedRoute: ActivatedRouteStub;

describe('GameComponent', () => {
  let fixture: ComponentFixture<GameComponent>;
  let component: GameComponent;
  let startGameSpy: jasmine.Spy;
  let getGameForAdventureSpy: jasmine.Spy;
  let getAdventureByNameSpy: jasmine.Spy;
  const testAdventure: Adventure = {
    id: uuidv4(),
    name: 'demo'
  };
  const testGame: Game = {
    id: uuidv4(),
    adventureid: testAdventure.id,
    userid: uuidv4()
  };

  // setup the mock services
  const gameService = jasmine.createSpyObj(
    'GameService',
    ['startGame', 'getGameForAdventure']);
  startGameSpy = gameService.startGame.and.returnValue(of({}));
  getGameForAdventureSpy = gameService.getGameForAdventure.and.returnValue(of(testGame));

  const adventureService = jasmine.createSpyObj(
    'AdventureService',
    ['getAdventureByName']
  );
  getAdventureByNameSpy = adventureService.getAdventureByName.and.returnValue(of(testAdventure));

  // stub components
  @Component({selector: 'app-content', template: ''})
  class AppStubContent {
    @Input() game: Game;
  }
  @Component({selector: 'app-movement', template: ''})
  class AppStubMovement {
    @Input() game: Game;
  }

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        AppStubContent,
        AppStubMovement
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: AdventureService, useValue: adventureService },
        { provide: GameService, useValue: gameService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('game should load game', fakeAsync(() => {
    activatedRoute.setParamMap({adventure: 'demo'});
    getGameForAdventureSpy = gameService.getGameForAdventure.and.returnValue(of(testGame));
    fixture.detectChanges();

    expect(getAdventureByNameSpy.calls.any()).toBe(true);
    expect(component.adventure.id).toBe(testAdventure.id);
    expect(component.game).toBeNull();
    expect(startGameSpy.calls.any()).toBe(true);

    tick();
    fixture.detectChanges();
    expect(component.game).not.toBeNull();
    expect(getGameForAdventureSpy.calls.any()).toBe(true);
  }));

  it('should fail if no adventure param', () => {
    activatedRoute.setParamMap({adventure: ''});
    fixture.detectChanges();

    // should display error html
    expect(component.isGameError).toBe(true);
    expect(fixture.nativeElement.querySelector('.game-error')).not.toBeNull();
  });

  it('should call get adventure by name and start game', () => {
    activatedRoute.setParamMap({adventure: 'demo'});
    fixture.detectChanges();

    // start game should have been called
    expect(getAdventureByNameSpy.calls.any()).toBe(true);
    expect(component.adventure.id).toBe(testAdventure.id);
    expect(component.game).toBeNull();
    expect(startGameSpy.calls.any()).toBe(true);
  });

  it('should display error if game not loaded in time', fakeAsync(() => {
    activatedRoute.setParamMap({adventure: 'demo'});
    getGameForAdventureSpy = gameService.getGameForAdventure.and.returnValue(of(null));
    fixture.detectChanges();

    expect(component.game).toBeNull();

    tick(10000);
    fixture.detectChanges();
    expect(component.game).toBeNull();
    expect(component.isGameError).toBe(true);
    expect(fixture.nativeElement.querySelector('.game-error')).not.toBeNull();
  }));
});
