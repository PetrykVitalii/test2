/* eslint-disable no-console */
import { ValidateOTPBody } from '@/api/main';
import LocalStorage from '@/utils/local-storage';
import reviewPage from '@/utils/reviewPage';
import { push } from 'connected-react-router';
import { createActionCreators } from 'immer-reducer';
import { AuthReducer } from '../reducers/auth';
import { AsyncAction } from './common';
import { sendQuote } from './quote';
import { getUserInfoByPhone } from './user';

export const authActions = createActionCreators(AuthReducer);

export type AuthActions =
  | ReturnType<typeof authActions.setIsError>
  | ReturnType<typeof authActions.setErrMsg>
  | ReturnType<typeof authActions.setIsLoading>;

export const sendPhoneNumber = (catalogId: string, query: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  try {
    dispatch(authActions.setIsLoading(true));
    const { languageReducer, userReducer: { user: { phoneNumber } } } = getState();
    const { ln } = languageReducer;

    await mainApi.sendPhone(phoneNumber, ln);
    if (query) {
      dispatch(push(`/${catalogId}/verify${query}`));
    } else {
      dispatch(push(`/catalogs/${catalogId}`));
    }

    dispatch(authActions.setIsError(false));

    window.dataLayer.push({
      event: 'agoraBuyerPhoneNumberAuthSubmit',
      formName: 'Agora Buyer Phone Number Auth Submit',
    });
  } catch (e) {
    dispatch(authActions.setIsError(true));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const sendSecretPhone = (id: string, query: string): AsyncAction => async (
  dispatch,
  getState,
  { mainSecret },
) => {
  try {
    dispatch(authActions.setIsLoading(true));
    const { languageReducer, userReducer: { user: { phoneNumber } } } = getState();
    const { ln } = languageReducer;

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
    } = await mainSecret.sendSecretPhone(phoneNumber, ln);

    window.dataLayer.push({
      event: 'agoraBuyerPhoneNumberAuthSubmit',
      formName: 'Agora Buyer Phone Number Auth Submit',
    });

    LocalStorage.setAccessToken(accessToken);
    LocalStorage.setRefreshToken(refreshToken);
    LocalStorage.setPhoneNumber(phoneNumber);

    if (query === '?quote') {
      await dispatch(sendQuote(id));
    } else {
      await dispatch(getUserInfoByPhone());

      const path = reviewPage(id, query);
      dispatch(push(path));
    }
  } catch (e) {
    dispatch(authActions.setIsError(true));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const sendCode = (otp: string, id: string, query: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  try {
    dispatch(authActions.setIsLoading(true));
    const { userReducer: { user: { phoneNumber } } } = getState();

    const body: ValidateOTPBody = {
      phone_number: phoneNumber,
      otp,
    };

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
    } = await mainApi.validateOTP(body);

    LocalStorage.setAccessToken(accessToken);
    LocalStorage.setRefreshToken(refreshToken);
    LocalStorage.setPhoneNumber(phoneNumber);

    window.dataLayer.push({
      event: 'agoraBuyerOTPVerified',
      formName: 'Agora Buyer OTP Verified',
    });

    if (query === '?quote') {
      await dispatch(sendQuote(id));
    } else {
      await dispatch(getUserInfoByPhone());

      const path = reviewPage(id, query);
      dispatch(push(path));
    }

    dispatch(authActions.setIsError(false));
  } catch (e) {
    dispatch(authActions.setIsError(true));
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};
