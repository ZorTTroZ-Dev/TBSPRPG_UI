import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appFocusOnShowDirective]'
})
export class FocusOnShowDirectiveDirective {

  constructor(private el: ElementRef) {
    if (!el.nativeElement['focus']) {
      throw new Error('Element does not accept focus.');
    }
  }

  ngOnInit(): void {
    setTimeout(() => { 
      const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
      input.focus();
      input.select();
    }, 100);
  }

}
