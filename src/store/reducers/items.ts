/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface FullItem {
  id: number;
  name: string;
  price: number;
  currency_iso: string;
  custom_price: number;
  images: string;
  custom_unit_name: string;
  code: string;
  description: string;
  is_listed: boolean;
  seller_id: number;
  unit_id: number;
  unit: string;
  is_status: boolean;
  count: number;
}

export interface ItemsState {
  items: FullItem[];
  item: FullItem;
  isLoading: boolean;
  isCustomPrice: boolean;
}

const initialState: ItemsState = {
  isCustomPrice: false,
  items: [],
  item: {
    id: 0,
    name: '',
    price: 0,
    currency_iso: '',
    custom_price: 0,
    images: '',
    custom_unit_name: '',
    code: '',
    description: '',
    is_listed: false,
    seller_id: 0,
    unit_id: 0,
    unit: '',
    is_status: true,
    count: 1,
  },
  isLoading: false,
};

export class ItemsReducer extends ImmerReducer<ItemsState> {
  clearItemInfo() {
    this.draftState.items = this.draftState.items.map((item) => {
      item.count = 1;
      item.is_status = false;
      return item;
    });
  }

  loading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setCatalogItems(items: FullItem[]) {
    this.draftState.items = items;
  }

  setIsCustomPrice(is_custom_price: boolean) {
    this.draftState.isCustomPrice = is_custom_price;
  }

  getItem(item: FullItem) {
    this.draftState.item = item;
  }

  clearItem() {
    this.draftState.item = {
      id: 0,
      name: '',
      price: 0,
      currency_iso: '',
      custom_price: 0,
      images: '',
      custom_unit_name: '',
      code: '',
      description: '',
      is_listed: false,
      seller_id: 0,
      unit_id: 0,
      unit: '',
      is_status: true,
      count: 1,
    };
  }

  changeToggleItem(id: number) {
    this.draftState.items.forEach((item: FullItem) => {
      if (item.id === id) item.is_status = !item.is_status;
    });
  }
}

export default createReducerFunction(ItemsReducer, initialState);
