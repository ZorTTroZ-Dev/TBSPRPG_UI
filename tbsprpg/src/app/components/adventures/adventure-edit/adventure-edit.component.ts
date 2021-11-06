import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../models/adventure';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SourcesService} from '../../../services/sources.service';
import {SettingService} from '../../../services/setting.service';
import {AdventureService} from '../../../services/adventure.service';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.scss']
})

export class AdventureEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  adventureForm: FormGroup;
  sourceLabel: 'Adventure Content';
  private subscriptions: Subscription = new Subscription();

  constructor(private sourcesService: SourcesService,
              private settingService: SettingService,
              private adventureService: AdventureService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.subscriptions.add(
        this.sourcesService.getSourceForAdventureForKey(this.adventure.id,
          this.adventure.sourceKey, this.settingService.getLanguage()).subscribe(result => {
          this.adventureForm = this.adventureService.createAdventureFormGroupWithSource(this.adventure, result);
        })
      );
    }
  }

  updateAdventure(): void {

  }

}
