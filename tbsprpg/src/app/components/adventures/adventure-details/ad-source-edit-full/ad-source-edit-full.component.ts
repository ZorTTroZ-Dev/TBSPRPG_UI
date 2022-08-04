import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Source} from '../../../../models/source';
import {FormGroup} from '@angular/forms';
import {SourcesService} from '../../../../services/sources.service';
import {Script} from '../../../../models/script';
import {ScriptService} from '../../../../services/script.service';
import {Subscription} from 'rxjs';
import {SettingService} from '../../../../services/setting.service';
import {Notification, NOTIFICATION_TYPE_SUCCESS} from '../../../../models/notification';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-ad-source-edit-full',
  templateUrl: './ad-source-edit-full.component.html',
  styleUrls: ['./ad-source-edit-full.component.scss']
})
export class AdSourceEditFullComponent implements OnInit, OnChanges, OnDestroy {
  @Input() source: Source;
  scripts: Script[];
  languages: string[];
  sourceForm: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private sourcesService: SourcesService,
              private scriptService: ScriptService,
              private settingService: SettingService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.languages = this.settingService.getLanguages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.source.currentValue) {
      console.log(this.source);
      this.sourceForm = this.sourcesService.createFormGroupForSource(this.source);

      this.subscriptions.add(
        this.scriptService.getScriptsForAdventure(this.source.adventureId).subscribe(result => {
          this.scripts = result;
        })
      );
    }
  }

  updateSource(): void {
    this.subscriptions.add(
      this.sourcesService.updateSource(this.sourceForm.value).subscribe(() => {
        const notification: Notification = {
          type: NOTIFICATION_TYPE_SUCCESS,
          message: 'source updated'
        };
        this.notificationService.postNotification(notification);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
