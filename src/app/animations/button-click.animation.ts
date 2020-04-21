import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const buttonClickedAnimation = trigger('clicked', [
  transition('true <=> false', [
    animate('300ms ease-in-out', keyframes([
      style({
        opacity: 1
      }),
      style({
        transform: 'translateY(2px)',
        opacity: 0.5,
      }),
      style({
        transform: 'translateY(-2px)',
        opacity: 1
      })
    ]))
  ])
])
