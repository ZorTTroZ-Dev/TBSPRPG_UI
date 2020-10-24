import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ConsoleOutputDirective } from '../../../directives/consoleoutput.directive';
import { OutputComponent } from '../output.component';
import { ConsoleService } from '../../../services/console.service';
import { Router } from '@angular/router';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private consoleService: ConsoleService, private router: Router) { }

  ngOnInit(): void {
    
  }

  handleCommand(command : string) {
    this.inactive = true;
    this.count += 1;
    this.countChange.emit(this.count);

    //split the command
    var splitCommand : string[] = command.split(" ");

    //we'll handle the play command since we don't want to show it in the conosle, we're leaving the console
    //this maybe should be somewhere else or maybe in a different function
    if(splitCommand.length > 0 && splitCommand[0].toLowerCase() == 'play') {
      splitCommand.shift();
      this.router.navigate(['/game', {adventure: splitCommand.join(" ")}]);
    }

    //we're going to dynamically load a component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.consoleService.getComponentForCommand(splitCommand.shift()));

    const viewContainerRef = this.outputHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<OutputComponent>(componentFactory);
    componentRef.instance.data = { 'arguments': splitCommand.join(" ")};
  }
}
