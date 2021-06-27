import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {ContentComponent} from './content.component';
// import {of} from 'rxjs';
import {ContentService} from '../../../services/content.service';
import {Adventure} from '../../../models/adventure';
import {Game} from '../../../models/game';
import { v4 as uuidv4 } from 'uuid';
import {SimpleChange} from '@angular/core';

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let component: ContentComponent;
  const testAdventure: Adventure = {
    id: uuidv4(),
    name: 'demo'
  };
  const testGame: Game = {
    id: uuidv4(),
    adventureid: testAdventure.id,
    userid: uuidv4()
  };

  // setup the mock service
  const contentService = jasmine.createSpyObj(
    'ContentService',
    ['getLatestContentForGame', 'getLastContentForGame']);
  // startGameSpy = gameService.startGame.and.returnValue(of({}));
  // getGameForAdventureSpy = gameService.getGameForAdventure.and.returnValue(of(testGame));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentComponent],
      providers: [
        {provide: ContentService, useValue: contentService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load at most last 10 content items when game added', fakeAsync(() => {
    component.game = testGame;

    component.ngOnChanges({
      game: new SimpleChange(null, component.game, true)
    });

    fixture.detectChanges();
    component.ngOnDestroy();
  }));

  it('should poll for new content', fakeAsync(() => {}));
});
