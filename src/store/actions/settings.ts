/* eslint-disable no-console */
import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import { SettingsReducer } from '@/store/reducers/settings';
import { LANGUAGES } from '@/store/reducers/language';
import { authRestoreActions } from '@/store/actions/auth-restore';
import { languageActions } from '@/store/actions/language';

import LocalStorage, { LOCALS } from '@/utils/local-storage';
import { SendProfileInfoBody } from '@/api/main-protected';
import { AsyncAction } from './common';

export const settingsActions = createActionCreators(SettingsReducer);

export type SettingsActions =
  | ReturnType<typeof settingsActions.setUser>
  | ReturnType<typeof settingsActions.setFullInfo>
  | ReturnType<typeof settingsActions.setIsLoading>
  | ReturnType<typeof settingsActions.setIsSmallLoading>
  | ReturnType<typeof settingsActions.setIsSaveLoading>
  | ReturnType<typeof settingsActions.setCitiesByCountry>
  | ReturnType<typeof settingsActions.cleanUser>;

export const getUserInfo = () : AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(settingsActions.setIsLoading(true));
    const res = await mainProtectedApi.getMe();

    dispatch(settingsActions.setUser(res.seller));
    dispatch(settingsActions.setFullInfo(res));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(settingsActions.setIsLoading(false));
  }
};

export const resetLoadingStatus = () : AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(settingsActions.setIsLoading(true));
  } catch (e) {
    console.error(e);
  }
};

export const logOut = () : AsyncAction => async (dispatch) => {
  try {
    LocalStorage.clearByKey(LOCALS.ACCESS_TOKEN);
    LocalStorage.clearByKey(LOCALS.REFRESH_TOKEN);

    dispatch(settingsActions.cleanUser);
    dispatch(authRestoreActions.setIsLogInInActive());

    dispatch(push('/signup'));
  } catch (e) {
    console.error(e);
  }
};

export const getCitiesByCountry = (id: string) : AsyncAction => async (
  dispatch,
  _,
  { mainApi },
) => {
  try {
    dispatch(settingsActions.setIsLoading(true));
    const res = await mainApi.getCitiesByCountry(id);

    dispatch(settingsActions.setCitiesByCountry(res.cities));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(settingsActions.setIsLoading(false));
  }
};

export const editProfileInfo = (body: SendProfileInfoBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(settingsActions.setIsSaveLoading(true));

    await mainProtectedApi.editProfileInfo(body);

    dispatch(push('/settings'));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(settingsActions.setIsSaveLoading(false));
  }
};

export const changeNotificationLanguage = (body: SendProfileInfoBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(settingsActions.setIsSaveLoading(true));

    await mainProtectedApi.editProfileInfo(body);

    const language = body.language?.toLowerCase();

    switch (language) {
      case 'en':
        dispatch(languageActions.setLn(LANGUAGES.EN));
        LocalStorage.setLn(LANGUAGES.EN);
        return;
      case 'th':
        dispatch(languageActions.setLn(LANGUAGES.TH));
        LocalStorage.setLn(LANGUAGES.TH);
        return;
      case 'hk':
      case 'zh':
        dispatch(languageActions.setLn(LANGUAGES.ZH));
        LocalStorage.setLn(LANGUAGES.ZH);
        return;
      case 'id':
        dispatch(languageActions.setLn(LANGUAGES.ID));
        LocalStorage.setLn(LANGUAGES.ID);
        return;
      default:
    }
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(settingsActions.setIsSaveLoading(false));
  }
};
