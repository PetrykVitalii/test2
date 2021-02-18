/* eslint-disable no-console */
import LocalStorage from '@/utils/local-storage';
import { push } from 'connected-react-router';
import { createActionCreators } from 'immer-reducer';
import { UserReducer } from '../reducers/user';
import { AsyncAction } from './common';

export const userActions = createActionCreators(UserReducer);

export type UserActions =
  | ReturnType<typeof userActions.changeInfo>
  | ReturnType<typeof userActions.counter>
  | ReturnType<typeof userActions.clearCounter>
  | ReturnType<typeof userActions.setUserInfo>
  | ReturnType<typeof userActions.setCount>
  | ReturnType<typeof userActions.changeOrderDate>
  | ReturnType<typeof userActions.setNotesOrder>
  | ReturnType<typeof userActions.setNotesQuote>
  | ReturnType<typeof userActions.deleteItem>
  | ReturnType<typeof userActions.changeCity>
  | ReturnType<typeof userActions.setUser>
  | ReturnType<typeof userActions.setOrder>
  | ReturnType<typeof userActions.setIsLoading>
  | ReturnType<typeof userActions.clearAllUserInfo>
  | ReturnType<typeof userActions.setUserItems>;

export const LocalStorageInfoToUserReducer = (): AsyncAction => async (
  dispatch,
  getState,
) => {
  try {
    const userInfo = LocalStorage.getUserInfo();
    const catalogId = LocalStorage.getCatalogCode();

    const { router: { location } } = getState();

    if (userInfo) {
      const {
        deliveryDate, notesOrder, notesQuote, user,
      } = userInfo;
      const order = {
        deliveryDate,
        notesOrder,
        notesQuote,
      };

      dispatch(userActions.setUser(user));

      if (catalogId && location.pathname.includes(catalogId)) {
        dispatch(userActions.setOrder(order));
      } else {
        LocalStorage.setUserItems(null);
        LocalStorage.setNotesOrder('');
        LocalStorage.setNotesQuote('');
        LocalStorage.setDeliveryDate(null);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const getUserInfoByPhone = (path = ''): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(userActions.setIsLoading(true));

    const {
      buyer_info: {
        business_name: businessName,
        full_name: fullName,
        post_code: postCode,
        delivery_address: adress,
        city,
        notes,
      },
    } = await mainProtectedApi.getUserInfoByPhone();

    LocalStorage.setUserInfo('user', 'fullName', fullName || '');
    LocalStorage.setUserInfo('user', 'businessName', businessName || '');
    LocalStorage.setUserInfo('user', 'postCode', postCode || '');
    LocalStorage.setUserInfo('user', 'city', city || '');
    LocalStorage.setUserInfo('user', 'adress', adress || '');
    LocalStorage.setNotesOrder(notes || '');

    dispatch(userActions.setUserInfo(businessName || '', fullName || '', city || '', postCode || '', adress || ''));
    dispatch(userActions.setNotesOrder(notes || ''));

    if (path) {
      dispatch(push(path));
    }
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(userActions.setIsLoading(false));
  }
};
