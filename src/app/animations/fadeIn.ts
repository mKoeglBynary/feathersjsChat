import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeInEnter = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0}),
    animate('800ms ease-in'),
  ]),
]);

export const fadeInOverlay = trigger('fadeInOverlay', [
  transition('* => true', [
    animate('600ms ease-in-out', style({
      opacity: 0,
      visibility: 'visible',
      transform: 'translateY(-150px) scale(0)'
    })),
    animate('1300ms ease-in-out', style({
      opacity: 1,
      transform: 'translateY(200px)'
    })),
    animate('0.8s 200ms ease-in-out', style({
      visibility: 'hidden',
      opacity: 0,
      transform: 'rotate(-90deg) translateY(-100px) scale(0.3)',
    })),
  ])
]);

export const fadeInAfter = trigger('fadeInAfter', [
  state('hidden', style({opacity: 0, visibility: 'hidden'})),
  state('show', style({opacity: 1, visibility: 'visible'})),
  transition('hidden => show', [
    animate('0.4s ease-in')
  ])
]);
