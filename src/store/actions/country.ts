import CloudflareApi from '@/api/cloudflare';
import { countryList } from '@/utils/country-list';
import { createActionCreators } from 'immer-reducer';
import { CountryReducer } from '../reducers/country';
import { AsyncAction } from './common';

export const countryActions = createActionCreators(CountryReducer);

export type CountryActions =
  | ReturnType<typeof countryActions.changeCountry>;

export const detectCountry = (): AsyncAction => async (
  dispatch,
) => {
  try {
    const cloudflareApi = new CloudflareApi();

    const trace = await cloudflareApi.trace();

    const matched = trace.match(/^loc=[A-Z]{2,}/gm);

    const [location] = matched!;

    const iso = location.split('=')[1];

    const country = countryList.find((countryToFind) => countryToFind.iso === iso);

    if (!country) {
      throw new Error();
    }

    dispatch(countryActions.changeCountry(country));
  } catch (e) {
    const singapore = countryList.find((country) => country.iso === 'SG')!;
    dispatch(countryActions.changeCountry(singapore));
  }
};
