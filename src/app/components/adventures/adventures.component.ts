import { Component, OnInit } from '@angular/core';
import { Adventure } from '../../models/adventure';
import { AdventureService } from '../../services/adventure.service';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.scss']
})
export class AdventuresComponent implements OnInit {
  adventures: Adventure[];

  constructor(private adventureService: AdventureService) { }

  ngOnInit(): void {
    this.getAdventures();
  }

  getAdventures(): void {
    this.adventureService.getAdventures()
      .subscribe(adv => this.adventures = adv);
  }
}
