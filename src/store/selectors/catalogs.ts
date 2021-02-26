import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { ICatalog } from '@/store/reducers/catalogs';

const catalogsState = (state: State) => state.catalogsReducer;

// eslint-disable-next-line import/prefer-default-export
export const selectCatalogs: Selector<State, ICatalog[]> = createSelector(
  catalogsState,
  ({ catalogs }) => catalogs,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  catalogsState,
  ({ isLoading }) => isLoading,
);
