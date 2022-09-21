import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
  sources: Source[];
  sourceObservable: Subject<string>;
  private subscriptions: Subscription = new Subscription();
  dtOptions: any = {};

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
    this.dtOptions = {
      select: {
        className: 'datatable-selected',
        blurable: true
      },
      dom: 'Bfrtip',
      buttons: {
        dom: {
          button: {
            className: 'btn btn-dark mx-2'
          }
        },
        buttons: [
          {
            text: 'Select Unreferenced',
            // tslint:disable-next-line:typedef
            action(e, dt) {
              // pass an adventure id through an observable,
              // it will call the endpoint to get a list of sources that are unreferenced
              // use the dt object to select rows that are an unreferenced source
              console.log(dt);
            }
          }
        ]
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.sourceObservable.next(this.adventure.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
