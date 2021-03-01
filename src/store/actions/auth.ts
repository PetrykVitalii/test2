/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import { authRestore } from '@/store/actions/auth-restore';
import { IUtm } from '@/store/actions/utm-tracking';

import { AuthReducer } from '@/store/reducers/auth';
import { Item } from '@/store/reducers/items';

import LocalStorage, { LOCALS } from '@/utils/local-storage';
import Authorization from '@/utils/language/Authorization';

import { AsyncAction } from './common';
import { emptyItemsActions } from './emptyItems';
import { userActions } from './user';

export const authActions = createActionCreators(AuthReducer);

export type AuthActions =
  | ReturnType<typeof authActions.nextStep>
  | ReturnType<typeof authActions.setParticularStep>
  | ReturnType<typeof authActions.setIsLoadingActive>
  | ReturnType<typeof authActions.setIsLoadingInactive>
  | ReturnType<typeof authActions.setIsErrorActive>
  | ReturnType<typeof authActions.setIsErrorInactive>
  | ReturnType<typeof authActions.setErrMsg>
  | ReturnType<typeof authActions.setLink>;

export const sendPhoneNumber = (phoneNumber: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  try {
    dispatch(authActions.setIsLoadingActive());
    const { router, languageReducer } = getState();
    const { search } = router.location;
    const { ln } = languageReducer;

    await mainApi.sendPhone(phoneNumber, ln);

    dispatch(push(`/signup/verify${search}`));
    dispatch(authActions.nextStep());

    window.dataLayer.push({
      event: 'agoraPhoneNumberAuthSubmit1',
      formName: 'Agora Phone Number Auth Submit',
    });
  } catch (e) {
    dispatch(authActions.setIsLoadingInactive());
  }
};

export const sendCode = (phoneNumber: string, otp: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  const { languageReducer } = getState();
  const { ln } = languageReducer;
  const authorization = new Authorization(ln);

  try {
    dispatch(authActions.setIsLoadingActive());
    dispatch(authActions.setIsErrorInactive());

    const utm = LocalStorage.getUTM() || {};

    const utmWithSingleValue = Object.entries(utm).reduce((utms, [key, value]) => {
      const utmsCopy = { ...utms };

      const firstValue = (value as string).split(';')[0];

      utmsCopy[(key as keyof IUtm)] = firstValue;

      return utmsCopy;
    }, {} as IUtm);

    const body = {
      phone_number: phoneNumber,
      otp,
      ...utmWithSingleValue,
    };

    const { access_token: accessToken, refresh_token: refreshToken } = await mainApi.validateOTP(
      body,
    );

    LocalStorage.setAccessToken(accessToken);
    LocalStorage.setRefreshToken(refreshToken);

    dispatch(authRestore());

    window.dataLayer.push({
      event: 'agoraOTPVerified',
      formName: 'Agora OTP Verified',
    });
  } catch (e) {
    dispatch(authActions.setIsLoadingInactive());
    dispatch(authActions.setIsErrorActive());
    dispatch(authActions.setErrMsg(authorization.code_send_error));
    LocalStorage.clearByKey(LOCALS.ACCESS_TOKEN);
    LocalStorage.clearByKey(LOCALS.REFRESH_TOKEN);
  }
};

export const sendCodeAgain = (phoneNumber: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi },
) => {
  try {
    dispatch(authActions.setIsLoadingActive());
    dispatch(authActions.setIsErrorInactive());

    await mainApi.sendPhone(phoneNumber);
  } catch (e) {
    dispatch(authActions.setIsErrorActive());
    dispatch(authActions.setErrMsg('Something went wrong.'));
  } finally {
    dispatch(authActions.setIsLoadingInactive());
  }
};

export const sendDetails = (userName: string, businessName: string): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(authActions.setIsLoadingActive());
    dispatch(authActions.setIsErrorInactive());

    const { router } = getState();
    const { search } = router.location;

    const body = {
      full_name: userName,
      business_name: businessName,
    };

    await mainProtectedApi.sendNames(body);

    dispatch(push(`/setup/step2${search}`));
    dispatch(authActions.nextStep());

    window.dataLayer.push({
      event: 'agoraOnboardingProfileDetailsSubmit',
      formName: 'Agora Onboarding Profile Details Submit',
    });
  } catch (e) {
    dispatch(authActions.setIsErrorActive());
    dispatch(authActions.setErrMsg('Something went wrong.'));
    dispatch(authActions.setIsLoadingInactive());
  }
};

export const sendLocated = (
  countryId: number,
  cityId: number | null,
  city: string,
): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(authActions.setIsLoadingActive());
    dispatch(authActions.setIsErrorInactive());

    const body = {
      country_id: countryId,
      city_id: cityId,
      city,
    };

    await mainProtectedApi.sendLocated(body);

    await dispatch(refreshUser());

    dispatch(push('/setup/step3'));

    dispatch(authActions.nextStep());

    window.dataLayer.push({
      event: 'agoraOnboardingLocationSubmit',
      formName: 'Agora Onboarding Location Submit',
    });
  } catch (e) {
    dispatch(authActions.setIsErrorActive());
    dispatch(authActions.setErrMsg('Something went wrong.'));
    dispatch(authActions.setIsLoadingInactive());
  }
};

export const refreshUser = (): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(userActions.setIsComing(false));
    dispatch(userActions.setIsLoading(true));

    const {
      seller,
      deliveries,
      pending_orders: pendingOrders,
      confirmed_orders: confirmedOrders,
      pending_quotes: pendingQuotes,
    } = await mainProtectedApi.getMe();

    dispatch(userActions.setUser(seller));
    dispatch(userActions.setDeliveries(deliveries));
    dispatch(userActions.setPendingOrders(pendingOrders));
    dispatch(userActions.setConfirmedOrders(confirmedOrders));
    dispatch(userActions.setPendingQuotes(pendingQuotes));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(userActions.setIsComing(true));
    dispatch(userActions.setIsLoading(false));
  }
};

export const sendItems = (): AsyncAction => async (dispatch, getState, { mainProtectedApi }) => {
  try {
    dispatch(authActions.setIsLoadingActive());
    dispatch(authActions.setIsErrorInactive());

    const { emptyItemsReducer } = getState();
    const { items } = emptyItemsReducer;

    const formatItems = ({
      name, unit, customUnit, description, images, price, code,
    }: Item) => ({
      name,
      unit_id: unit.id,
      description,
      images,
      code,
      ...(price ? { price: +price } : {}),
      ...(customUnit ? { custom_unit_name: customUnit } : {}),
    });

    const body = {
      seller_items: items.map(formatItems),
    };

    await mainProtectedApi.sendItems(body);
    dispatch(emptyItemsActions.clearItems());
    dispatch(push('/setup/step5'));
    dispatch(authActions.nextStep());

    window.dataLayer.push({
      event: 'agoraOnboardingNewItemsSubmit',
      formName: 'Agora Onboarding New Items Submit',
      noItems: `${items.length}`,
    });
  } catch (e) {
    dispatch(authActions.setIsErrorActive());
    dispatch(authActions.setErrMsg('Something went wrong.'));
    dispatch(authActions.setIsLoadingInactive());
  }
};

export const sendBeacon = (): AsyncAction => async (
) => {
  try {
    // const utms = LocalStorage.getUTM() || {};

    // const utmsEntries = Object.entries(utms);
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const filteredUtms = utmsEntries.filter(([_, value]) => value);
    // const utmsToSend = Object.fromEntries<string>(filteredUtms);
    // const { userReducer: { user } } = getState();

    // const body = {
    //   ...utmsToSend,
    //   phone_number: user?.phone,
    //   full_name: user?.full_name,
    //   business_name: user?.business_name,
    //   locale,
    //   country,
    //   city,
    // };

    // await axios.post(process.env.BASIN_URL, body);
  } catch (e) {
    console.error(e);
  }
};
