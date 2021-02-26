import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface User {
  business_name: string;
  city_id: string;
  country_id: string;
  created_at: null | string;
  currency_iso: string;
  full_name: string;
  id: number;
  phone: string;
  updated_at: null | string;
  city: string;
  deliveries: number;
  items_count: number;
  language: string;
  pending_orders: number;
  confirmed_orders: number;
  email: string;
}

export interface UserState {
  user: User | null;
  deliveries: number;
  pending_orders: number;
  confirmed_orders: number;
  pending_quotes: number;
  defaultCatalogId: number;
  isLoading: boolean;
  isComing: boolean;
}

const initialState: UserState = {
  deliveries: 0,
  user: null,
  pending_orders: 0,
  confirmed_orders: 0,
  pending_quotes: 0,
  defaultCatalogId: 0,
  isLoading: false,
  isComing: false,
};

export class UserReducer extends ImmerReducer<UserState> {
  setUser(user: User) {
    this.draftState.user = user;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsComing(isComing: boolean) {
    this.draftState.isComing = isComing;
  }

  setDeliveries(deliveries: number) {
    this.draftState.deliveries = deliveries;
  }

  setDefaultCatalogId(defaultCatalogId: number) {
    this.draftState.defaultCatalogId = defaultCatalogId;
  }

  setPendingOrders(pendingOrders: number) {
    this.draftState.pending_orders = pendingOrders;
  }

  setConfirmedOrders(confirmedOrders: number) {
    this.draftState.confirmed_orders = confirmedOrders;
  }

  setPendingQuotes(pendingQuotes: number) {
    this.draftState.pending_quotes = pendingQuotes;
  }
}

export default createReducerFunction(UserReducer, initialState);
