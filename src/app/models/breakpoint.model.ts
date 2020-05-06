import { coerceCssPixelValue } from '@angular/cdk/coercion';

export enum Breakpoint {
    MOBILE_SM = 'mobile-sm',
    MOBILE = 'mobile',
    MOBILE_LG = 'mobile-lg',

    TABLET_SM = 'tablet-sm',
    TABLET = 'tablet',
    TABLET_LG = 'tablet-lg',

    DESKTOP_SM = 'desktop-sm',
    DESKTOP = 'desktop',
    DESKTOP_LG = 'desktop-lg',
    DESKTOP_XL = 'desktop-xl'
}

export const BREAKPOINT_DIMENSIONS = {
    [Breakpoint.MOBILE_SM]: 320,
    [Breakpoint.MOBILE]: 480,
    [Breakpoint.MOBILE_LG]: 576,

    [Breakpoint.TABLET_SM]: 768,
    [Breakpoint.TABLET]: 840,
    [Breakpoint.TABLET_LG]: 992,

    [Breakpoint.DESKTOP_SM]: 1100,
    [Breakpoint.DESKTOP]: 1280,
    [Breakpoint.DESKTOP_LG]: 1440,
    [Breakpoint.DESKTOP_XL]: 1690
};

export namespace Breakpoint {

    export function maxWidth(breakpoint: Breakpoint | number | string): string {

        if (BREAKPOINT_DIMENSIONS.hasOwnProperty(breakpoint)) {
            breakpoint = BREAKPOINT_DIMENSIONS[breakpoint] - 1;
        }

        if ('number' === typeof breakpoint) {
            breakpoint = coerceCssPixelValue(breakpoint);
        }

        return `(max-width: ${breakpoint})`;
    }

    export function minWidth(breakpoint: Breakpoint | number | string): string {

        if (BREAKPOINT_DIMENSIONS.hasOwnProperty(breakpoint)) {
            breakpoint = BREAKPOINT_DIMENSIONS[breakpoint];
        }

        if ('number' === typeof breakpoint) {
            breakpoint = coerceCssPixelValue(breakpoint);
        }

        return `(min-width: ${breakpoint})`;
    }
}
