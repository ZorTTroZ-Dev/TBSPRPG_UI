import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-adventure-details-sidebar',
  templateUrl: './ad-sidebar.component.html',
  styleUrls: ['./ad-sidebar.component.scss']
})
export class AdSidebarComponent implements OnInit {
  @Input() location: string;
  @Output() sidebarLocationChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateSidebarLocation(newLocation: string): void {
    this.sidebarLocationChange.emit(newLocation);
  }
}
