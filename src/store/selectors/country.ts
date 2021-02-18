/* eslint-disable import/prefer-default-export */
import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { CountryFromList } from '@/utils/country-list';

const selectCountryState = (state: State) => state.countryReducer;

export const selectCountry: Selector<State, CountryFromList> = createSelector(
  selectCountryState,
  ({ country }) => country,
);
