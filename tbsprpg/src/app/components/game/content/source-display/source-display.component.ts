import {Component, Input} from '@angular/core';
import {Source} from '../../../../models/source';
import {DomSanitizer} from '@angular/platform-browser';
import {SourceToken} from '../../../../models/sourceToken';
import {micromark} from 'micromark';
import {UtilitiesService} from '../../../../services/utilities.service';

@Component({
  selector: 'app-source-display',
  templateUrl: './source-display.component.html',
  styleUrls: ['./source-display.component.scss']
})
export class SourceDisplayComponent {
  @Input() source: Source;
  tokens: SourceToken[];

  constructor(private sanitizer: DomSanitizer,
              private utilitiesService: UtilitiesService) {
  }

  renderContent(): void {
    const leadToken = [{text: this.sanitizer.bypassSecurityTrustHtml('<br>'), tooltip: ''}];
    const contentTokens = this.source.text.split(/<object>/).map(token => {
      const jsonObject = this.utilitiesService.tryParseJSONObject(token);
      if (jsonObject !== false) {
        Object.keys(jsonObject).forEach(key => {
          jsonObject[key] = micromark(jsonObject[key]).slice(3, -4);
          if (key === 'text') {
            jsonObject[key] = ' <u>' + jsonObject[key] + '</u>';
          }
        });
        return jsonObject;
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
