import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { FullItem } from '../reducers/items';

const selectItemsState = (state: State) => state.itemsReducer;

export const selectCatalogItems: Selector<State, FullItem[]> = createSelector(
  selectItemsState,
  ({ items }) => items,
);

export const selectItem: Selector<State, FullItem> = createSelector(
  selectItemsState,
  ({ item }) => item,
);

export const selectLoading: Selector<State, boolean> = createSelector(
  selectItemsState,
  ({ isLoading }) => isLoading,
);

export const selectIsCustomPrice: Selector<State, boolean> = createSelector(
  selectItemsState,
  ({ isCustomPrice }) => isCustomPrice,
);
