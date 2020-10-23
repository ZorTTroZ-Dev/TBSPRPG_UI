import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ConsoleOutputDirective } from '../../../directives/consoleoutput.directive';
import { OutputComponent } from '../output.component';
import { ConsoleService } from '../../../services/console.service';
import { Console } from 'console';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private consoleService: ConsoleService) { }

  ngOnInit(): void {
    
  }

  handleCommand(command : string) {
    this.inactive = true;
    this.count += 1;
    this.countChange.emit(this.count);

    //split the command
    var splitCommand = command.split(" ");

    //we're going to dynamically load a component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.consoleService.getComponentForCommand(splitCommand.shift()));

    const viewContainerRef = this.outputHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<OutputComponent>(componentFactory);
    componentRef.instance.data = { 'arguments': splitCommand.join(" ")};
  }
}
