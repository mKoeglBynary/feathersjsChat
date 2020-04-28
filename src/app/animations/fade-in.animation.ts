import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';
import {AnimationTransitions} from './animation';

const fadeInStyles = {
  hidden: {
    opacity: 0,
    visibility: 'hidden'
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
  transparent: {
    opacity: 0,
    visibility: 'visible'
  }
};

export const fadeInAnimations: {
  readonly fadeIn: AnimationTriggerMetadata,
  readonly fadeInOverlay: AnimationTriggerMetadata,
  readonly fadeInAfter: AnimationTriggerMetadata,
  } = {
  fadeIn: trigger('fadeIn', [
    transition(':enter', [
      style(fadeInStyles.hidden),
      animate(AnimationTransitions.FADE_IN),
    ]),
  ]),
  fadeInOverlay: trigger('fadeInOverlay', [
    transition('* => true', [
      animate(AnimationTransitions.OVERLAY_IN_OUT, style({
        ...fadeInStyles.transparent,
        transform: 'translateY(-150px) scale(0)'
      })),
      animate(AnimationTransitions.OVERLAY_SHOW, style({
        ...fadeInStyles.visible,
        transform: 'translateY(200px)'
      })),
      animate(AnimationTransitions.OVERLAY_IN_OUT, style({
        ...fadeInStyles.hidden,
        transform: 'translateY(-100px) scale(0.3)',
      })),
    ])
  ]),

  fadeInAfter: trigger('fadeInAfter', [
    state('false', style(fadeInStyles.hidden)),
    state('true', style(fadeInStyles.visible)),
    transition('false => true', [
      animate(AnimationTransitions.DEFAULT)
    ])
  ])
};
