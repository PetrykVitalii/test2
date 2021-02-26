import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import moment from 'moment';

import { SELECT_ORDER_DATE, Select } from '@/utils/selectOrderDate';
import { Status } from '@/utils/selectOrderStatus';

import { ICatalog } from './catalogs';
import { FullItem } from './items';

export interface Date {
  dateFrom: null | moment.Moment;
  dateTill: null | moment.Moment;
  isCustom: Select;
}

export enum SortFilters {
  DELIVERY_DATE = 'DELIVERY_DATE',
  ORDER_DATE = 'ORDER_DATE'
}

export enum PERIODS {
  today = 'today',
  yesterday = 'yesterday',
  this_month = 'this_month',
  last_month = 'last_month'
}

export interface Order {
  id: number;
  catalog_id: number;
  seller_id: number;
  customer_id: number;
  link: string;
  delivery_date: number | null;
  delivery_address: string;
  tax_amount: number;
  notes: string;
  status: string;
  full_name: string;
  business_name: string;
  city_id: number;
  post_code: string;
  created_at: string;
  updated_at: string;
  code: string;
  city: string;
  standart_charge: number;
}

export interface Quote {
  id: number;
  seller_id: number;
  catalog_id: number;
  buyer_link: string;
  business_name: string;
  full_name: string;
  phone_number: string;
  notes: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_viewed: boolean;
}

export interface Item {
  count: number;
  item: FullItem;
}

export interface City {
  country_id: number;
  country_name: string;
  id: number;
  name: string;
  name_ascii: string;
}

export interface Customer {
  id: number;
  phone_number: string;
}

export interface ItemDelivery {
  order_id: number;
  item_id: number;
  count: number;
}

export interface Deliveries {
  items: ItemDelivery[] | null;
  order: Order;
  delivery_date: number;
}

export interface OrderState {
  order: Order;
  items: Item[];
  customer_full_name: string;
  delivery_charge: string;
  seller_full_name: string;
  seller_phone: string;
  catalog: ICatalog;
  city: City;
  customer: Customer;
  items_count: number;
}

export interface OrdersState {
  delivery_date: number;
  order: Order;
  items: ItemDelivery[];
}

export interface QuoteState {
  code: string;
  items_count: number;
  quote: Quote;
  items: FullItem[];
}

export interface SellerStats {
  seller_id: number;
  total_catalog_visits: number;
  total_order_received: number;
  date: number;
  created_at: number;
  updated_at: number;
}

export interface DashboardState {
  date: Date;
  orders: null | OrdersState[];
  quotes: null | QuoteState[];
  quote: null | QuoteState;
  filteredOrders: null | OrdersState[];
  order: null | OrderState;
  deliveries: null | Deliveries[];
  isLoading: boolean;
  isLoadingSelectDate: boolean;
  isLoadingStatus: boolean;
  isLoadingStats: boolean;
  isLoadingCancel: boolean;
  isLoadingConfirm: boolean;
  isLoadingDelivered: boolean;
  isLoadingShipOrder: boolean;
  isError: boolean;
  isUpcomingDeliveriesOnly: boolean;
  statusFilters: Status[];
  sellerStats: null | SellerStats;
  currentStatsPeriod: PERIODS;
}

const initialState: DashboardState = {
  date: {
    dateFrom: null,
    dateTill: null,
    isCustom: SELECT_ORDER_DATE[0],
  },
  orders: null,
  filteredOrders: null,
  order: null,
  quotes: null,
  quote: null,
  deliveries: null,
  isLoading: false,
  isLoadingSelectDate: false,
  isLoadingStatus: false,
  isLoadingStats: true,
  isLoadingCancel: false,
  isLoadingConfirm: false,
  isLoadingDelivered: false,
  isLoadingShipOrder: false,
  isError: false,
  isUpcomingDeliveriesOnly: false,
  statusFilters: [],
  sellerStats: null,
  currentStatsPeriod: PERIODS.today,
};

export class DashboardReducer extends ImmerReducer<DashboardState> {
  selectDateFrom(date: moment.Moment | null) {
    this.draftState.date.dateFrom = date;
  }

  selectDateTill(date: moment.Moment | null) {
    this.draftState.date.dateTill = date;
  }

  selectOrders(orders: OrdersState[]) {
    this.draftState.orders = orders.sort(
      (a: any, b: any) => b.order.created_at - a.order.created_at,
    );
  }

  selectOrder(order: OrderState) {
    this.draftState.order = order;
  }

  setUpcomingDeliveriesOnly(value: boolean) {
    this.draftState.isUpcomingDeliveriesOnly = value;
  }

  setStatusFilters(statuses: Status[]) {
    this.draftState.statusFilters = statuses;
  }

  setDeliveries(deliveries: Deliveries[]) {
    this.draftState.deliveries = deliveries;
  }

  setFilterOrders(orders: OrdersState[]) {
    this.draftState.filteredOrders = orders.sort(
      (a: any, b: any) => b.order.created_at - a.order.created_at,
    );
  }

  setIsLoading(value: boolean) {
    this.draftState.isLoading = value;
  }

  setIsLoadingSelectDate(value: boolean) {
    this.draftState.isLoadingSelectDate = value;
  }

  setIsLoadingCancel(value: boolean) {
    this.draftState.isLoadingCancel = value;
  }

  setIsLoadingConfirm(value: boolean) {
    this.draftState.isLoadingConfirm = value;
  }

  setIsLoadingDelivered(value: boolean) {
    this.draftState.isLoadingDelivered = value;
  }

  setIsLoadingShipOrder(value: boolean) {
    this.draftState.isLoadingShipOrder = value;
  }

  setIsLoadingStats(value: boolean) {
    this.draftState.isLoadingStats = value;
  }

  setIsError(value: boolean) {
    this.draftState.isError = value;
  }

  setStatus(status: string) {
    this.draftState.order!.order.status = status;
  }

  filterOrders(dateFrom: number | moment.Moment, dateTill: number | moment.Moment) {
    this.draftState.filteredOrders = this.draftState.orders!.filter(
      (order) => order.delivery_date >= dateFrom && order.delivery_date <= dateTill,
    );
  }

  changeIsCustomDate(value: Select) {
    this.draftState.date.isCustom = value;
  }

  cleanOrder() {
    this.draftState.order = null;
  }

  cleanFilteredOrder() {
    this.draftState.filteredOrders = null;
  }

  setSellerStats(sellerStats: SellerStats) {
    this.draftState.sellerStats = sellerStats;
  }

  setCurrentStatsPeriod(period: PERIODS) {
    this.draftState.currentStatsPeriod = period;
  }

  setQuotes(quotes: QuoteState[]) {
    this.draftState.quotes = quotes;
  }

  setQuote(quote: QuoteState) {
    this.draftState.quote = quote;
  }

  clearQuotes() {
    this.draftState.quote = null;
    this.draftState.quotes = null;
  }

  cleanDeliveries() {
    this.draftState.deliveries = null;
  }

  cleanOrders() {
    this.draftState.orders = null;
  }
}

export default createReducerFunction(DashboardReducer, initialState);
