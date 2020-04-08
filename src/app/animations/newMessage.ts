import {animate, animateChild, group, keyframes, query, state, style, transition, trigger} from '@angular/animations';


export const newMessage = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0}),
    animate('800ms ease-in'),
  ]),
])

export const moveBlock = trigger('moveBlock', [
  transition(':enter', [
    style({background: 'blue'}),
    animate('1000ms', keyframes([
      style({width: '0px'}),
      style({width: '400px'}),
      style({width: '800px'})
    ])),
  ])
])
