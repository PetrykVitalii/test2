/* eslint-disable no-param-reassign */
import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface Catalog {
  phone: string;
  supplier_name: string;
  business_name: string;
  currency_iso: string;
  country_id: string;
  seller_catalog: SellerCatalog;
}

export interface Category {
  id: number,
  name: string,
  image_url: string,
  thumbnail_url: string,
}

export interface CatalogState {
  catalog: Catalog;
  isLoading: boolean;
  isError: boolean;
  scrollY: number;
}

export interface SellerCatalog {
  id: number;
  name: string;
  description: string;
  seller_id: number;
  category_id: number;
  short_link_id: string;
  is_custom_pricing_enabled: boolean;
  is_default: boolean;
  is_public: boolean;
  is_delivery_date_choosable: boolean;
  delivery_days: number[];
  delivery_time_from: string;
  delivery_time_to: string;
  items_count: number;
  min_order_value: number;
  standart_charge: number;
  tax_amount: number;
  category: Category;
  code: string;
}

const initialState: CatalogState = {
  catalog: {
    phone: '',
    supplier_name: '',
    business_name: '',
    currency_iso: '',
    country_id: '',
    seller_catalog: {
      id: 0,
      name: '',
      description: '',
      seller_id: 0,
      category_id: 0,
      short_link_id: '',
      is_custom_pricing_enabled: false,
      is_default: false,
      is_public: true,
      delivery_days: [],
      delivery_time_from: '',
      delivery_time_to: '',
      items_count: 0,
      min_order_value: 0,
      standart_charge: 0,
      tax_amount: 0,
      is_delivery_date_choosable: true,
      code: '',
      category: {
        id: 0,
        name: '',
        image_url: '',
        thumbnail_url: '',
      },
    },
  },
  isLoading: true,
  isError: false,
  scrollY: 0,
};

export class CatalogReducer extends ImmerReducer<CatalogState> {
  loading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setisError(isError: boolean) {
    this.draftState.isError = isError;
  }

  setCatalog(catalog: Catalog) {
    this.draftState.catalog = catalog;
  }

  setScrollY(scrollY: number) {
    this.draftState.scrollY = scrollY;
  }
}

export default createReducerFunction(CatalogReducer, initialState);
