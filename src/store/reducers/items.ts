/* eslint-disable no-param-reassign */
import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { Unit } from './units';

export enum Filters {
  ALL,
  LISTED,
  HIDDEN
}

export interface Item {
  id: string;
  title: string;
  name: string;
  unit: Unit;
  price: string;
  customUnit: string;
  code: string;
  description: string;
  images: string;
}

export interface FullItem {
  id: number;
  name: string;
  price: number | null;
  images: string;
  custom_unit_name: string;
  code: string;
  description: string;
  is_listed: boolean;
  seller_id: number;
  unit_id: number;
  unit: string;
  custom_price: number | null;
  currency_iso: string;
}

export interface ItemsState {
  userItems: FullItem[];
  userItem: FullItem | null;
  isLoading: boolean;
  isSmallLoading: boolean;
  isSaveLoading: boolean;
  isCustomPrice: boolean;
  response: boolean;
  url: string;
  isComming: boolean;
}

const initialState: ItemsState = {
  userItems: [],
  userItem: null,
  isLoading: false,
  isComming: false,
  isSmallLoading: false,
  isSaveLoading: false,
  isCustomPrice: false,
  response: false,
  url: '',
};

export class ItemsReducer extends ImmerReducer<ItemsState> {
  changeResponse(status: boolean) {
    this.draftState.response = status;
  }

  changeUrl(url: string) {
    this.draftState.url = url;
  }

  changeItem(id: number, customPrice: number | null) {
    this.draftState.userItems.forEach((item) => {
      if (item.id === id) {
        item.custom_price = customPrice;
      }
    });
  }

  getItems(items: FullItem[]) {
    this.draftState.userItems = items.map(
      (item) => ({
        ...item,
        custom_price: item.custom_price === null ? item.price || 0 : item.custom_price,
      }),
    ).sort((a, b) => {
      const lowA = a.name.toLowerCase();
      const lowB = b.name.toLowerCase();
      if (lowA < lowB) {
        return 1;
      }
      if (lowA > lowB) {
        return -1;
      }
      return 0;
    });
  }

  loading(status : boolean) {
    this.draftState.isLoading = status;
  }

  setIsComming(isComming : boolean) {
    this.draftState.isComming = isComming;
  }

  saveLoading(status : boolean) {
    this.draftState.isSaveLoading = status;
  }

  smallLoading(status : boolean) {
    this.draftState.isSmallLoading = status;
  }

  getItem(item: FullItem) {
    this.draftState.userItem = item;
  }

  changeToggleItem(id: number) {
    this.draftState.userItems.forEach((item: FullItem) => {
      if (item.id === id) item.is_listed = !item.is_listed;
    });
  }
}

export default createReducerFunction(ItemsReducer, initialState);
