import { Catalog, SellerCatalog } from '@/store/reducers/catalog';
import { FullItem } from '@/store/reducers/items';
import HttpClient from './http-client';
import { UserOrder } from './main-protected';

export interface CatalogItems {
  seller_items: FullItem[];
  is_custom_price: false;
}

export interface CatalogItem {
  item: FullItem;
  is_custom_price: boolean;
}

export interface ValidateOTPBody {
  phone_number: string;
  otp: string;
}

interface ValidateOTPResponse {
  access_token: string;
  refresh_token: string;
}

interface GetCitiesByCountry {
  cities: City[];
}

export interface Quote {
  id: number,
  seller_id: number,
  catalog_id: number,
  buyer_link: string,
  business_name: string,
  full_name: string,
  phone_number: string,
  notes: string,
  status: string,
  created_at: string,
  updated_at: string,
}

interface FullQuote {
  seller_quote: {
    quote: Quote,
    items: FullItem[],
    items_count: number,
  },
  catalog_link: string,
  catalog: SellerCatalog,
}

export interface City {
  id: number;
  name: string;
  name_ascii: string;
  country_id: number;
  country_name: string;
}

export interface Track {
  event_type: string;
  catalog_id: number;
}

export default class MainApi extends HttpClient {
  public constructor() {
    super(process.env.API_URL);
  }

  public sendTrack(body: Track) {
    return this.instance.put<FullQuote>('/track', body);
  }

  public getQuote(id: string) {
    return this.instance.get<FullQuote>(`/buyer/quotes/${id}`);
  }

  public getOrder(id: string) {
    return this.instance.get<UserOrder>(`/buyer/order/${id}`);
  }

  public getCatalog(id: string) {
    return this.instance.get<Catalog>(`/buyer/catalog/${id}`);
  }

  public getCatalogItems(id: string) {
    return this.instance.get<CatalogItems>(`/buyer/catalog/${id}/items`);
  }

  public getItemById(id: number) {
    return this.instance.get<CatalogItem>(`/buyer/items/${id}`);
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
    return this.instance.put<FullItem>('/buyer/items/toggle', body);
  }

  public sendPhone(phone_number: string, ln?: string) {
    const params = { ln: ln?.toLowerCase() };
    return this.instance.post('/buyer/otp', { phone_number }, { params });
  }

  public validateOTP(body: ValidateOTPBody) {
    return this.instance.post<ValidateOTPResponse>('/buyer/otp/validate', body);
  }

  public getCitiesByCountry(countryId: number) {
    return this.instance.get<GetCitiesByCountry>(`countries/${countryId}/cities`);
  }
}
