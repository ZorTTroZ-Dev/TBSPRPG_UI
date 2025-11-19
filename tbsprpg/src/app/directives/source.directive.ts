import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appSource]',
    standalone: false
})
export class SourceDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
