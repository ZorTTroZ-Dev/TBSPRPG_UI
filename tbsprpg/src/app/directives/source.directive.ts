import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSource]'
})
export class SourceDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
