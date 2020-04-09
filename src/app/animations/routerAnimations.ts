import {animate, group, keyframes, query, style, transition, trigger} from '@angular/animations';

export const routerAnimations = trigger('routeAnimations', [
  loginToChatTransition(),
  chatToLoginTransition(),
]);

function chatToLoginTransition() {
  return (transition('chat => login', [
    style({
      position: 'relative'
    }),
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
      query(':enter', animate('900ms ease-in', keyframes([
        style({ left: '-100%'}),
        style({ left: '0%'}),
      ]))),
      query(':leave', animate('900ms ease-in', keyframes([
        style({ left: '0%'}),
        style({ left: '100%'}),
      ])))
    ]),
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

