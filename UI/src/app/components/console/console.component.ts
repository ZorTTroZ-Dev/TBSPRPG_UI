import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  count : number;

  constructor() { }

  ngOnInit(): void {
    this.count = 1;
  }

  counter() {
    return Array(this.count);
  }
}
