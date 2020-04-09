import {animate, keyframes, query, state, style, transition, trigger} from '@angular/animations';

export const fadeInEnter = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0}),
    animate('800ms ease-in'),
  ]),
])

export const fadeInOverlay = trigger('fadeInOverlay', [
  transition('* => true', [
    animate('600ms ease-in-out', style({
      opacity: 0,
      visibility: 'visible',
      transform: 'rotate(0) translateY(-150px) scale(0)'
    })),
    animate('1300ms ease-in-out', style({
      opacity: 1,
      transform: 'rotate(15deg) translateY(200px)'
    })),
    animate('1s 200ms ease-in-out', style({
      visibility: 'hidden',
      opacity: '0',
      transform: 'rotate(-90deg) translateY(-100px) scale(0.3)',
    })),
  ])
])

export const fadeInAfter = trigger('fadeInAfter', [
  state('true', style({opacity: 1, visibility: 'visible'})),
  state('*', style({opacity: 0, visibility: 'hidden'})),
  transition('* => true', [
    style({visibility: 'hidden', opacity: '0'}),
    animate('2s 2s ease-in', style({
      opacity: 1,
      visibility: 'visible'
    }))
  ])
])
