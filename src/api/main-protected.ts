import { SellerCatalog } from '@/store/reducers/catalog';
import { FullItem } from '@/store/reducers/items';
import HttpClientProtected from './http-client-protected';

export interface ShortItem {
  item_id: number;
  count?: number;
}

export interface Order {
  language: string,
  items: ShortItem[],
  full_name: string,
  business_name?: string,
  city: string,
  post_code: string,
  delivery_date: number | null,
  delivery_address: string,
  notes?: string
}

export interface SendQuote {
  full_name: string,
  phone_number: string,
  business_name?: string,
  notes?: string,
}

export interface FullOrder {
  code: string,
  business_name: string,
  catalog_id: number,
  city: string,
  created_at: number,
  customer_id: number,
  delivery_address: string,
  delivery_date: number,
  tax_amount: number,
  full_name: string,
  id: number,
  link: string,
  notes: string,
  post_code: string,
  seller_id: number,
  status: string,
  updated_at: number,
}

export interface ItemsCount {
  count: number;
  item: FullItem;
}

export interface UserOrder {
  items: ItemsCount[],
  items_count: number,
  order: FullOrder,
  seller_full_name: string,
  seller_business_name: string,
  customer_full_name: string,
  seller_phone: string,
  currency_iso: string,
  city: string,
  catalog: SellerCatalog,
  customer: {
    id: number,
    phone_number: string,
  }
}

export interface GetUserInfoByPhone {
  customer_id: number,
  full_name: string,
  business_name: string,
  city: string,
  post_code: string,
  notes: string,
  delivery_address: string,
}

export default class MainProtected extends HttpClientProtected {
  public constructor() {
    super(process.env.API_URL);
  }

  public sendOrder(body: Order, id: string) {
    return this.instance.post<{encoded_order_id: string}>(`/buyer/place-order/${id}`, body);
  }

  public sendQuote(body: SendQuote, id: string) {
    return this.instance.post<{encoded_quote_id: string}>(`/buyer/place-quote/${id}`, body);
  }

  public getUserInfoByPhone() {
    return this.instance.get<{buyer_info: GetUserInfoByPhone}>('/buyer-info');
  }
}
