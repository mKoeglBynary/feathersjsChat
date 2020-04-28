import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {AnimationTransitions} from './animation';

const clickStyles = {
  moveDown: {
    transform: 'translateY(2px)',
    opacity: 0.5
  },
  moveUp: {
    transform: 'translateY(-2px)',
    opacity: 1
  }
}

export const buttonClickedAnimation = trigger('clicked', [
  transition('true <=> false', [
    animate(AnimationTransitions.DEFAULT, keyframes([
      style(clickStyles.moveDown),
      style(clickStyles.moveUp)
    ]))
  ])
]);
