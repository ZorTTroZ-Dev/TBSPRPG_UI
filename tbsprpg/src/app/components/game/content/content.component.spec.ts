import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ContentComponent} from './content.component';
import {of} from 'rxjs';
import {ContentService} from '../../../services/content.service';
import {Adventure} from '../../../models/adventure';
import {Game} from '../../../models/game';
import {v4 as uuidv4} from 'uuid';
import {SimpleChange} from '@angular/core';
import {Content} from '../../../models/content';

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let component: ContentComponent;
  let getLastContentForGame: jasmine.Spy;
  let getContentForGameAfterPosition: jasmine.Spy;
  const testAdventure: Adventure = {
    id: uuidv4().toString(),
    name: 'demo'
  };
  const testGame: Game = {
    id: uuidv4().toString(),
    adventureid: testAdventure.id,
    userid: uuidv4()
  };
  const testContent: Content = {
    id: testGame.id,
    index: 12,
    sourceKeys: [
      'one', 'two', 'three', 'four', 'five',
      'six', 'seven', 'eight', 'nine', 'ten'
    ]
  };

  // setup the mock service
  const contentService = jasmine.createSpyObj(
    'ContentService',
    ['getContentForGameAfterPosition', 'getLastContentForGame']);

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

  it('should load last content items when game added', fakeAsync(() => {
    getLastContentForGame = contentService.getLastContentForGame.and.returnValue(of(testContent));
    getContentForGameAfterPosition = contentService.getContentForGameAfterPosition.and.returnValue(of(
      {
        id: testGame.id,
        index: 12,
        texts: []
      }
    ));
    component.game = testGame;
    component.ngOnChanges({
      game: new SimpleChange(null, component.game, true)
    });
    fixture.detectChanges();
    tick();

    expect(component.isContentError).toBeFalse();
    expect(getLastContentForGame.calls.any()).toBe(true);
    expect(component.contentIndex).toBe(12);
    expect(component.content.length).toBe(10);
    component.ngOnDestroy();
  }));

  it('spinner should display until content loaded', fakeAsync(() => {
    getLastContentForGame = contentService.getLastContentForGame.and.returnValue(of(testContent));
    getContentForGameAfterPosition = contentService.getContentForGameAfterPosition.and.returnValue(of(
      {
        id: testGame.id,
        index: 12,
        texts: []
      }
    ));
    component.game = testGame;
    component.ngOnChanges({
      game: new SimpleChange(null, component.game, true)
    });
    fixture.detectChanges();
    tick();
    expect(fixture.nativeElement.querySelector('.content-spinner')).not.toBeNull();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.content-spinner')).toBeNull();
    component.ngOnDestroy();
  }));

  it('nil uuid is not valid content', fakeAsync(() => {
    getLastContentForGame = contentService.getLastContentForGame.and.returnValue(of(
      {}
    ));
    component.game = testGame;
    component.ngOnChanges({
      game: new SimpleChange(null, component.game, true)
    });
    fixture.detectChanges();
    tick(10000);

    expect(component.isContentError).toBeTrue();
    expect(getLastContentForGame.calls.any()).toBe(true);
    component.ngOnDestroy();
  }));

  it('should display error if content not loaded in time', fakeAsync(() => {
    getLastContentForGame = contentService.getLastContentForGame.and.returnValue(of(
      {}
    ));
    component.game = testGame;
    component.ngOnChanges({
      game: new SimpleChange(null, component.game, true)
    });
    fixture.detectChanges();
    tick(10000);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.content-error')).not.toBeNull();
    component.ngOnDestroy();
  }));

  it('should poll for new content', fakeAsync(() => {
    component.game = testGame;
    component.contentIndex = 12;
    getContentForGameAfterPosition = contentService.getContentForGameAfterPosition.and.returnValue(of(
      {
        id: testGame.id,
        index: 13,
        texts: ['eleven']
      }
    ));
    component.pollContent();
    tick();

    expect(component.contentIndex).toBe(13);
    expect(component.content.length).toBe(1);
    component.ngOnDestroy();
  }));

  it('should only update content with new content', fakeAsync(() => {
    component.game = testGame;
    component.contentIndex = 12;
    getContentForGameAfterPosition = contentService.getContentForGameAfterPosition.and.returnValue(of(
      {
        id: testGame.id,
        index: 12,
        texts: []
      }
    ));
    component.pollContent();
    tick();

    expect(component.contentIndex).toBe(12);
    expect(component.content.length).toBe(0);
    component.ngOnDestroy();
  }));

  it('should only update content with non-empty content', fakeAsync(() => {
    component.game = testGame;
    component.contentIndex = 12;
    getContentForGameAfterPosition = contentService.getContentForGameAfterPosition.and.returnValue(of(
      null
    ));
    component.pollContent();
    tick();

    expect(component.contentIndex).toBe(12);
    expect(component.content.length).toBe(0);
    component.ngOnDestroy();
  }));
});
