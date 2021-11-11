import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdventureService} from '../../../services/adventure.service';
import {Adventure} from '../../../models/adventure';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-adventure-explorer',
  templateUrl: './adventure-explorer.component.html',
  styleUrls: ['./adventure-explorer.component.scss']
})
export class AdventureExplorerComponent implements OnInit, OnDestroy {
  adventures: Adventure[];
  private subscriptions: Subscription = new Subscription();

  constructor(private adventureService: AdventureService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.adventureService.getAdventures().subscribe(result => {
        this.adventures = result;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
