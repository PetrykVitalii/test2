/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { push } from 'connected-react-router';
import { createActionCreators } from 'immer-reducer';
import moment from 'moment';

import { ItemsCount, Order, ShortItem } from '@/api/main-protected';
import LocalStorage from '@/utils/local-storage';
import reviewCode from '@/utils/reviewCode';
import { OrderReducer } from '../reducers/order';
import { AsyncAction } from './common';
import { itemsActions } from './items';
import { userActions } from './user';

export const orderActions = createActionCreators(OrderReducer);

export type OrderActions =
  | ReturnType<typeof orderActions.setOrder>
  | ReturnType<typeof orderActions.setIsComming>
  | ReturnType<typeof orderActions.setIsLoading>;

export const sendOrder = (catalogId: string, language: string): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(orderActions.setIsLoading(true));
    const {
      userReducer: { order, user, userItems },
      catalogReducer: {
        catalog: {
          seller_catalog: { is_delivery_date_choosable: isDeliveryDateChoosable },
        },
      },
    } = getState();

    const shortItems:ShortItem[] = [];
    userItems.forEach((item) => {
      shortItems.push(
        {
          item_id: item.id,
          count: item.count,
        },
      );
    });

    const dataToUtc = (): number => moment(order.deliveryDate!).endOf('day').utc().startOf('day')
      .add(12, 'hours')
      .valueOf()!;

    const sendDeliveryDate = () => {
      if (isDeliveryDateChoosable) {
        if (order.deliveryDate) {
          return dataToUtc();
        }
      }
      return null;
    };

    const body: Order = {
      language,
      items: shortItems,
      full_name: user.fullName,
      city: user.city,
      post_code: user.postCode,
      delivery_date: sendDeliveryDate(),
      delivery_address: user.adress,
      ...(user.businessName ? { business_name: user.businessName } : {}),
      ...(order.notesOrder ? { notes: order.notesOrder } : {}),
    };

    const { encoded_order_id: id } = await mainProtectedApi.sendOrder(body, catalogId);

    window.dataLayer.push({
      event: 'agoraBuyerNewOrderSubmit',
      formName: 'Agora Buyer New Order Submit',
    });

    dispatch(push(`/orders/${id}`, { showSuccessPopup: true }));
    dispatch(userActions.setUserItems([]));
    dispatch(userActions.changeOrderDate(null));
    dispatch(userActions.setNotesOrder(''));
    dispatch(itemsActions.clearItemInfo());
    LocalStorage.setDeliveryDate(null);
    LocalStorage.setUserItems(null);
    LocalStorage.setNotesOrder('');
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(orderActions.setIsLoading(false));
  }
};

export const getOrder = (orderId: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi },
) => {
  try {
    dispatch(orderActions.setIsLoading(true));

    const order = await mainApi.getOrder(orderId);

    window.dataLayer.push({
      event: `agoraOrder${order.order.status}`,
      formName: `Agora Order ${order.order.status}`,
    });
    order.items.forEach((item: ItemsCount) => {
      item.item.code = reviewCode(item.item.code);
    });
    dispatch(orderActions.setOrder(order));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(orderActions.setIsLoading(false));
    dispatch(orderActions.setIsComming(true));
  }
};
