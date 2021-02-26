import { createReducerFunction, ImmerReducer } from 'immer-reducer';

import LocalStorage from '@/utils/local-storage';

export interface PwaState {
  isPWA: boolean; // Does the app running in browser or application (pwa) mode?
  hasPWA: boolean; // Has an user installed the app already?
  isIosInstallPWA: boolean; // IOS user tries to install PWA

  // Android user without native PWA support in Chrome tries to install PWA
  isAndroidChromeInstallPWA: boolean;

  canInstallPWA: boolean; // Detect if we caught PWA install event and run use it
}

const isPwa = () => ['standalone', 'minimal-ui'].some(
  (displayMode) => window.matchMedia(`(display-mode: ${displayMode})`).matches,
);

const initialState: PwaState = {
  isPWA: isPwa()
  || (window?.navigator as any)?.standalone
  || document.referrer.includes('android-app://'),
  hasPWA: LocalStorage.getHasPwa(),
  isIosInstallPWA: false,
  isAndroidChromeInstallPWA: false,
  canInstallPWA: false,
};

export class PwaReducer extends ImmerReducer<PwaState> {
  setHasPwa(hasPWA: boolean) {
    this.draftState.hasPWA = hasPWA;
  }

  setIsIosInstallPWA(isIosInstallPWA: boolean) {
    this.draftState.isIosInstallPWA = isIosInstallPWA;
  }

  setIsAndroidChromeInstallPWA(isAndroidChromeInstallPWA: boolean) {
    this.draftState.isAndroidChromeInstallPWA = isAndroidChromeInstallPWA;
  }

  setCanInstallPWA(canInstallPWA: boolean) {
    this.draftState.canInstallPWA = canInstallPWA;
  }
}

export default createReducerFunction(PwaReducer, initialState);
