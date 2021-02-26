import { createActionCreators } from 'immer-reducer';

import LocalStorage from '@/utils/local-storage';

import { PwaReducer } from '../reducers/pwa';
import { AsyncAction } from './common';

export const pwaActions = createActionCreators(PwaReducer);

export type PwaActions =
  | ReturnType<typeof pwaActions.setHasPwa>
  | ReturnType<typeof pwaActions.setIsIosInstallPWA>
  | ReturnType<typeof pwaActions.setIsAndroidChromeInstallPWA>
  | ReturnType<typeof pwaActions.setCanInstallPWA>;

export const installPwaAsync = (): AsyncAction => async (dispatch) => {
  LocalStorage.setHasPwa(true);
  dispatch(pwaActions.setHasPwa(true));

  window.dataLayer.push({
    event: 'agoraAppInstallation',
    formName: 'Agora App Installation',
  });
};

export const trackPwaAsync = (): AsyncAction => async (dispatch, getState) => {
  const { pwaReducer } = getState();
  const { isPWA } = pwaReducer;

  const launchedOn = isPWA ? 'pwa_app' : 'browser';

  window.dataLayer.push({ launchedOn });
};
