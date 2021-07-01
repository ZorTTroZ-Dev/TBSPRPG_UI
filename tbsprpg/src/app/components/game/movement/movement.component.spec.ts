import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Adventure} from '../../../models/adventure';
import {Game} from '../../../models/game';
import {v4 as uuidv4} from 'uuid';
import {MapService} from '../../../services/map.service';
import {MovementComponent} from './movement.component';

describe('MovementComponent', () => {
  let fixture: ComponentFixture<MovementComponent>;
  let component: MovementComponent;
  const testAdventure: Adventure = {
    id: uuidv4().toString(),
    name: 'demo'
  };
  const testGame: Game = {
    id: uuidv4().toString(),
    adventureid: testAdventure.id,
    userid: uuidv4()
  };

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

    fixture = TestBed.createComponent(MovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
