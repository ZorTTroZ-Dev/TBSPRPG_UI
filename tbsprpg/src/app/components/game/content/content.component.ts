import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Game} from '../../../models/game';
import {ContentService} from '../../../services/content.service';
import {of, Subject, Subscription, timer} from 'rxjs';
import {catchError, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Content} from '../../../models/content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: Game;
  initialContentLoaded: Subject<Content>;
  contentObservable: Subject<string>;
  isContentError: boolean;
  content: string[];
  contentIndex: number;
  private subscriptions: Subscription = new Subscription();

  constructor(private contentService: ContentService) {
    this.initialContentLoaded = new Subject<Content>();
    this.contentObservable = new Subject<string>();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.contentIndex = 0;
    this.content = [];
    this.isContentError = false;

    this.subscriptions.add(
      this.contentObservable.pipe(
        // tap(key => {
        //   console.log(key);
        // }),
        map(key => this.contentService.getSourceForSourceKey(this.game.id, key)),
        tap(response => {
          response.subscribe(source => {
            this.content.push(source.text);
          });
        })
      ).subscribe()
    );
  }

  // called when the game is added to the component

  // I also need to fix the map api trying to get button content before
  // the content api has the game defined, it needs to keep trying until
  // it can get the content so maybe throw an exception when handling the event
  // so that it tries to process the event again, giving the content api time to
  // handle the new game event.
  ngOnChanges(changes: SimpleChanges): void {
    // the game has changed, get most recent content for display, and start polling
    if (changes.game.currentValue) {
      this.subscriptions.add(
        timer(0, 500).pipe(
          takeUntil(this.initialContentLoaded),
          map(tic => {
            if (tic >= 20) {
              this.isContentError = true;
              throw new Error('failed to load game content');
            }
            return tic;
          }), // only try for 20 half seconds which is 10 seconds
          switchMap(() => this.contentService.getLastContentForGame(this.game.id, 10)),
          tap( content => {
            if (content !== null && content.id === this.game.id) {
              this.contentIndex = content.index;
              for (const key of content.sourceKeys.reverse()) {
                this.contentObservable.next(key);
              }
              this.initialContentLoaded.next(content);
              this.pollContent();
            }
          }),
          catchError(() => of(null))
        ).subscribe()
      );
    }
  }

  pollContent(): void {
    // check if the the contentIndex from the last retrieved entry is greater than the currentIndex
    // if it is add it to the content and update the contentIndex
    this.subscriptions.add(
      timer(0, 10000).pipe(
        switchMap(() => this.contentService.getContentForGameAfterPosition(this.game.id, this.contentIndex)),
        tap(content => {
          if (content !== null && content.id === this.game.id && content.index > this.contentIndex) {
            this.contentIndex = content.index;
            this.content.push(...content.sourceKeys);
          }
        })
      ).subscribe()
    );
  }
}
