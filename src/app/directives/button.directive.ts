import {Directive, ElementRef, HostListener} from '@angular/core';
import {animate, AnimationBuilder, style} from '@angular/animations';

@Directive({
  selector: '[appButton]',

})
export class ButtonDirective {
  element;
  style;
  hoverColor = '#fc21d1';

  constructor(
    el: ElementRef,
    private builder: AnimationBuilder
  ) {
    this.element = el;
    this.style = el.nativeElement.style;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.element.nativeElement.style.background = this.hoverColor;
  }

  @HostListener('mouseleave')
  onMoueLeave() {
    this.element.nativeElement.style = this.style;
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

  animation(animateVal, oldState) {
    const animation = this.builder.build([
      oldState,
      animateVal
    ]);
    return animation.create(this.element.nativeElement);
  }
}
