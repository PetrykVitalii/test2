import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { Catalog } from '../reducers/catalog';

const selectCatalogState = (state: State) => state.catalogReducer;

export const selectCatalog: Selector<State, Catalog> = createSelector(
  selectCatalogState,
  ({ catalog }) => catalog,
);

export const selectLoading: Selector<State, boolean> = createSelector(
  selectCatalogState,
  ({ isLoading }) => isLoading,
);

export const selectScrollY: Selector<State, number> = createSelector(
  selectCatalogState,
  ({ scrollY }) => scrollY,
);

export const selectIsError: Selector<State, boolean> = createSelector(
  selectCatalogState,
  ({ isError }) => isError,
);

export const selectIso: Selector<State, string> = createSelector(
  selectCatalogState,
  ({ catalog }) => catalog.currency_iso,
);
