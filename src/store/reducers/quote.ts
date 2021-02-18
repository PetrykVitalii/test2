/* eslint-disable no-param-reassign */
import { Quote } from '@/api/main';
import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { SellerCatalog } from './catalog';
import { FullItem } from './items';

export interface QuoteState {
  isComing: boolean;
  isLoading: boolean;
  quote: Quote;
  items: FullItem[];
  itemsCount: number;
  catalog_link: string;
  catalog: SellerCatalog;
}

const initialState: QuoteState = {
  isComing: false,
  isLoading: false,
  quote: {
    id: 0,
    seller_id: 0,
    catalog_id: 0,
    buyer_link: '',
    business_name: '',
    full_name: '',
    phone_number: '',
    notes: '',
    status: '',
    created_at: '',
    updated_at: '',
  },
  items: [{
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
    unit: '',
    unit_id: 0,
    count: 1,
    is_status: false,
  }],
  itemsCount: 1,
  catalog_link: '',
  catalog: {
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
    code: '',
    is_delivery_date_choosable: true,
    category: {
      id: 0,
      name: '',
      image_url: '',
      thumbnail_url: '',
    },
  },
};

export class QuoteReducer extends ImmerReducer<QuoteState> {
  setIsComing(isComing: boolean) {
    this.draftState.isComing = isComing;
  }

  setCatalog(catalog: SellerCatalog) {
    this.draftState.catalog = catalog;
  }

  setQuote(quote: Quote) {
    this.draftState.quote = quote;
  }

  setItems(items: FullItem[]) {
    this.draftState.items = items;
  }

  setItemsCount(itemsCount: number) {
    this.draftState.itemsCount = itemsCount;
  }

  setCatalogLink(catalog_link: string) {
    this.draftState.catalog_link = catalog_link;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }
}

export default createReducerFunction(QuoteReducer, initialState);
