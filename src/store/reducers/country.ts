/* eslint-disable no-param-reassign */
import { CountryFromList } from '@/utils/country-list';
import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface CountryState {
  country: CountryFromList;
}

const initialState: CountryState = {
  country: {
    country: '',
    code: '',
    iso: '',
    src: '',
  },
};

export class CountryReducer extends ImmerReducer<CountryState> {
  changeCountry(country: CountryFromList) {
    this.draftState.country = country;
  }
}

export default createReducerFunction(CountryReducer, initialState);
