import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { UserInfo } from '@/store/reducers/settings';
import { User } from '@/store/reducers/user';
import { City } from '@/api/main';

const selectSettingsState = (state: State) => state.settingsReducer;

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectSettingsState,
  ({ isLoading }) => isLoading,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  selectSettingsState,
  ({ isSaveLoading }) => isSaveLoading,
);

export const selectIsSmallLoading: Selector<State, boolean> = createSelector(
  selectSettingsState,
  ({ isSmallLoading }) => isSmallLoading,
);

export const selectUser: Selector<State, User | null> = createSelector(
  selectSettingsState,
  ({ user }) => user,
);

export const selectCitiesByCountry: Selector<State, City[] | null> = createSelector(
  selectSettingsState,
  ({ cities }) => cities,
);

export const selectUserInfo: Selector<State, UserInfo | null> = createSelector(
  selectSettingsState,
  ({ userInfo }) => userInfo,
);
