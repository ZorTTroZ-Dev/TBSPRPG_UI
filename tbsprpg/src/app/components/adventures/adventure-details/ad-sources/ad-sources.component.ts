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
    const self = this;
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
              self.subscriptions.add(
                self.sourcesService.getUnreferencedSourcesForAdventure(self.adventure.id).subscribe(sources => {
                  for (const source of sources) {
                    dt.row(':contains("' + source.key + '")').select();
                  }
                })
              );
            }
          },
          {
            text: 'Delete Selected',
            // tslint:disable-next-line:typedef
            action(e, dt) {
              const selectedRows = dt.rows( { selected: true } ).data();
              console.log(selectedRows);
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
