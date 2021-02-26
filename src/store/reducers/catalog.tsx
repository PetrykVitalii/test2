import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { ICatalog } from './catalogs';
import { IСategory } from './categories';
import { FullItem } from './items';

export interface ICatalogState {
  catalog: ICatalog | null;
  isLoading: boolean;
  items: FullItem[];
  isLoaded: boolean;
  isComming: boolean;
  isDefaultLoading: boolean;
  selectedTab: TAB;
}

export enum TAB {
  Items,
  Details
}

const initialState: ICatalogState = {
  catalog: null,
  items: [],
  isLoading: true,
  isLoaded: false,
  isComming: false,
  isDefaultLoading: false,
  selectedTab: TAB.Items,
};

export class CatalogReducer extends ImmerReducer<ICatalogState> {
  setIsLoading(status: boolean) {
    this.draftState.isLoading = status;
  }

  setIsDefaultLoading(status: boolean) {
    this.draftState.isDefaultLoading = status;
  }

  setIsComming(status: boolean) {
    this.draftState.isComming = status;
  }

  setCatalog(catalog: ICatalog | null) {
    this.draftState.catalog = catalog;
    this.draftState.isLoaded = true;
  }

  setCatalogItems(items: FullItem[]) {
    this.draftState.items = items.map(
      (item) => ({
        ...item,
        custom_price: item.custom_price === null ? item.price || 0 : item.custom_price,
      }),
    );
  }

  addCatalogItems(items: FullItem[]) {
    this.draftState.items = [
      ...this.draftState.items, ...items,
    ];
  }

  clearCatalog() {
    this.draftState.catalog = null;
  }

  setCategory(category: IСategory) {
    this.draftState.catalog!.category = category;
  }

  setDeliveryTime(timeFrom: string, timeTo: string) {
    this.draftState.catalog!.delivery_time_from = timeFrom;
    this.draftState.catalog!.delivery_time_to = timeTo;
  }

  setCatalogName(name: string) {
    this.draftState.catalog!.name = name;
  }

  enableDeliveryDay(day: number) {
    this.draftState.catalog!.delivery_days = [...this.draftState.catalog!.delivery_days, day];
  }

  enableDeliveryDays(days: number[]) {
    this.draftState.catalog!.delivery_days = [...this.draftState.catalog!.delivery_days].concat(
      days,
    );
  }

  disableDeliveryDay(day: number) {
    this.draftState.catalog!.delivery_days = this.draftState.catalog!.delivery_days.filter(
      (days) => days !== day,
    );
  }

  addItem(item: FullItem) {
    this.draftState.items = [
      ...this.draftState.items,
      { ...item, custom_price: item.custom_price ? item.custom_price : null },
    ];
  }

  deleteItem(id: number) {
    this.draftState.items = this.draftState.items.filter(
      (item) => (item.id !== id),
    );
  }

  changeStandartCharge(value: number | null) {
    this.draftState.catalog!.standart_charge = value;
  }

  changeMinOrderValue(value: number | null) {
    this.draftState.catalog!.min_order_value = value;
  }

  changeTaxAmount(value: number | null) {
    this.draftState.catalog!.tax_amount = value;
  }

  changeDescription(value: string) {
    this.draftState.catalog!.description = value;
  }

  changeIsDeliveryDateChoosable(value: boolean) {
    this.draftState.catalog!.is_delivery_date_choosable = value;
  }

  changePriceItem(id: number, price: number) {
    this.draftState.items.forEach((item: FullItem) => {
      // eslint-disable-next-line no-param-reassign
      if (item.id === id) item.custom_price = price;
    });
  }

  chengeCustomPricing(value: boolean) {
    this.draftState.catalog!.is_custom_pricing_enabled = value;
  }

  chengeIsPublic(value: boolean) {
    this.draftState.catalog!.is_public = value;
  }

  setSelectedTab(tab: TAB) {
    this.draftState.selectedTab = tab;
  }
}

export default createReducerFunction(CatalogReducer, initialState);
