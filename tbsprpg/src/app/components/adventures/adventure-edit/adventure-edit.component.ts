import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../models/adventure';
import {ScriptService} from '../../../services/script.service';
import {Subscription} from 'rxjs';
import {Script} from '../../../models/script';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.scss']
})

export class AdventureEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adventure: Adventure;
  @Output() editAdventureChange = new EventEmitter<Adventure>();
  private subscriptions: Subscription = new Subscription();
  scripts: Script[];

  constructor(private scriptsService: ScriptService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adventure.currentValue) {
      this.subscriptions.add(
        this.scriptsService.getScriptsForAdventure(this.adventure.id).subscribe(scripts => {
          this.scripts = scripts;
        })
      );
    }
  }

  updateAdventureEdit(adventure: Adventure): void {
    this.editAdventureChange.emit(adventure);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
