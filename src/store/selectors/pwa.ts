import UAParser from 'ua-parser-js';
import { createSelector, Selector } from 'reselect';
import { State } from '@/store';

const selectPwaState = (state: State) => state.pwaReducer;

export const selectIsInstallPwaVisible: Selector<State, boolean> = createSelector(
  selectPwaState,
  ({ isPWA, hasPWA, canInstallPWA }) => {
    const parser = new UAParser();

    const { name: os } = parser.getOS();
    const { name: browser } = parser.getBrowser();
    const { type } = parser.getDevice();

    const isIOS = os === 'iOS';
    const isSafari = browser === 'Mobile Safari' || browser === 'Safari';
    const isChrome = browser === 'Chrome';
    const isMobile = type === 'mobile';

    if (!isMobile) return false;

    if (hasPWA || isPWA) return false;

    if (isIOS && !isSafari) return false;

    if (isIOS && isSafari) return true;

    // Since IOS will process earlier, only android can get here.
    // On Chrome in any case we show install btn:
    // IF we can install - it will trigger installation
    // IF NOT we will show popup
    if (isChrome) return true;

    if (!canInstallPWA) return false;

    return true;
  },
);

export const selectIsIosInstallPWA: Selector<State, boolean> = createSelector(
  selectPwaState,
  ({ isIosInstallPWA }) => isIosInstallPWA,
);

export const selectIsAndroidChromeInstallPWA: Selector<State, boolean> = createSelector(
  selectPwaState,
  ({ isAndroidChromeInstallPWA }) => isAndroidChromeInstallPWA,
);

export const selectIsPWA: Selector<State, boolean> = createSelector(
  selectPwaState,
  ({ isPWA }) => isPWA,
);
