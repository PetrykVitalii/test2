import { ICatalog } from '@/store/reducers/catalogs';
import { IСategory } from '@/store/reducers/categories';
import { CreateCatalogItem, SendCatalogBody } from '@/store/reducers/createCatalog';
import { FullItem } from '@/store/reducers/items';
import { User } from '@/store/reducers/user';
import {
  PERIODS, QuoteState, SellerStats, SortFilters,
} from '@/store/reducers/dashboard';
import HttpClientProtected from './http-client-protected';

interface GetMeResponse {
  city: string;
  items_count: number;
  language: string;
  pending_orders: number;
  confirmed_orders: number;
  seller: User;
  short_link: string;
  deliveries: number;
  default_catalog_id: number;
  default_catalog: ICatalog;
  pending_quotes: number;
}

interface SendNameBody {
  full_name: string;
  business_name: string;
}

interface SendLocatedBody {
  country_id: number;
  city_id: number | null;
  city: string;
}

interface SendItemsBody {
  seller_items: Array<{
    name: string;
    unit_id: number;
    custom_unit_name?: string;
    description?: string;
    code?: string;
    price?: number | null;
    images?: string;
  }>;
}

export interface SendProfileInfoBody {
  full_name?: string;
  business_name?: string;
  email?: string;
  city_id?: string | null;
  city?: string;
  delete_account?: boolean;
  language?: string;
}

interface UrlImage {
  image_url: string;
}

interface GetCatalogs {
  seller_catalogs: ICatalog[];
}

interface GetCatalog {
  seller_catalog: ICatalog;
}

interface GetCatalogItems {
  seller_items: FullItem[];
}

interface SendItemsToCatalogs {
  catalog_items: CreateCatalogItem[];
  catalog_ids: number[];
}

interface GetItems {
  seller_items: FullItem[];
}

interface Categories {
  categories: IСategory[];
}

interface SendCatalogDetail {
  name: string;
  operating_hours: {
    time_from: string;
    time_to: string;
  };
  description: string | null;
  delivery_days: number[];
  standart_charge: number | null;
  minimum_order_value: number | null;
  tax_amount: number | null;
  category_id: number;
}

interface SendCatalogDetailItems {
  is_custom_pricing_enabled: boolean;
  catalog_items: CreateCatalogItem[];
}

interface SendHideCatalog {
  is_public: boolean;
}

interface SendStatusOrder {
  status: string;
}

export default class MainProtected extends HttpClientProtected {
  public constructor() {
    super(process.env.API_URL);
  }

  public getMe() {
    return this.instance.get<GetMeResponse>('/me');
  }

  public getUrl(format: string) {
    return this.instance.get<UrlImage>(`/upload/link?type=${format}`);
  }

  public sendNames(body: SendNameBody) {
    return this.instance.post('/seller/name-business-name', body);
  }

  public sendLocated(body: SendLocatedBody) {
    return this.instance.post('/seller/country-city', body);
  }

  public sendItems(body: SendItemsBody) {
    return this.instance.post<GetItems>('/seller/items', body);
  }

  public addItemsToCatalogs(body: SendItemsToCatalogs) {
    return this.instance.post('/seller/catalogs/items', body);
  }

  public getItems() {
    return this.instance.get('/seller/items');
  }

  public getItem(id: number) {
    return this.instance.get(`/seller/items/${id}`);
  }

  public editItem(
    id: number,
    body: Pick<
    FullItem,
    | 'name'
    | 'price'
    | 'images'
    | 'code'
    | 'is_listed'
    | 'description'
    | 'custom_unit_name'
    | 'unit_id'
    >,
  ) {
    return this.instance.put(`/seller/items/${id}/edit`, body);
  }

  public deleteItem(id: number) {
    return this.instance.delete(`/seller/items/${id}`);
  }

  public changeToggle(id: number, action: string) {
    const body = {
      seller_items: [
        {
          id,
          action,
        },
      ],
    };
    return this.instance.put<FullItem>('/seller/items/toggle', body);
  }

  public getCatalogs() {
    return this.instance.get<GetCatalogs>('/seller/catalogs');
  }

  public sendCatalog(body: SendCatalogBody) {
    return this.instance.post<GetCatalog>('/seller/catalog', body);
  }

  public getCatalog(id: number) {
    return this.instance.get<GetCatalog>(`/seller/catalogs/${id}`);
  }

  public getCatalogItems(id: number) {
    return this.instance.get<GetCatalogItems>(`/catalog/${id}/items`);
  }

  public getCategories() {
    return this.instance.get<Categories>('/catalog/categories');
  }

  public editCatalogDetail(id: number, body: SendCatalogDetail) {
    return this.instance.patch(`/seller/${id}/catalog/details`, body);
  }

  public editCatalogDetailItems(id: number, body: SendCatalogDetailItems) {
    return this.instance.patch(`/seller/${id}/catalog/details`, body);
  }

  public editCatalogIsPublic(id: number, body: SendHideCatalog) {
    return this.instance.patch(`/seller/${id}/catalog/details`, body);
  }

  public deleteCatalog(id: number) {
    return this.instance.delete(`/sellers/catalogs/${id}`);
  }

  public editProfileInfo(body: SendProfileInfoBody) {
    return this.instance.patch('/seller/profile-info', body);
  }

  public getOrders() {
    return this.instance.get('seller/orders');
  }

  public getPendingOrders() {
    return this.instance.get('seller/orders?status=pending');
  }

  public getFilteredOrders(from: number, to: number, rangeType: SortFilters) {
    return this.instance.get(`seller/orders?fromInMs=${from}&toInMs=${to}&rangeType=${rangeType}`);
  }

  public getOrder(id: number | string) {
    return this.instance.get(`seller/order/${id}`);
  }

  public getOrderDeliveries() {
    return this.instance.get('seller/order-deliveries');
  }

  public editStatus(id: number, body: SendStatusOrder) {
    return this.instance.patch(`/seller/orders/${id}/update-status`, body);
  }

  public getSellerStats(period: PERIODS) {
    return this.instance.get<{ seller_stats: SellerStats }>('/seller/stats', { params: { period } });
  }

  public getQuote(id: string) {
    return this.instance.get<{ seller_quote: QuoteState }>(`/seller/quote/${id}`);
  }

  public getQuotes() {
    return this.instance.get<{ seller_quotes: QuoteState[] }>('/seller/quotes');
  }
}
