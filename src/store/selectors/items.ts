import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { FullItem } from '@/store/reducers/items';

const selectItemsState = (state: State) => state.itemsReducer;

export const responseDelete: Selector<State, boolean> = createSelector(
  selectItemsState,
  ({ response }) => response,
);

export const selectUrl: Selector<State, string> = createSelector(
  selectItemsState,
  ({ url }) => url,
);

export const loading: Selector<State, boolean> = createSelector(
  selectItemsState,
  ({ isLoading }) => isLoading,
);

export const selectIsComming: Selector<State, boolean> = createSelector(
  selectItemsState,
  ({ isComming }) => isComming,
);

export const saveLoading: Selector<State, boolean> = createSelector(
  selectItemsState,
  ({ isSaveLoading }) => isSaveLoading,
);

export const smallLoading: Selector<State, boolean> = createSelector(
  selectItemsState,
  ({ isSmallLoading }) => isSmallLoading,
);

export const selectUserItems: Selector<State, FullItem[]> = createSelector(
  selectItemsState,
  ({ userItems }) => userItems,
);

export const selectUserItem: Selector<State, FullItem | null> = createSelector(
  selectItemsState,
  ({ userItem }) => userItem,
);

export const selectIsCustomPrice: Selector<State, boolean> = createSelector(
  selectItemsState,
  ({ isCustomPrice }) => isCustomPrice,
);
