import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comresp',
  templateUrl: './comresp.component.html',
  styleUrls: ['./comresp.component.scss']
})
export class ComrespComponent implements OnInit {
  prompt: string = '>';
  output : string;

  @Input() index : number;
  @Input() count : number;
  @Output() countChange = new EventEmitter<number>();
  inactive : boolean;

  constructor() { }

  ngOnInit(): void {
    
  }

  handleCommand(command : string) {
    this.inactive = true;
    this.count += 1;
    this.countChange.emit(this.count);
    this.output = command.slice(5);
  }
}
