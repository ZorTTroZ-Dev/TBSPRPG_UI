import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-adventure-details-sidebar',
  templateUrl: './adventure-details-sidebar.component.html',
  styleUrls: ['./adventure-details-sidebar.component.scss']
})
export class AdventureDetailsSidebarComponent implements OnInit {
  @Input() location: string;
  @Output() locationChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateLocation(newLocation: string): void {
    this.locationChange.emit(newLocation);
  }
}
