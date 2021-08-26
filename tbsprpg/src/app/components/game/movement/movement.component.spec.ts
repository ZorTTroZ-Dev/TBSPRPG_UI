import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Adventure} from '../../../models/adventure';
import {Game} from '../../../models/game';
import {Route} from '../../../models/route';
import {v4 as uuidv4} from 'uuid';
import {MapService} from '../../../services/map.service';
import {MovementComponent} from './movement.component';
import {of} from 'rxjs';
import {SimpleChange} from '@angular/core';

describe('MovementComponent', () => {
  let fixture: ComponentFixture<MovementComponent>;
  let component: MovementComponent;
  let getRoutesForGame: jasmine.Spy;
  const testAdventure: Adventure = {
    id: uuidv4().toString(),
    name: 'demo'
  };
  const testGame: Game = {
    id: uuidv4().toString(),
    adventureid: testAdventure.id,
    userid: uuidv4()
  };
  const testRoutes: Route[] = [
    { id: uuidv4().toString(), name: 'route one', sourceKey: 'route one', source: '' },
    { id: uuidv4().toString(), name: 'route two', sourceKey: 'route two', source: '' }
  ];

  // setup the mock service
  const mapService = jasmine.createSpyObj(
    'MapService',
    ['getRoutesForGame']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementComponent],
      providers: [
        {provide: MapService, useValue: mapService}
      ]
    }).compileComponents();

    getRoutesForGame = mapService.getRoutesForGame.and.returnValue(of(testRoutes));
    fixture = TestBed.createComponent(MovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the routes', fakeAsync(() => {
    component.game = testGame;
    component.ngOnChanges({
      game: new SimpleChange(null, component.game, true)
    });
    fixture.detectChanges();
    tick();

    expect(component.isMovementError).toBeFalse();
    expect(getRoutesForGame.calls.any()).toBe(true);
    expect(component.routes.length).toBe(2);
    component.ngOnDestroy();
  }));

  it('should display error if routes not loaded in time', fakeAsync(() => {
    getRoutesForGame = mapService.getRoutesForGame.and.returnValue(of([]));
    component.game = testGame;
    component.ngOnChanges({
      game: new SimpleChange(null, component.game, true)
    });
    fixture.detectChanges();
    tick(10000);
    fixture.detectChanges();

    expect(component.isMovementError).toBeTrue();
    expect(fixture.nativeElement.querySelector('.movement-error')).not.toBeNull();
    component.ngOnDestroy();
  }));

  it('should display spinner until routes load', fakeAsync(() => {
    component.game = testGame;
    component.ngOnChanges({
      game: new SimpleChange(null, component.game, true)
    });
    fixture.detectChanges();
    tick();
    expect(fixture.nativeElement.querySelector('.movement-spinner')).not.toBeNull();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.movement-spinner')).toBeNull();
    component.ngOnDestroy();
  }));
});
