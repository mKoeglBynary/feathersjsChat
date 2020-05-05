import { animate, animateChild, group, keyframes, query, style, transition, trigger } from '@angular/animations';
import { AnimationTransitions } from './animation';

const pageTransitionStyles = {
    hidden: {
        opacity: 0,
        visibility: 'hidden'
    },
    visible: {
        opacity: 1,
        visibility: 'visible',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
    }
};


export const pageTransitionAnimation = trigger('routeAnimations', [
    loginToChatTransition(),
    chatToLoginTransition(),
]);

function chatToLoginTransition() {
    return (transition('chat => login', [
        query('.app-chat__animation-container', style(pageTransitionStyles.visible)),
        query(':enter', style(pageTransitionStyles.absolute)),
        group([
            query(':enter', animate(AnimationTransitions.FADE, keyframes([
                style({ left: '-100%' }),
                style({ left: '0%' }),
            ]))),
            query(':leave', animate(AnimationTransitions.FADE, keyframes([
                style({ left: '0%' }),
                style({ left: '100%' }),
            ])))
        ])
    ]));
}

function loginToChatTransition() {
    return transition('login => chat', [
        query(':leave', style(pageTransitionStyles.absolute)),
        group([
            query(':leave', animate(AnimationTransitions.FADE,
                style({
                    transform: 'scale(3)',
                    opacity: 0
                }),
            )),
            query('.app-chat__overlay', animateChild())
        ]),
    ]);
}

