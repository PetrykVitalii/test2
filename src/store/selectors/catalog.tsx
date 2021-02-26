import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { ICatalog } from '@/store/reducers/catalogs';
import { FullItem } from '@/store/reducers/items';
import { TAB } from '@/store/reducers/catalog';

const catalogState = (state: State) => state.catalogReducer;

export const selectCatalog: Selector<State, ICatalog | null> = createSelector(
  catalogState,
  ({ catalog }) => catalog,
);

export const selectDefaultCatalog: Selector<State, ICatalog | null> = createSelector(
  catalogState,
  ({ catalog }) => catalog,
);

export const selectCatalogItems: Selector<State, FullItem[]> = createSelector(
  catalogState,
  ({ items }) => items,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  catalogState,
  ({ isLoading }) => isLoading,
);

export const selectIsComming: Selector<State, boolean> = createSelector(
  catalogState,
  ({ isComming }) => isComming,
);

export const selectIsLoaded: Selector<State, boolean> = createSelector(
  catalogState,
  ({ isLoaded }) => isLoaded,
);

export const selectIsDefaultLoading: Selector<State, boolean> = createSelector(
  catalogState,
  ({ isDefaultLoading }) => isDefaultLoading,
);

export const selectSelectedTab: Selector<State, TAB> = createSelector(
  catalogState,
  ({ selectedTab }) => selectedTab,
);
