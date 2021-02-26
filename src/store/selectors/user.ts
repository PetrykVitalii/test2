import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { User } from '@/store/reducers/user';

import { displayCurrency, placeholderCurrency } from '@/utils/currency';

const selectUserState = (state: State) => state.userReducer;

export const selectCurrency: Selector<State, string> = createSelector(
  selectUserState,
  ({ user }) => displayCurrency(user?.currency_iso || ''),
);

export const selectPlaceholder: Selector<State, string> = createSelector(
  selectUserState,
  ({ user }) => {
    const currencyIso = user?.currency_iso || '';
    const value = placeholderCurrency[currencyIso] || `${user?.currency_iso} 16`;

    return value;
  },
);

export const selectUser: Selector<State, User | null> = createSelector(
  selectUserState,
  ({ user }) => user,
);

export const selectDeliveries: Selector<State, number> = createSelector(
  selectUserState,
  ({ deliveries }) => deliveries,
);

export const selectPendingOrders: Selector<State, number> = createSelector(
  selectUserState,
  ({ pending_orders }) => pending_orders,
);

export const selectConfirmedOrders: Selector<State, number> = createSelector(
  selectUserState,
  ({ confirmed_orders }) => confirmed_orders,
);

export const selectDefaultCatalogId: Selector<State, number> = createSelector(
  selectUserState,
  ({ defaultCatalogId }) => defaultCatalogId,
);

export const selectPendingQuotes: Selector<State, number> = createSelector(
  selectUserState,
  ({ pending_quotes }) => pending_quotes,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectUserState,
  ({ isLoading }) => isLoading,
);

export const selectIsComing: Selector<State, boolean> = createSelector(
  selectUserState,
  ({ isComing }) => isComing,
);
