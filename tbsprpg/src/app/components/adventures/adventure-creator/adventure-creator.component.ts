import { Component, OnInit } from '@angular/core';
import {AdventureTableTypes} from '../../../view_models/adventure-table-types';

@Component({
  selector: 'app-adventure-creator',
  templateUrl: './adventure-creator.component.html',
  styleUrls: ['./adventure-creator.component.scss']
})
export class AdventureCreatorComponent implements OnInit {
  adventureTableType: string;
  sidebarLocation: string = null;

  constructor() { }

  ngOnInit(): void {
    this.adventureTableType = AdventureTableTypes.CREATED_ADVENTURES;
    this.sidebarLocation = 'adventures';
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocation = newLocation;
  }
}
