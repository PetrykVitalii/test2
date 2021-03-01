import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { IСategory } from './categories';

export interface ICatalog {
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
}

export interface ICatalogsState {
  catalogs: ICatalog[];
  isLoading: boolean;
}

const initialState: ICatalogsState = {
  catalogs: [],
  isLoading: false,
};

export class CatalogsReducer extends ImmerReducer<ICatalogsState> {
  setIsLoading(status: boolean) {
    this.draftState.isLoading = status;
  }

  setCatalogs(catalogs: ICatalog[]) {
    this.draftState.catalogs = catalogs;
  }
}

export default createReducerFunction(CatalogsReducer, initialState);
