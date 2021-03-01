import UAParser from 'ua-parser-js';

import store from '@/store';
import { pwaActions, installPwaAsync } from '@/store/actions/pwa';

import LocalStorage from '@/utils/local-storage';

let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  LocalStorage.setHasPwa(false);

  store.dispatch<any>(pwaActions.setHasPwa(false));
  store.dispatch<any>(pwaActions.setCanInstallPWA(true));

  e.preventDefault();

  deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
  store.dispatch<any>(installPwaAsync());
});

// eslint-disable-next-line import/prefer-default-export
export const installPwa = () => {
  const parser = new UAParser();

  const { name: os } = parser.getOS();
  const { name: browser } = parser.getBrowser();

  const isIOS = os === 'iOS';
  const isSafari = browser === 'Mobile Safari' || browser === 'Safari';
  const isChrome = browser === 'Chrome';

  if (isIOS && isSafari) {
    store.dispatch<any>(pwaActions.setIsIosInstallPWA(true));
  }

  if (!deferredPrompt && isChrome) {
    store.dispatch<any>(pwaActions.setIsAndroidChromeInstallPWA(true));
  }

  deferredPrompt?.prompt();

  deferredPrompt?.userChoice?.then((choiceResult: any) => {
    if (choiceResult?.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  });
};
