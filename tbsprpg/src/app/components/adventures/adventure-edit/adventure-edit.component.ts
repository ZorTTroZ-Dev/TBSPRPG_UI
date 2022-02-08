import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Adventure} from '../../../models/adventure';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.scss']
})

export class AdventureEditComponent implements OnInit {
  @Input() adventure: Adventure;
  @Output() editAdventureChange = new EventEmitter<Adventure>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateAdventureEdit(adventure: Adventure): void {
    this.editAdventureChange.emit(adventure);
  }
}
