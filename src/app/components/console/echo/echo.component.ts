import { Component, Input, OnInit } from '@angular/core';
import { OutputComponent } from '../output.component';

@Component({
  selector: 'app-echo',
  templateUrl: './echo.component.html',
  styleUrls: ['./echo.component.scss']
})

export class EchoComponent implements OnInit, OutputComponent {
  @Input() data : any;

  constructor() { }

  ngOnInit(): void {
  }

}
