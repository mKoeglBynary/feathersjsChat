import {animate, state, style, transition, trigger} from '@angular/animations';

export const buttonClickedAnimations = trigger('clicked', [
  state('not-clicked', style({
    transform: 'translateY(1px)',
    opacity: 1
  })),
  state('on-clicked', style({
    transform: 'translateY(-1px)',
    opacity: 0.5
  })),
  transition('not-clicked <=> on-clicked', [
    animate('250ms ease-in-out')
  ])
])
