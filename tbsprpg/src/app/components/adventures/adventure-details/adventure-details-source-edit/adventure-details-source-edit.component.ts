import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-adventure-details-source-edit',
  templateUrl: './adventure-details-source-edit.component.html',
  styleUrls: ['./adventure-details-source-edit.component.scss']
})
export class AdventureDetailsSourceEditComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() label: string;
  defaultLabel = 'Source Text';

  constructor() { }

  ngOnInit(): void {
    if (this.label === undefined) {
      this.label = this.defaultLabel;
    }
  }

}
