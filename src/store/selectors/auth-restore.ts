import { createSelector, Selector } from 'reselect';
import { State } from '@/store';

const selectAuthRestore = (state: State) => state.authRestoreReducer;

export const selectAuthRestoreIsLoading: Selector<State, boolean> = createSelector(
  selectAuthRestore,
  ({ isLoading }) => isLoading,
);

export const selectAuthRestoreIsLoggedIn: Selector<State, boolean> = createSelector(
  selectAuthRestore,
  ({ isLogIn }) => isLogIn,
);
