import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { FullItem } from '@/store/reducers/items';
import { IСategory } from '@/store/reducers/categories';

export interface SendCatalogBody {
  items: CreateCatalogItem[];
  name: string;
  category_id: number;
  description: string;
  delivery_days: number[];
  operating_hours: IOperatingHours;
  standart_charge: number | null;
  minimum_order_value: number | null;
  tax_amount: number | null;
  is_custom_pricing_enabled: boolean;
  is_delivery_date_choosable: boolean;
}

export interface CreateCatalogItem {
  item_id: number;
  custom_price: number | null;
}

export interface IOperatingHours {
  time_from: string;
  time_to: string;
}

export interface INewCatalog {
  items: FullItem[];
  name: string;
  category_id: IСategory;
  description: string;
  delivery_days: number[];
  operating_hours: IOperatingHours;
  standart_charge: number | null;
  minimum_order_value: number | null;
  tax_amount: number | null;
  is_custom_pricing_enabled: boolean;
  is_delivery_date_choosable: boolean;
}

export interface IСatalogState {
  newCatalog: INewCatalog;
  step: STEPS;
  isLoading: boolean;
  isError: boolean;
}

export enum STEPS {
  ADD_ITEMS,
  SET_PRICES,
  ADD_DETAILS_1,
  ADD_DETAILS_2
}

export const steps = [
  STEPS.ADD_ITEMS,
  STEPS.SET_PRICES,
  STEPS.ADD_DETAILS_1,
  STEPS.ADD_DETAILS_2,
];

const initialState: IСatalogState = {
  newCatalog: {
    items: [],
    name: '',
    category_id: {
      id: 0,
      name: '',
      image_url: '',
      thumbnail_url: '',
    },
    description: '',
    delivery_days: [],
    operating_hours: {
      time_from: '00:00:00',
      time_to: '24:00:00',
    },
    standart_charge: null,
    minimum_order_value: null,
    tax_amount: null,
    is_custom_pricing_enabled: false,
    is_delivery_date_choosable: false,
  },
  step: STEPS.ADD_ITEMS,
  isLoading: false,
  isError: false,
};

export class CreateCategoryReducer extends ImmerReducer<IСatalogState> {
  nextStep() {
    const stepLength = steps.length;
    const currentStepIndex = steps.findIndex((step) => step === this.draftState.step);
    const increasedIndex = currentStepIndex + 1;
    const newIndex = increasedIndex % stepLength;
    this.draftState.step = steps[newIndex];

    this.draftState.isLoading = false;
    this.draftState.isError = false;
  }

  setIsLoading(status: boolean) {
    this.draftState.isLoading = status;
  }

  setName(name: string) {
    this.draftState.newCatalog.name = name;
  }

  setCategory(category: IСategory) {
    this.draftState.newCatalog.category_id = category;
  }

  setDescription(description: string) {
    this.draftState.newCatalog.description = description;
  }

  setOperatingHours(operatingHours: IOperatingHours) {
    this.draftState.newCatalog.operating_hours = operatingHours;
  }

  setIsDeliveryDateChoosable(value: boolean) {
    this.draftState.newCatalog.is_delivery_date_choosable = value;
  }

  changeStandartCharge(standartCharge: number) {
    this.draftState.newCatalog.standart_charge = standartCharge;
  }

  changeMinimumOrderValue(minimumOrderValue: number) {
    this.draftState.newCatalog.minimum_order_value = minimumOrderValue;
  }

  changeTaxAmount(tax_amount: number) {
    this.draftState.newCatalog.tax_amount = tax_amount;
  }

  changeIsDeliveryDateChoosable() {
    this.draftState.newCatalog.is_delivery_date_choosable = !this.draftState
      .newCatalog.is_delivery_date_choosable;
  }

  enableDeliveryDay(day: number) {
    this.draftState.newCatalog.delivery_days = [...this.draftState.newCatalog.delivery_days, day];
  }

  enableDeliveryDays(days: number[]) {
    this.draftState.newCatalog.delivery_days = [...this.draftState.newCatalog.delivery_days].concat(
      days,
    );
  }

  disableDeliveryDay(day: number) {
    this.draftState.newCatalog.delivery_days = this.draftState.newCatalog.delivery_days.filter(
      (days) => days !== day,
    );
  }

  changePriceItem(id: number, price: number) {
    this.draftState.newCatalog.items.forEach((item: FullItem) => {
      // eslint-disable-next-line no-param-reassign
      if (item.id === id) item.custom_price = price;
    });
  }

  addItemToNextStep(item: FullItem) {
    this.draftState.newCatalog.items = [
      ...this.draftState.newCatalog.items,
      {
        ...item,
        custom_price: item.custom_price === null ? item.price : item.custom_price,
      },
    ];
  }

  addItemsToNextStep(items: FullItem[]) {
    this.draftState.newCatalog.items = [
      ...this.draftState.newCatalog.items, ...items,
    ];
  }

  deleteItemToNextStep(id: number) {
    this.draftState.newCatalog.items = this.draftState.newCatalog.items.filter(
      (item) => (item.id !== id),
    );
  }

  setIsCustomPricingEnabled(value: boolean) {
    this.draftState.newCatalog.is_custom_pricing_enabled = value;
  }

  cleanCatalog() {
    this.draftState.newCatalog.items = [];
    this.draftState.newCatalog.delivery_days = [];
    this.draftState.newCatalog.name = '';
    this.draftState.newCatalog.description = '';
    this.draftState.newCatalog.standart_charge = null;
    this.draftState.newCatalog.minimum_order_value = null;
    this.draftState.newCatalog.tax_amount = null;
    this.draftState.newCatalog.category_id = {
      id: 0,
      name: '',
      image_url: '',
      thumbnail_url: '',
    };
    this.draftState.newCatalog.operating_hours = {
      time_from: '00:00:00',
      time_to: '24:00:00',
    };
    this.draftState.newCatalog.is_delivery_date_choosable = false;
    this.draftState.newCatalog.is_custom_pricing_enabled = false;
  }
}

export default createReducerFunction(CreateCategoryReducer, initialState);
