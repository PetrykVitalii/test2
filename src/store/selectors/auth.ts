import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { AuthState, STEPS } from '@/store/reducers/auth';

const selectAuth = (state: State) => state.authReducer;

export const selectAuthState: Selector<State, AuthState> = createSelector(
  selectAuth,
  (authState) => authState,
);

export const selectAuthStep: Selector<State, STEPS> = createSelector(
  selectAuth,
  ({ step }) => step,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectAuth,
  ({ isLoading }) => isLoading,
);

export const selectIsError: Selector<State, boolean> = createSelector(
  selectAuth,
  ({ isError }) => isError,
);

export const selectErrMsg: Selector<State, string> = createSelector(
  selectAuth,
  ({ errMsg }) => errMsg,
);

export const selectLink: Selector<State, string> = createSelector(
  selectAuth,
  ({ link }) => link,
);
