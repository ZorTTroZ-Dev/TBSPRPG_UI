import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = 'tbsprpg (text based single player rpg)';
  version: string = '0.01';

  constructor() { }

  ngOnInit(): void {
  }

}
