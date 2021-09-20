import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-adventure-details-sidebar',
  templateUrl: './adventure-details-sidebar.component.html',
  styleUrls: ['./adventure-details-sidebar.component.scss']
})
export class AdventureDetailsSidebarComponent implements OnInit {
  @Input() location: string;
  @Output() sidebarLocationChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocationChange.emit(newLocation);
  }
}
