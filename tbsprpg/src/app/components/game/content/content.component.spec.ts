import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContentComponent} from './content.component';
// import {of} from 'rxjs';
import {ContentService} from '../../../services/content.service';


describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let component: ContentComponent;

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
});
