import { createSelector, Selector } from 'reselect';
import { State } from '@/store';

import { Status } from '@/utils/selectOrderStatus';

import {
  Date,
  Deliveries,
  OrderState,
  OrdersState,
  SellerStats,
  QuoteState, PERIODS,
} from '../reducers/dashboard';

const selectDashboardState = (state: State) => state.dashboardReducer;

export const selectDate: Selector<State, Date> = createSelector(
  selectDashboardState,
  ({ date }) => date,
);

export const selectOrders: Selector<State, OrdersState[] | null> = createSelector(
  selectDashboardState,
  ({ orders }) => orders,
);

export const selectOrder: Selector<State, OrderState | null> = createSelector(
  selectDashboardState,
  ({ order }) => order,
);

export const selectDeliveries: Selector<State, Deliveries[] | null> = createSelector(
  selectDashboardState,
  ({ deliveries }) => deliveries,
);

export const selectFilteredOrders: Selector<State, OrdersState[] | null> = createSelector(
  selectDashboardState,
  ({ filteredOrders }) => filteredOrders,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isLoading }) => isLoading,
);

export const selectIsLoadingStats: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isLoadingStats }) => isLoadingStats,
);

export const selectIsLoadingSelectDate: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isLoadingSelectDate }) => isLoadingSelectDate,
);

export const selectIsLoadingCancel: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isLoadingCancel }) => isLoadingCancel,
);

export const selectIsLoadingConfirm: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isLoadingConfirm }) => isLoadingConfirm,
);

export const selectIsLoadingDelivered: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isLoadingDelivered }) => isLoadingDelivered,
);

export const selectIsLoadingShipOrder: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isLoadingShipOrder }) => isLoadingShipOrder,
);

export const selectIsError: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isError }) => isError,
);

export const selectIsUpcomingDeliveriesOnly: Selector<State, boolean> = createSelector(
  selectDashboardState,
  ({ isUpcomingDeliveriesOnly }) => isUpcomingDeliveriesOnly,
);

export const selectStatusFilters: Selector<State, Status[]> = createSelector(
  selectDashboardState,
  ({ statusFilters }) => statusFilters,
);

export const selectSellerStats: Selector<State, SellerStats | null> = createSelector(
  selectDashboardState,
  ({ sellerStats }) => sellerStats,
);

export const selectCurrentStatsPeriod: Selector<State, PERIODS> = createSelector(
  selectDashboardState,
  ({ currentStatsPeriod }) => currentStatsPeriod,
);

export const selectQuotes: Selector<State, QuoteState[] | null> = createSelector(
  selectDashboardState,
  ({ quotes }) => quotes,
);

export const selectQuote: Selector<State, QuoteState | null> = createSelector(
  selectDashboardState,
  ({ quote }) => quote,
);
