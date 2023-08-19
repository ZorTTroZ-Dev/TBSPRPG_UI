import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {GameContentRoute} from '../../../models/gameContentRoute';
import {Content} from '../../../models/content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() game: GameContentRoute;
  @Input() newContent: Content;
  content: string[];

  constructor() {
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.content = [];

    // this.subscriptions.add(
    //   // this.contentObservable.pipe(
    //   //   map(key => this.contentService.getProcessedSourceForSourceKey(this.game.game.id, key)),
    //   //   tap(response => {
    //   //     response.subscribe(source => {
    //   //       // const parser = new DOMParser();
    //   //       // const virtualDoc = parser.parseFromString(source.text, 'text/html');
    //   //       // const objects = virtualDoc.getElementsByTagName('object');
    //   //       // Array.from(objects).forEach(object => {
    //   //       //   const objectDescription = object.attributes[this.toolTipAttributeName].value;
    //   //       //   const objectContent = object.innerHTML;
    //   //       //   const newElement = virtualDoc.createElement('span');
    //   //       //   newElement.setAttribute('ngbTooltip', objectDescription);
    //   //       //   newElement.innerHTML = objectContent;
    //   //       //   object.replaceWith(newElement);
    //   //       // });
    //   //       // source.text = virtualDoc.body.innerHTML;
    //   //       this.contentMap.set(source.key, source);
    //   //     });
    //   //   })
    //   // ).subscribe()
    // );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.game !== undefined && changes.game.currentValue) {
      const content = this.game.contents;
      if (content !== null) {
        for (const key of content.sourceKeys.reverse()) {
          this.content.push(key);
        }
      }
    }

    if (changes.newContent !== undefined && changes.newContent.currentValue) {
      for (const key of this.newContent.sourceKeys) {
        this.content.push(key);
      }
    }
  }
}
