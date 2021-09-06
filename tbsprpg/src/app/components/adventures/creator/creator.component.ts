import { Component, OnInit } from '@angular/core';
import {AdventureTableTypes} from '../../../view_models/adventure-table-types';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  adventureTableType: string;

  constructor() { }

  ngOnInit(): void {
    this.adventureTableType = AdventureTableTypes.OWNED_ADVENTURES;
  }

}
