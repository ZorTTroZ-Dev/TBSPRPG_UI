import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

import { Game } from '../../../models/game';
import {ContentService} from "../../../services/content.service";
import {timer} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() game: Game;
  content: string[];
  contentIndex: number;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentIndex = 0;
    this.content = new Array();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.game.currentValue) {
      //get the last 10 content items
      this.pollContent();
    }
  }

  pollContent(): void {
    //check if the the contentIndex from the last retrieved entry is greater than the currentIndex
    //if it is add it to the content and update the contentIndex
    timer(1, 10000).pipe(
      switchMap(_ => this.contentService.getLatestContentForGame(this.game.id)),
      tap(content => {
        if(content.index > this.contentIndex) {
          this.content.push(content.texts[0])
          this.contentIndex = content.index;
        }
      })
    ).subscribe();
  }
}
