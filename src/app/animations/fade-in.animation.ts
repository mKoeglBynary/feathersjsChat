import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';
import {AnimationTransitions} from './animation';

export const fadeInAnimations: {
  readonly fadeIn: AnimationTriggerMetadata,
  readonly fadeInOverlay: AnimationTriggerMetadata,
  readonly fadeInAfter: AnimationTriggerMetadata,
  } = {
  fadeIn: trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0}),
      animate(AnimationTransitions.FADE_IN),
    ]),
  ]),
  fadeInOverlay: trigger('fadeInOverlay', [
    transition('* => true', [
      animate(AnimationTransitions.OVERLAY_IN_OUT, style({
        opacity: 0,
        visibility: 'visible',
        transform: 'translateY(-150px) scale(0)'
      })),
      animate(AnimationTransitions.OVERLAY_SHOW, style({
        opacity: 1,
        transform: 'translateY(200px)'
      })),
      animate(AnimationTransitions.OVERLAY_IN_OUT, style({
        visibility: 'hidden',
        opacity: 0,
        transform: 'rotate(-90deg) translateY(-100px) scale(0.3)',
      })),
    ])
  ]),

  fadeInAfter: trigger('fadeInAfter', [
    state('false', style({opacity: 0, visibility: 'hidden'})),
    state('true', style({opacity: 1, visibility: 'visible'})),
    transition('false => true', [
      animate(AnimationTransitions.DEFAULT)
    ])
  ])
};
