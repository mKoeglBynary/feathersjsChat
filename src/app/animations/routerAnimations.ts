import {animate, animateChild, group, keyframes, query, style, transition, trigger} from '@angular/animations';

export const routerAnimations = trigger('routeAnimations', [
  loginToChatTransition(),
  chatToLoginTransition(),
]);

function chatToLoginTransition() {
  return (transition('chat => login', [
    query(':enter', animate('700ms ease-in', keyframes([
      style({ transform: 'translateX(-100vw)'}),
      style({ transform: 'translateX(0vw)'}),
    ])))
  ]));
}

function loginToChatTransition() {
  return transition('login => chat', [
    style({ position: 'relative'}),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%', opacity: 0})
    ]),
    group([
      query(':leave', [
        animate('900ms ease-in-out', style({ left: '100%', opacity: 0}))
      ]),
      query(':enter', [
        animate('900ms ease-out', style({ left: '0%'}))
      ])
    ]),
  ]);
}

