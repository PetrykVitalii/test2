import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { FullItem } from '@/store/reducers/items';
import { IСategory } from '@/store/reducers/categories';
import { INewCatalog } from '@/store/reducers/createCatalog';

const createCatalogState = (state: State) => state.createCatalogReducer;

// eslint-disable-next-line import/prefer-default-export
export const selectCatalog: Selector<State, INewCatalog> = createSelector(
  createCatalogState,
  ({ newCatalog }) => newCatalog,
);

export const selectItems: Selector<State, FullItem[]> = createSelector(
  createCatalogState,
  ({ newCatalog }) => newCatalog.items,
);

export const selectCategory: Selector<State, IСategory> = createSelector(
  createCatalogState,
  ({ newCatalog }) => newCatalog.category_id,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  createCatalogState,
  ({ isLoading }) => isLoading,
);

export const selectIsCustomPricingEnabled: Selector<State, boolean> = createSelector(
  createCatalogState,
  ({ newCatalog }) => newCatalog.is_custom_pricing_enabled,
);
