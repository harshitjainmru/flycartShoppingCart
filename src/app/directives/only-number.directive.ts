import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private _el: ElementRef) {}
  @HostListener('input', ['event']) onInpuChange(event: any) {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(/[^0-9]*/g,'');
    return initialValue == this._el.nativeElement.value;
  }

}
