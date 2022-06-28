import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {Script} from '../../../../models/script';

@Component({
  selector: 'app-adventure-details-source-edit',
  templateUrl: './ad-source-edit.component.html',
  styleUrls: ['./ad-source-edit.component.scss']
})
export class AdSourceEditComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() label: string;
  @Input() sourceFormGroupName: string;
  @Input() scripts: Script[];
  defaultLabel = 'Source Text';
  defaultFormGroupName = 'source';

  constructor() { }

  ngOnInit(): void {
    if (this.label === undefined) {
      this.label = this.defaultLabel;
    }
    if (this.sourceFormGroupName === undefined) {
      this.sourceFormGroupName = this.defaultFormGroupName;
    }
  }

}
