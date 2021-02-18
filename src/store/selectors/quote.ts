/* eslint-disable import/prefer-default-export */
import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { Quote } from '@/api/main';
import { FullItem } from '../reducers/items';
import { SellerCatalog } from '../reducers/catalog';

const selectQuoteState = (state: State) => state.quoteReducer;

export const selectIsComing: Selector<State, boolean> = createSelector(
  selectQuoteState,
  ({ isComing }) => isComing,
);

export const selectIsLoadingQuote: Selector<State, boolean> = createSelector(
  selectQuoteState,
  ({ isLoading }) => isLoading,
);

export const selectQuote: Selector<State, Quote> = createSelector(
  selectQuoteState,
  ({ quote }) => quote,
);

export const selectCatalog: Selector<State, SellerCatalog> = createSelector(
  selectQuoteState,
  ({ catalog }) => catalog,
);

export const selectItems: Selector<State, FullItem[]> = createSelector(
  selectQuoteState,
  ({ items }) => items,
);
