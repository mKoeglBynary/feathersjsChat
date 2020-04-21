import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() appClickOutside = new EventEmitter<void>();

  constructor(private readonly _elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    const clickedInside = this._elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.appClickOutside.emit();
    }
  }
}
