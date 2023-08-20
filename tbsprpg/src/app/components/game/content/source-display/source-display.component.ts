import {Component, Input} from '@angular/core';
import {Source} from '../../../../models/source';
import {DomSanitizer} from '@angular/platform-browser';
import {SourceToken} from '../../../../models/sourceToken';
import {micromark} from 'micromark';

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
    const leadToken = [{text: this.sanitizer.bypassSecurityTrustHtml('<br>'), tooltip: ''}];
    const contentTokens = this.source.text.split(/<object>/).map(token => {
      if (token.indexOf(';;') >= 0) {
        const objectAttributes = token.split(';;').filter(attribute => attribute !== '');
        const objectToken: SourceToken = {
          text: '',
          tooltip: ''
        };
        objectAttributes.forEach(attribute => {
          const nameValue = attribute.split('=');
          if (nameValue[0].trim().toLowerCase() === 'text') {
            objectToken.text = ' <u>' + micromark(nameValue[1]).slice(3, -4) + '</u>';
          } else if (nameValue[0].trim().toLowerCase() === 'tooltip') {
            objectToken.tooltip = micromark(nameValue[1]).slice(3, -4);
          }
        });
        return objectToken;
      } else {
        return {
          text: micromark(token).slice(3, -4), // remove p tags
          tooltip: ''
        };
      }
    });
    this.tokens = [...leadToken, ...contentTokens];
  }
}
