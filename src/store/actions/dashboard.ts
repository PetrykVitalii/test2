/* eslint-disable no-console */
import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import { Status } from '@/utils/selectOrderStatus';
import { Select } from '@/utils/selectOrderDate';

import {
  DashboardReducer, OrdersState, SortFilters, PERIODS,
} from '../reducers/dashboard';
import { AsyncAction } from './common';

export const dashboardActions = createActionCreators(DashboardReducer);

export type DashboardActions =
  | ReturnType<typeof dashboardActions.selectDateFrom>
  | ReturnType<typeof dashboardActions.selectDateTill>
  | ReturnType<typeof dashboardActions.selectOrders>
  | ReturnType<typeof dashboardActions.selectOrder>
  | ReturnType<typeof dashboardActions.cleanOrder>
  | ReturnType<typeof dashboardActions.setDeliveries>
  | ReturnType<typeof dashboardActions.filterOrders>
  | ReturnType<typeof dashboardActions.setFilterOrders>
  | ReturnType<typeof dashboardActions.changeIsCustomDate>
  | ReturnType<typeof dashboardActions.setIsLoading>
  | ReturnType<typeof dashboardActions.setIsError>
  | ReturnType<typeof dashboardActions.setIsLoadingSelectDate>
  | ReturnType<typeof dashboardActions.setIsLoadingCancel>
  | ReturnType<typeof dashboardActions.setIsLoadingConfirm>
  | ReturnType<typeof dashboardActions.setIsLoadingDelivered>
  | ReturnType<typeof dashboardActions.setIsLoadingShipOrder>
  | ReturnType<typeof dashboardActions.cleanFilteredOrder>
  | ReturnType<typeof dashboardActions.setSellerStats>
  | ReturnType<typeof dashboardActions.setIsLoadingStats>
  | ReturnType<typeof dashboardActions.setQuotes>
  | ReturnType<typeof dashboardActions.setQuote>
  | ReturnType<typeof dashboardActions.clearQuotes>
  | ReturnType<typeof dashboardActions.cleanFilteredOrder>
  | ReturnType<typeof dashboardActions.cleanDeliveries>
  | ReturnType<typeof dashboardActions.cleanOrders>
  | ReturnType<typeof dashboardActions.setStatus>
  | ReturnType<typeof dashboardActions.setUpcomingDeliveriesOnly>
  | ReturnType<typeof dashboardActions.setStatusFilters>
  | ReturnType<typeof dashboardActions.setCurrentStatsPeriod>;

export const getOrders = (): AsyncAction => async (dispatch, _, { mainProtectedApi }) => {
  try {
    dispatch(dashboardActions.setIsLoading(true));
    const { delivery_orders: deliveryOrders } = await mainProtectedApi.getOrders();

    dispatch(dashboardActions.selectOrders(deliveryOrders));
    dispatch(dashboardActions.setIsLoading(false));
  } catch (e) {
    console.error(e);
    dispatch(dashboardActions.setIsLoading(false));
  }
};

export const getPendingOrders = (): AsyncAction => async (dispatch, _, { mainProtectedApi }) => {
  try {
    dispatch(dashboardActions.setIsLoading(true));
    const { delivery_orders: deliveryOrders } = await mainProtectedApi.getPendingOrders();

    dispatch(dashboardActions.selectOrders(deliveryOrders));
    dispatch(dashboardActions.setIsLoading(false));
  } catch (e) {
    console.error(e);
    dispatch(dashboardActions.setIsLoading(false));
  }
};

export const checkIsOrders = (
  from: number,
  to: number,
  rangeType: SortFilters,
  isUpcomingDeliveriesOnly: boolean,
  selectedStatus: Status[],
  rangeValue: Select,
): AsyncAction => async (dispatch, _, { mainProtectedApi }) => {
  try {
    dispatch(dashboardActions.setIsLoadingSelectDate(true));

    const { delivery_orders: deliveryOrders } = await mainProtectedApi.getFilteredOrders(
      from, to, rangeType,
    );

    const filters = selectedStatus.map((status) => status.key.toLowerCase().trim());
    const hasRecords = !filters.length
      || deliveryOrders.some((order: OrdersState) => filters.includes(order.order.status.toLowerCase().trim()));

    if (!deliveryOrders.length || !hasRecords) {
      dispatch(dashboardActions.setIsError(true));
      dispatch(dashboardActions.setIsLoadingSelectDate(false));
      return;
    }

    dispatch(dashboardActions.setUpcomingDeliveriesOnly(isUpcomingDeliveriesOnly));
    dispatch(dashboardActions.setStatusFilters(selectedStatus));
    dispatch(dashboardActions.changeIsCustomDate(rangeValue));

    dispatch(dashboardActions.setIsLoadingSelectDate(false));
    dispatch(push(`/orders?dateFrom=${from}&dateTill=${to}`));
  } catch (e) {
    console.error(e);
    dispatch(dashboardActions.setIsLoadingSelectDate(false));
  }
};

export const getFilteredOrders = (
  from: number,
  to: number,
  rangeType: SortFilters,
): AsyncAction => async (dispatch, _, { mainProtectedApi }) => {
  try {
    dispatch(dashboardActions.setIsLoadingSelectDate(true));
    const { delivery_orders: deliveryOrders } = await mainProtectedApi.getFilteredOrders(
      from, to, rangeType,
    );

    dispatch(dashboardActions.setFilterOrders(deliveryOrders));

    if (!deliveryOrders.length) {
      dispatch(dashboardActions.setIsError(true));
      dispatch(dashboardActions.setIsLoadingSelectDate(false));
      return;
    }

    dispatch(dashboardActions.setIsLoadingSelectDate(false));
  } catch (e) {
    console.error(e);
    dispatch(dashboardActions.setIsLoadingSelectDate(false));
  }
};

export const getOrder = (id: number | string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const order = await mainProtectedApi.getOrder(id);

    dispatch(dashboardActions.selectOrder(order));
  } catch (e) {
    console.error(e);
    dispatch(push('/orders'));
  }
};

export const getDeliveryOrders = (): AsyncAction => async (dispatch, _, { mainProtectedApi }) => {
  try {
    const { delivery_orders: orderDeliveries } = await mainProtectedApi.getOrderDeliveries();

    dispatch(dashboardActions.setDeliveries(orderDeliveries));
  } catch (e) {
    console.error(e);
  }
};

export const getSellerStats = (period: PERIODS): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(dashboardActions.setCurrentStatsPeriod(period));
    dispatch(dashboardActions.setIsLoadingStats(true));

    const data = await mainProtectedApi.getSellerStats(period);

    dispatch(dashboardActions.setSellerStats(data.seller_stats));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(dashboardActions.setIsLoadingStats(false));
  }
};

export const editStatusOrder = (id: number, status: string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    switch (status) {
      case 'Confirmed':
        dispatch(dashboardActions.setIsLoadingConfirm(true));
        break;
      case 'Shipped':
        dispatch(dashboardActions.setIsLoadingShipOrder(true));
        break;
      case 'Delivered':
        dispatch(dashboardActions.setIsLoadingDelivered(true));
        break;
      default:
        dispatch(dashboardActions.setIsLoadingCancel(true));
        break;
    }

    const body = {
      status,
    };

    await mainProtectedApi.editStatus(id, body);

    switch (status) {
      case 'Confirmed':
        dispatch(dashboardActions.setIsLoadingConfirm(false));
        break;
      case 'Shipped':
        dispatch(dashboardActions.setIsLoadingShipOrder(false));
        break;
      case 'Delivered':
        dispatch(dashboardActions.setIsLoadingDelivered(false));
        break;
      default:
        dispatch(dashboardActions.setIsLoadingCancel(false));
        break;
    }

    window.dataLayer.push({
      event: `agoraOrder${status}`,
      formName: `Agora Order ${status}`,
    });

    dispatch(dashboardActions.setStatus(status));
  } catch (e) {
    switch (status) {
      case 'Confirmed':
        dispatch(dashboardActions.setIsLoadingConfirm(false));
        break;
      case 'Shipped':
        dispatch(dashboardActions.setIsLoadingShipOrder(false));
        break;
      case 'Delivered':
        dispatch(dashboardActions.setIsLoadingDelivered(false));
        break;
      default:
        dispatch(dashboardActions.setIsLoadingCancel(false));
        break;
    }
    console.error(e);
  }
};

export const getQuotes = (): AsyncAction => async (dispatch, _, { mainProtectedApi }) => {
  try {
    const data = await mainProtectedApi.getQuotes();

    dispatch(dashboardActions.setQuotes(data.seller_quotes));
  } catch (e) {
    console.error(e);
  }
};

export const getQuote = (id: string): AsyncAction => async (dispatch, _, { mainProtectedApi }) => {
  try {
    const data = await mainProtectedApi.getQuote(id);

    dispatch(dashboardActions.setQuote(data.seller_quote));
  } catch (e) {
    console.error(e);
  }
};

export const clearQuotes = (): AsyncAction => async (dispatch) => {
  try {
    dispatch(dashboardActions.clearQuotes());
  } catch (e) {
    console.error(e);
  }
};
