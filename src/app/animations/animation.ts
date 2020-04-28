export class AnimationDurations {
  static DEFAULT = '300ms';
  static FADE_IN = '800ms';
  static OVERLAY_IN_OUT = '600ms 100ms';
  static OVERLAY_SHOW = '1.3s';
}

export class AnimationEasings {
  static DEFAULT = 'ease-in-out';
}

export class AnimationTransitions {
  static DEFAULT = `${AnimationDurations.DEFAULT} ${AnimationEasings.DEFAULT}`;
  static FADE_IN = `${AnimationDurations.FADE_IN} ${AnimationEasings.DEFAULT}`;
  static OVERLAY_IN_OUT = `${AnimationDurations.OVERLAY_IN_OUT} ${AnimationEasings.DEFAULT}`;
  static OVERLAY_SHOW = `${AnimationDurations.OVERLAY_SHOW} ${AnimationEasings.DEFAULT}`;

}

