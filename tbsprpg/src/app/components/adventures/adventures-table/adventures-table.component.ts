import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../models/adventure';
import {AdventureTableTypes} from '../../../view_models/adventure-table-types';
import {AdventureService} from '../../../services/adventure.service';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-adventures-table',
  templateUrl: './adventures-table.component.html',
  styleUrls: ['./adventures-table.component.scss']
})

export class AdventuresTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tableType: string;
  adventures: Adventure[];
  private subscriptions: Subscription = new Subscription();

  constructor(private adventureService: AdventureService, private userService: UserService) { }

  ngOnInit(): void {
    this.adventures = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // the game has changed, get most recent content for display, and start polling
    if (changes.tableType.currentValue) {
      if (this.tableType === AdventureTableTypes.CREATED_ADVENTURES) {
        this.getOwnedAdventures();
      }
    }
  }

  getOwnedAdventures(): void {
    const userId = this.userService.getUserId();
    this.subscriptions.add(
      this.adventureService.getAdventuresCreatedBy(userId).subscribe(adventures => {
        this.adventures.push(...adventures);
      })
    );
  }

  deleteAdventure(adventure: Adventure): void {
    this.subscriptions.add(
      this.adventureService.deleteAdventure(adventure).subscribe(() => {
        console.log('adventure deleted');
      })
    );
  }

}
