import {animate, AnimationTriggerMetadata, group, keyframes, query, style, transition, trigger} from '@angular/animations';
import {AnimationTransitions} from './animation';


export const slideAnimations: {
  readonly slideIn: AnimationTriggerMetadata,
  readonly slideOut: AnimationTriggerMetadata
} = {
  slideIn: trigger('slideIn', [
    transition(':enter',
      animate(AnimationTransitions.DEFAULT,
        keyframes([
          style({ left: '-50%'}),
          style({ left: '0%'}),
        ]))
    ),

  ]),

  slideOut: trigger('slideOut', [
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
            style({transform: 'translateX(-100%)'})
          )
        ),
      ])
    )
  ])
};
