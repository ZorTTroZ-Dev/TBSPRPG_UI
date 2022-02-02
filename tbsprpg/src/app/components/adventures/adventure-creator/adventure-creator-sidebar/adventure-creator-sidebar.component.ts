import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-adventure-creator-sidebar',
  templateUrl: './adventure-creator-sidebar.component.html',
  styleUrls: ['./adventure-creator-sidebar.component.scss']
})
export class AdventureCreatorSidebarComponent implements OnInit {
  @Input() location: string;
  @Output() sidebarLocationChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocationChange.emit(newLocation);
  }
}
