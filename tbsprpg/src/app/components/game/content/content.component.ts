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
  isContentLoading: boolean;
  content: string[];
  contentIndex: number;
  contentMap: Map<string, string>;
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
    this.isContentLoading = false;
    this.contentMap = new Map<string, string>();

    this.subscriptions.add(
      this.contentObservable.pipe(
        map(key => this.contentService.getProcessedSourceForSourceKey(this.game.id, key)),
        tap(response => {
          response.subscribe(source => {
            this.contentMap.set(source.key, source.text);
            // this.content.push(source.key);
          });
        })
      ).subscribe()
    );

    this.subscriptions.add(
      this.contentService.getPollContent().subscribe(tick => {
        if (tick < 0) {
          this.isContentLoading = true;
        }
        this.contentService.getContentForGameAfterPosition(this.game.id, this.contentIndex).subscribe(content => {
          if (content !== null && content.id === this.game.id && content.index > this.contentIndex) {
            if (this.isContentLoading === true) {
              this.isContentLoading = false;
            }
            this.contentIndex = content.index;
            for (const key of content.sourceKeys) {
              this.content.push(key);
              this.contentObservable.next(key);
            }
          }
        });
      })
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
                this.content.push(key);
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
      timer(0, 10000).subscribe(tick => {
        this.contentService.pollContent(tick);
      })
    );
  }
}
