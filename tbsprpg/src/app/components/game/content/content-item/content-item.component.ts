import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ContentService} from '../../../../services/content.service';
import {Subject, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Game} from '../../../../models/game';
import {Source} from '../../../../models/source';
import {SourceDirective} from '../../../../directives/source.directive';
import {SourceDisplayComponent} from '../source-display/source-display.component';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})

export class ContentItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() sourceKey: string;
  @Input() game: Game;
  source: Source;
  @ViewChild(SourceDirective, {static: true}) sourceHost!: SourceDirective;
  private subscriptions: Subscription = new Subscription();
  contentObservable: Subject<string>;

  constructor(private contentService: ContentService) {
    this.contentObservable = new Subject<string>();

    this.subscriptions.add(
      this.contentObservable.pipe(
        map(sourceKey => this.contentService.getProcessedSourceForSourceKey(this.game.id, sourceKey)),
        tap(response => {
          response.subscribe(source => {
              this.source = source;
              this.loadComponent();
          });
        })
      ).subscribe()
    );
  }

  loadComponent(): void {
    const viewContainerRef = this.sourceHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(SourceDisplayComponent);
    componentRef.instance.source = this.source;
    componentRef.instance.renderContent();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sourceKey !== undefined && changes.sourceKey.currentValue) {
      this.contentObservable.next(this.sourceKey);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
