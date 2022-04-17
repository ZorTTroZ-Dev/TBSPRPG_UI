import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdventureService} from '../../../services/adventure.service';
import {Adventure} from '../../../models/adventure';
import {Subject, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {SettingService} from '../../../services/setting.service';
import {SourcesService} from '../../../services/sources.service';
import {UserService} from '../../../services/user.service';
import {PERMISSION_ADVENTURE_EDIT} from '../../../guards/permission.guard';

@Component({
  selector: 'app-adventure-explorer',
  templateUrl: './adventure-explorer.component.html',
  styleUrls: ['./adventure-explorer.component.scss']
})
export class AdventureExplorerComponent implements OnInit, OnDestroy {
  adventures: Adventure[];
  adventureSubject: Subject<Adventure>;
  sourceMap = new Map();
  showBreadcrumbs: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(private adventureService: AdventureService,
              private sourcesService: SourcesService,
              private settingService: SettingService,
              private userService: UserService) {
    this.adventures = [];
    this.adventureSubject = new Subject<Adventure>();
  }

  ngOnInit(): void {
    this.showBreadcrumbs = this.userService.userHasPermissions([PERMISSION_ADVENTURE_EDIT]);

    this.subscriptions.add(
      this.adventureSubject.pipe(
        switchMap(adventure => this.sourcesService.getProcessedSourceForAdventureForKey(
          adventure.id, adventure.descriptionSourceKey, this.settingService.getLanguage())),
        tap(source => {
          this.sourceMap.set(source.adventureId, source.text);
        })
      ).subscribe()
    );

    this.subscriptions.add(
      this.adventureService.getPublishedAdventures().subscribe(result => {
        this.adventures = result;
        for (const adventure of this.adventures) {
          this.adventureSubject.next(adventure);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
