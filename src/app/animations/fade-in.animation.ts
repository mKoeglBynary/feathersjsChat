import {
  animate,
  AnimationTriggerMetadata,
  group,
  keyframes,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {AnimationTransitions} from './animation';

const fadeInStyles = {
  hidden: {
    opacity: 0,
    visibility: 'hidden',
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
  readonly fadeOut: AnimationTriggerMetadata
  } = {
  fadeIn: trigger('fadeIn', [
    transition(':enter', [
      style(fadeInStyles.hidden),
      animate(AnimationTransitions.FADE),
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
        transform: 'translateY(-100px) scale(0)',
      })),
    ])
  ]),

  fadeInAfter: trigger('fadeInAfter', [
    state('false', style(fadeInStyles.hidden)),
    state('true', style(fadeInStyles.visible)),
    transition('false => true', [
      animate(AnimationTransitions.DEFAULT)
    ])
  ]),

  fadeOut: trigger('fadeOut', [
    transition(':leave',
      group([
        /*
          Strange Workaround.
          NgIf destroys component but does not trigger ':leave'.
          If the selector '*' is used, an animation is triggered and
          the component is destroyed after that animation.
          But the selector '*' does not select the component itself, but
          a child-component.
          So in the query with '*' nothing happens, except to set the animation-time.
          The real animation is in the query with the selector ':self'
        */
        query('*',
          animate(AnimationTransitions.DEFAULT, keyframes([
            style({ left: 0}),
            style({ left: 0}), ])
          )
        ),
        query(':self',
          animate( AnimationTransitions.DEFAULT,
            style(fadeInStyles.hidden)))
        ])

      )
  ])
};
