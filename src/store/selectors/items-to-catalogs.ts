/* eslint-disable import/prefer-default-export */
import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { FullItem } from '../reducers/items';
import { AddCatalog } from '../reducers/items-to-catalogs';

const selectItemsToCatalogsState = (state: State) => state.itemsToCatalogsReducer;

export const selectCatalogs: Selector<State, AddCatalog[]> = createSelector(
  selectItemsToCatalogsState,
  ({ catalogs }) => catalogs,
);

export const selectItems: Selector<State, FullItem[]> = createSelector(
  selectItemsToCatalogsState,
  ({ items }) => items,
);

export const selectIsComing: Selector<State, boolean> = createSelector(
  selectItemsToCatalogsState,
  ({ isComing }) => isComing,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectItemsToCatalogsState,
  ({ isLoading }) => isLoading,
);
