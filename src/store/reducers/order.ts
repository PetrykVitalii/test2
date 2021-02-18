import { UserOrder } from '@/api/main-protected';
import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface OrderState {
  isLoading: boolean,
  isComming: boolean,
  fullOrder: UserOrder,
}

const initialState: OrderState = {
  isLoading: false,
  isComming: false,
  fullOrder: {
    items: [{
      count: 1,
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
    }],
    items_count: 1,
    order: {
      code: '',
      business_name: '',
      catalog_id: 0,
      city: '',
      created_at: 0,
      customer_id: 0,
      delivery_address: '',
      delivery_date: 0,
      tax_amount: 0,
      full_name: '',
      id: 0,
      link: '',
      notes: '',
      post_code: '',
      seller_id: 0,
      status: '',
      updated_at: 0,
    },
    seller_full_name: '',
    seller_business_name: '',
    customer_full_name: '',
    currency_iso: '',
    seller_phone: '',
    city: '',
    customer: {
      id: 0,
      phone_number: '',
    },
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
      is_delivery_date_choosable: true,
      delivery_days: [],
      delivery_time_from: '',
      delivery_time_to: '',
      items_count: 0,
      min_order_value: 0,
      standart_charge: 0,
      tax_amount: 0,
      code: '',
      category: {
        id: 0,
        name: '',
        image_url: '',
        thumbnail_url: '',
      },
    },
  },
};

export class OrderReducer extends ImmerReducer<OrderState> {
  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsComming(isComming: boolean) {
    this.draftState.isComming = isComming;
  }

  setOrder(order: UserOrder) {
    this.draftState.fullOrder = order;
  }
}

export default createReducerFunction(OrderReducer, initialState);
