import {animate, group, keyframes, query, style, transition, trigger} from '@angular/animations';

export const routerAnimations = trigger('routeAnimations', [
  loginToChatTransition(),
  chatToLoginTransition(),
]);

function chatToLoginTransition() {
  return (transition('chat => login', [
    query('.app-chat__header, .app-chat__container', style({
      opacity: 1,
      visibility: 'visible'
    })),
    query(':enter, :leave', style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })),
    group([
      query(':enter', animate('900ms ease-in-out', keyframes([
        style({ left: '-100%'}),
        style({ left: '0%'}),
      ]))),
      query(':leave', animate('900ms ease-in-out', keyframes([
        style({ left: '0%'}),
        style({ left: '100%'}),
      ])))
    ]),
  ]));
}

function loginToChatTransition() {
  return transition('login => chat', [
    query(':leave', style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })),
    query(':leave', animate('800ms ease-in-out', keyframes([
        style({
          transform: 'scale(3)',
          opacity: 0
        }),
      ])))
  ]);
}

