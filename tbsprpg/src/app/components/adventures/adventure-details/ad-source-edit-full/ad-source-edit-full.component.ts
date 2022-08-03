import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Source} from '../../../../models/source';
import {FormGroup} from '@angular/forms';
import {SourcesService} from '../../../../services/sources.service';

@Component({
  selector: 'app-ad-source-edit-full',
  templateUrl: './ad-source-edit-full.component.html',
  styleUrls: ['./ad-source-edit-full.component.scss']
})
export class AdSourceEditFullComponent implements OnInit, OnChanges {
  @Input() source: Source;
  sourceForm: FormGroup;

  constructor(private sourcesService: SourcesService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.source.currentValue) {
      this.sourceForm = this.sourcesService.createFormGroupForSource(this.source);
    }
  }

  updateSource(): void {

  }
}
