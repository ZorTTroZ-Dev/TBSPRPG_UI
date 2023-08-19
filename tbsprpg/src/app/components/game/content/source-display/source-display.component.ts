import {Component, Input} from '@angular/core';
import {Source} from '../../../../models/source';
import {DomSanitizer} from '@angular/platform-browser';
import {SourceToken} from '../../../../models/sourceToken';

@Component({
  selector: 'app-source-display',
  templateUrl: './source-display.component.html',
  styleUrls: ['./source-display.component.scss']
})
export class SourceDisplayComponent {
  @Input() source: Source;
  tokens: SourceToken[];

  constructor(private sanitizer: DomSanitizer) {
  }

  renderContent(): void {
    // update api to not return html
    // tokenize source text based on object tag <object>tooltip=xxx;text=yyy<object>
    // install showdown markup library
    // run showdown on each piece of text
    this.tokens = this.source.text.split(/<p>|<\/p>/).map(token => {
      if (token === '\n') {
        return {
          text: this.sanitizer.bypassSecurityTrustHtml('<br>'),
          tooltip: ''
        };
      }
      return {
        text: this.sanitizer.bypassSecurityTrustHtml('<br>' + token),
        tooltip: 'xxx'
      };
    });
    this.tokens.shift();
    this.tokens.pop();
    // console.log(this.tokens);
    // if (token.match(/<object|object>/) !== null) {
    //   token.split(/<object|object>/).map(object => {
    //     console.log(object);
    //   });
    // }
  }
}
