import {Directive, ElementRef, HostListener} from '@angular/core';
import {animate, AnimationAnimateMetadata, AnimationBuilder, AnimationPlayer, AnimationStyleMetadata, style} from '@angular/animations';

@Directive({
  selector: '[appButton]',

})
export class ButtonDirective {
  element: ElementRef;
  style: CSSStyleDeclaration;

  constructor(
    private readonly _el: ElementRef,
    private readonly _builder: AnimationBuilder
  ) {
    this.element = _el;
    this.style = _el.nativeElement.style;
  }

  @HostListener('click')
  onClick() {
    const normalStyle = () => style({color: '#ffffff', transform: 'translateY(-1px)'});
    const clickedStyle = () =>  style({color: '#230925', transform: 'translateY(1px)'});

    const animateClick = animate('50ms', clickedStyle());
    const playerClick = this.animation(animateClick, normalStyle());

    const animateNormal = animate('100ms ease-in', normalStyle());
    const playerNormal = this.animation(animateNormal, clickedStyle());

    playerClick.onDone(() => {
      playerNormal.play();
    });
    playerClick.play();
  }

  animation(animateVal: AnimationAnimateMetadata,
            state: AnimationStyleMetadata): AnimationPlayer {

    const animation = this._builder.build([
      state,
      animateVal
    ]);

    return animation.create(this.element.nativeElement);
  }
}
