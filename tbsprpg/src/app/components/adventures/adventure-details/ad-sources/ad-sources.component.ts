import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {Source} from '../../../../models/source';
import {SourcesService} from '../../../../services/sources.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-ad-sources',
  templateUrl: './ad-sources.component.html',
  styleUrls: ['./ad-sources.component.scss']
})
export class AdSourcesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  @Output() sidebarLocationChange = new EventEmitter<string>();
  @Output() adventureSourceChange = new EventEmitter<Source>();
  sources: Source[];
  sourceObservable: Subject<string>;
  private subscriptions: Subscription = new Subscription();

  constructor(private sourcesService: SourcesService) {
    this.sources = [];
    this.sourceObservable = new Subject<string>();

    this.subscriptions.add(
      this.sourceObservable.pipe(
        map(adventureId => this.sourcesService.getAllSourceForAdventure(adventureId)),
        tap(response => {
          response.subscribe(sources => {
            this.sources = sources;
          });
        })
      ).subscribe()
    );
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.sourceObservable.next(this.adventure.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  newSource(): void {
    this.updateSidebarLocation('source-edit');
    this.adventureSourceChange.emit(this.sourcesService.createNewSource(this.adventure.id));
  }

  updateSource(source: Source): void {
    this.updateSidebarLocation('source-edit');
    this.adventureSourceChange.emit(source);
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocationChange.emit(newLocation);
  }
}
