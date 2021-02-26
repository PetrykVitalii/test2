/* eslint-disable no-param-reassign */
import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { IСategory } from './categories';
import { FullItem } from './items';

export interface AddCatalog {
  id: number;
  name: string;
  description: string | null;
  seller_id: number;
  category_id: number;
  category: IСategory;
  short_link_id: string;
  delivery_days: number[];
  delivery_time_from: string;
  delivery_time_to: string;
  standart_charge: number | null;
  min_order_value: number | null;
  tax_amount: number | null;
  items_count: number;
  is_default: boolean;
  is_public: boolean;
  is_custom_pricing_enabled: boolean;
  is_delivery_date_choosable: boolean;
  short_link: string;
  created_at: string | null;
  updated_at: string | null;
  isAddStatus?: boolean;
}

export interface ItemsToCatalogsState {
  catalogs: AddCatalog[];
  items: FullItem[];
  isComing: boolean;
  isLoading: boolean;
}

const initialState: ItemsToCatalogsState = {
  catalogs: [],
  items: [],
  isComing: false,
  isLoading: false,
};

export class ItemsToCatalogsReducer extends ImmerReducer<ItemsToCatalogsState> {
  setCatalogs(catalogs: AddCatalog[]) {
    this.draftState.catalogs = catalogs;
  }

  setItems(items: FullItem[]) {
    this.draftState.items = items;
  }

  setIsComing(isComing: boolean) {
    this.draftState.isComing = isComing;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  changeToggleCatalog(id: number) {
    this.draftState.catalogs.forEach((catalog: AddCatalog) => {
      if (catalog.id === id) catalog.isAddStatus = !catalog.isAddStatus;
    });
  }
}

export default createReducerFunction(ItemsToCatalogsReducer, initialState);
