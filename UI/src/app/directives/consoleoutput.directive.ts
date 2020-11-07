import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appConsoleOutput]'
})
export class ConsoleOutputDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
