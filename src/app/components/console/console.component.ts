import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  prompt: string = '>';
  command: string;
  output : string;

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(e){
    e.preventDefault();
    this.output = this.command.slice(5);
    //console.log(this.command);
  }

  handleKeyUp(e) {
    if(e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }
}
