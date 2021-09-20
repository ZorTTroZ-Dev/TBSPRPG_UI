import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../../../models/location';

@Component({
  selector: 'app-adventure-details-location-edit',
  templateUrl: './adventure-details-location-edit.component.html',
  styleUrls: ['./adventure-details-location-edit.component.scss']
})
export class AdventureDetailsLocationEditComponent implements OnInit {
  @Input() location: Location;

  constructor() { }

  ngOnInit(): void {
  }

}
