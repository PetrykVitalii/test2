import { createSelector, Selector } from 'reselect';
import { State } from '@/store';

import { Order, User } from '../reducers/user';
import { FullItem } from '../reducers/items';

const selectUserState = (state: State) => state.userReducer;

export const selectUser: Selector<State, User> = createSelector(
  selectUserState,
  ({ user }) => user,
);

export const selectUserIsLoading: Selector<State, boolean> = createSelector(
  selectUserState,
  ({ isLoading }) => isLoading,
);

export const selectPhoneNumber: Selector<State, string> = createSelector(
  selectUserState,
  ({ user }) => user.phoneNumber,
);

export const selectUserItems: Selector<State, FullItem[]> = createSelector(
  selectUserState,
  ({ userItems }) => userItems,
);

export const selectOrder: Selector<State, Order> = createSelector(
  selectUserState,
  ({ order }) => order,
);
