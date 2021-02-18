/* eslint-disable import/prefer-default-export */
import { State } from '@/store';
import { Selector } from 'react-redux';
import { createSelector } from 'reselect';

const selectAuthState = (state: State) => state.authReducer;

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectAuthState,
  ({ isLoading }) => isLoading,
);

export const selectIsError: Selector<State, boolean> = createSelector(
  selectAuthState,
  ({ isError }) => isError,
);

export const selectErrMsg: Selector<State, string> = createSelector(
  selectAuthState,
  ({ errMsg }) => errMsg,
);
