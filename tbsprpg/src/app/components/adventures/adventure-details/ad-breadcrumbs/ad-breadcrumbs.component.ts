import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Adventure} from '../../../../models/adventure';
import {Location} from '../../../../models/location';

@Component({
  selector: 'app-adventure-details-breadcrumbs',
  templateUrl: './ad-breadcrumbs.component.html',
  styleUrls: ['./ad-breadcrumbs.component.scss']
})
export class AdBreadcrumbsComponent implements OnInit {
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
