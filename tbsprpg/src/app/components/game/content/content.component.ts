import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

import {Game} from '../../../models/game';
import {ContentService} from '../../../services/content.service';
import {from, of, Subject, Subscription, timer} from 'rxjs';
import {catchError, finalize, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Content} from '../../../models/content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: Game;
  initialContentLoaded: Subject<Content>;
  content: string[];
  contentIndex: number;
  private subscriptions: Subscription = new Subscription();

  constructor(private contentService: ContentService) {
    this.initialContentLoaded = new Subject<Content>();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.contentIndex = 0;
    this.content = [];
  }

  // called when the game is added to the component
  ngOnChanges(changes: SimpleChanges): void {
    // this should call the endpoint until it returns some content
    // the poll call should send the current position and be given all content since them

    // I also need to fix the map api trying to get button content before
    // the content api has the game defined, it needs to keep trying until
    // it can get the content so maybe throw an exception when handling the event
    // so that it tries to process the event again, giving the content api time to
    // handle the new game event.
    // if (changes.game.currentValue) {
    //   // get the last 10 content items
    //   this.subscriptions.add(
    //     this.contentService.getLastContentForGame(this.game.id, 10).pipe(
    //       tap(content => this.contentIndex = content.index),
    //       mergeMap(content => from(content.texts.reverse())),
    //       finalize(() => this.pollContent())
    //     ).subscribe( contentItem => {
    //       this.content.push(contentItem);
    //     })
    //   );
    // }
    if (changes.game.currentValue) {
      this.subscriptions.add(
        timer(0, 500).pipe(
          takeUntil(this.initialContentLoaded),
          map(tic => {
            if (tic >= 20) {
              throw new Error('failed to load game content');
            }
            return tic;
          }), // only try for 20 half seconds which is 10 seconds
          switchMap(() => this.contentService.getLastContentForGame(this.game.id, 10)),
          tap( content => {
            if (content != null) {
              this.contentIndex = content.index;
              this.initialContentLoaded.next(content);
            }
          }),
          mergeMap(content => from(content.texts.reverse())),
          tap(contentItem => this.content.push(contentItem)),
          finalize(() => this.pollContent()),
          catchError(() => of(null))
        ).subscribe()
      );
    }
  }

  pollContent(): void {
    // check if the the contentIndex from the last retrieved entry is greater than the currentIndex
    // if it is add it to the content and update the contentIndex
    // this.subscriptions.add(
    //   timer(1, 10000).pipe(
    //     switchMap(_ => this.contentService.getLatestContentForGame(this.game.id)),
    //     tap(content => {
    //       if (content.index > this.contentIndex) {
    //         this.content.push(content.texts[0]);
    //         this.contentIndex = content.index;
    //       }
    //     })
    //   ).subscribe()
    // );
  }
}
