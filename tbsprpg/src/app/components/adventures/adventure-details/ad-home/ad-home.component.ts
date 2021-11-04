import {Component, Input, OnInit} from '@angular/core';
import {Adventure} from '../../../../models/adventure';

@Component({
  selector: 'app-adventure-details-home',
  templateUrl: './ad-home.component.html',
  styleUrls: ['./ad-home.component.scss']
})
export class AdHomeComponent implements OnInit {
  @Input() adventure: Adventure;

  constructor() { }

  ngOnInit(): void {
  }

}
