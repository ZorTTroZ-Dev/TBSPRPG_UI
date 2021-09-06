import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Adventure} from '../../../models/adventure';
import {AdventureTableTypes} from '../../../view_models/adventure-table-types';
import {AdventureService} from '../../../services/adventure.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-adventures-table',
  templateUrl: './adventures-table.component.html',
  styleUrls: ['./adventures-table.component.scss']
})

export class AdventuresTableComponent implements OnInit, OnChanges {
  @Input() tableType: string;
  adventures: Adventure[];

  constructor(private adventureService: AdventureService, private userService: UserService) { }

  ngOnInit(): void {
    this.adventures = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // the game has changed, get most recent content for display, and start polling
    if (changes.tableType.currentValue) {
      if (this.tableType === AdventureTableTypes.OWNED_ADVENTURES) {
        this.getOwnedAdventures();
      }
    }
  }

  getOwnedAdventures(): void {
    const userId = this.userService.getUserId();
    this.adventureService.getAdventuresCreatedBy(userId).subscribe(adventures => {
      this.adventures.push(...adventures);
    });
  }

}
