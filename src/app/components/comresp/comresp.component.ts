import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comresp',
  templateUrl: './comresp.component.html',
  styleUrls: ['./comresp.component.scss']
})
export class ComrespComponent implements OnInit {
  prompt: string = '>';
  command: string;
  output : string;
  @Input() index : number;
  @Input() count : number;
  @Output() countChange = new EventEmitter<number>();
  inactive : boolean;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    var commandInput = window.document.getElementById("command" + this.index);
    commandInput.focus();
  }

  handleSubmit(e){
    e.preventDefault();
    this.output = this.command.slice(5);    
  }

  handleKeyUp(e) {
    if(e.keyCode === 13) {  //13 is the enter key
      this.handleSubmit(e);
      this.inactive = true;
      this.count += 1;
      this.countChange.emit(this.count);
    }
  }
}
