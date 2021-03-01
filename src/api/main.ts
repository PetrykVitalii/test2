import { Unit } from '@/store/reducers/units';

import { IUtm } from '@/store/actions/utm-tracking';

import HttpClient from './http-client';

export interface Country {
  id: number;
  name: string;
  country_code: string;
}

interface GetCountriesResponse {
  countries: Country[];
}

export interface City {
  id: number;
  name: string;
  name_ascii: string;
  country_id: number;
  country_name: string;
}

interface GetCitiesByCountry {
  cities: City[];
}

interface ValidateOTPBody extends IUtm {
  phone_number: string;
  otp: string;
}

interface ValidateOTPResponse {
  access_token: string;
  refresh_token: string;
}

export interface Units {
  units: Unit[];
}

export default class MainApi extends HttpClient {
  public constructor() {
    super(process.env.API_URL);
  }

  public getUnits() {
    return this.instance.get<Units>('/units');
  }

  public getCountries() {
    return this.instance.get<GetCountriesResponse>('/countries');
  }

  public getCitiesByCountry(countryId?: number | string) {
    return this.instance.get<GetCitiesByCountry>(`countries/${countryId}/cities`);
  }

  public sendPhone(phone_number: string, ln?: string) {
    const params = { ln: ln?.toLowerCase() };
    return this.instance.post('/otp', { phone_number }, { params });
  }

  public validateOTP(body: ValidateOTPBody) {
    return this.instance.post<ValidateOTPResponse>('/otp/validate', body);
  }
}
