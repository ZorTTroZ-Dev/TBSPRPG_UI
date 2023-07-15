import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {AdventureService} from '../../../../services/adventure.service';

@Component({
  selector: 'app-adventure-new',
  templateUrl: './adventure-new.component.html',
  styleUrls: ['./adventure-new.component.scss']
})
export class AdventureNewComponent implements OnInit {
  adventure: Adventure;
  @Output() sidebarLocationChange = new EventEmitter<string>();

  constructor(private adventureService: AdventureService) { }

  ngOnInit(): void {
    this.adventure = this.adventureService.createNewAdventure();
  }

  updateAdventureEdit(adventure: Adventure): void {
    this.adventure = adventure;
    this.sidebarLocationChange.emit('adventures');
  }
}
