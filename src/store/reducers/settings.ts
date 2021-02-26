/* eslint-disable no-param-reassign */
import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { City } from '@/api/main';
import { User } from '@/store/reducers/user';

export interface UserInfo {
  city: string;
  deliveries: number;
  items_count: number;
  language: string;
  pending_orders: number;
  seller: User;
  short_link: string;
}

export interface SettingsState {
  user: User | null;
  userInfo: UserInfo | null;
  isLoading: boolean;
  isSmallLoading: boolean;
  isSaveLoading: boolean;
  url: string;
  cities: City[] | null;
}

const initialState: SettingsState = {
  user: null,
  userInfo: null,
  isLoading: true,
  isSmallLoading: true,
  isSaveLoading: false,
  url: '',
  cities: null,
};

export class SettingsReducer extends ImmerReducer<SettingsState> {
  setUser(user: User) {
    this.draftState.user = user;
  }

  setFullInfo(userInfo: UserInfo) {
    this.draftState.userInfo = userInfo;
  }

  setIsLoading(status : boolean) {
    this.draftState.isLoading = status;
  }

  setIsSaveLoading(status : boolean) {
    this.draftState.isSaveLoading = status;
  }

  setIsSmallLoading(status : boolean) {
    this.draftState.isSmallLoading = status;
  }

  setCitiesByCountry(cities : City[]) {
    this.draftState.cities = cities;
  }

  cleanUser() {
    this.draftState.user = null;
  }
}

export default createReducerFunction(SettingsReducer, initialState);
