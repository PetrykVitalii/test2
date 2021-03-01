import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { IСategory } from '@/store/reducers/categories';

const categoryState = (state: State) => state.categoryReducer;

// eslint-disable-next-line import/prefer-default-export
export const selectCategories: Selector<State, IСategory[]> = createSelector(
  categoryState,
  ({ categories }) => categories,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  categoryState,
  ({ isLoading }) => isLoading,
);

export const selectIsComming: Selector<State, boolean> = createSelector(
  categoryState,
  ({ isComming }) => isComming,
);
