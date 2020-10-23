import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ConsoleOutputDirective } from '../../directives/consoleoutput.directive';
import { AdventuresComponent } from '../adventures/adventures.component';

@Component({
  selector: 'app-comresp',
  templateUrl: './comresp.component.html',
  styleUrls: ['./comresp.component.scss']
})
export class ComrespComponent implements OnInit {
  prompt: string = '>';
  @Input() index : number;
  @Input() count : number;
  @Output() countChange = new EventEmitter<number>();
  inactive : boolean;

  @ViewChild(ConsoleOutputDirective, {static: true}) outputHost: ConsoleOutputDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    
  }

  handleCommand(command : string) {
    this.inactive = true;
    this.count += 1;
    this.countChange.emit(this.count);

    //we're going to dynamically load a component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AdventuresComponent);

    const viewContainerRef = this.outputHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdventuresComponent>(componentFactory);
    // componentRef.instance.data = {};
  }
}
