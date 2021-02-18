/* eslint-disable import/prefer-default-export */
import { UserOrder } from '@/api/main-protected';
import { State } from '@/store';
import { Selector } from 'react-redux';
import { createSelector } from 'reselect';

const selectOrderState = (state: State) => state.orderReducer;

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectOrderState,
  ({ isLoading }) => isLoading,
);

export const selectIsComming: Selector<State, boolean> = createSelector(
  selectOrderState,
  ({ isComming }) => isComming,
);

export const selectPersonalOrder: Selector<State, UserOrder> = createSelector(
  selectOrderState,
  ({ fullOrder }) => fullOrder,
);
