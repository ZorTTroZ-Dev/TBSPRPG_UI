import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {Source} from '../../../../models/source';
import {SourcesService} from '../../../../services/sources.service';
import {map, tap} from 'rxjs/operators';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {NotificationService} from '../../../../services/notification.service';

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

  constructor(private sourcesService: SourcesService, private notificationService: NotificationService) {
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
      columnDefs: [
        {
          target: 1,
          visible: false,
          searchable: false,
        }
      ],
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
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < selectedRows.length; i++) {
                // self.sourcesService.deleteSource(selectedRows[i][1]).subscribe(() => {
                  const notification: Notification = {
                    type: NOTIFICATION_TYPE_SUCCESS,
                    message: 'source deleted'
                  };
                  self.notificationService.postNotification(notification);
                  self.sources = self.sources.filter(item => item.id !== selectedRows[i][1]);
                  // or trigger observable
                // });
              }
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
