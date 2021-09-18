import {Component, Input, OnInit} from '@angular/core';
import {Adventure} from '../../../../models/adventure';

@Component({
  selector: 'app-adventure-details-home',
  templateUrl: './adventure-details-home.component.html',
  styleUrls: ['./adventure-details-home.component.scss']
})
export class AdventureDetailsHomeComponent implements OnInit {
  @Input() adventure: Adventure;

  constructor() { }

  ngOnInit(): void {
  }

}
