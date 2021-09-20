import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Location} from '../../../../models/location';

@Component({
  selector: 'app-adventure-details-breadcrumbs',
  templateUrl: './adventure-details-breadcrumbs.component.html',
  styleUrls: ['./adventure-details-breadcrumbs.component.scss']
})
export class AdventureDetailsBreadcrumbsComponent implements OnInit {
  @Input() adventure: Adventure;
  @Input() location: Location;
  @Input() sidebarLocation: string;
  @Output() sidebarLocationChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocationChange.emit(newLocation);
  }
}
