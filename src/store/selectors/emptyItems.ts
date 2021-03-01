import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { Item } from '@/store/reducers/emptyItems';

const selectEmptyItemsState = (state: State) => state.emptyItemsReducer;

export const selectItems: Selector<State, Item[]> = createSelector(
  selectEmptyItemsState,
  ({ items }) => items,
);

export const selectItemById = (id: string): Selector<State, Item | undefined> => createSelector(
  selectEmptyItemsState,
  ({ items }) => items.find((filteredItem: Item) => filteredItem.id === id),
);
