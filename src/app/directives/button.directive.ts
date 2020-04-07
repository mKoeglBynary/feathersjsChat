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
    const normalStyle = () => style({color: 'white', transform: 'translateY(-1px)'});
    const clickedStyle = () =>  style({color: 'black', transform: 'translateY(1px)'});

    const animateClick = animate('200ms ease-in', clickedStyle());
    const playerClick = this.animation(animateClick, normalStyle());

    const animateNormal = animate('300ms ease-in', normalStyle());
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
