import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ContentService} from '../../../services/content.service';
import {Subject, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {GameContentRoute} from '../../../models/gameContentRoute';
import {Content} from '../../../models/content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: GameContentRoute;
  @Input() newContent: Content;
  contentObservable: Subject<string>;
  content: string[];
  contentMap: Map<string, string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private contentService: ContentService) {
    this.contentObservable = new Subject<string>();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.content = [];
    this.contentMap = new Map<string, string>();

    this.subscriptions.add(
      this.contentObservable.pipe(
        map(key => this.contentService.getProcessedSourceForSourceKey(this.game.game.id, key)),
        tap(response => {
          response.subscribe(source => {
            this.contentMap.set(source.key, source.text);
          });
        })
      ).subscribe()
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.game !== undefined && changes.game.currentValue) {
      const content = this.game.contents;
      if (content !== null) {
        for (const key of content.sourceKeys.reverse()) {
          this.content.push(key);
          this.contentObservable.next(key);
        }
      }
    }

    if (changes.newContent !== undefined && changes.newContent.currentValue) {
      for (const key of this.newContent.sourceKeys) {
        this.content.push(key);
        this.contentObservable.next(key);
      }
    }
  }
}
