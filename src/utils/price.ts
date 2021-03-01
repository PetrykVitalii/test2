/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import { Item } from '@/store/reducers/dashboard';

export const delivery = (
  // min_order_value: number | null,
  standart_charge: number | null,
  // items: Item[],
  free: string,
  // isCustomPrice: boolean,
) => {
  if (standart_charge === null || standart_charge === 0) {
    return free;
  }
  // if (min_order_value === null) {
  //   return +standart_charge;
  // }
  // if (min_order_value <= allPrice(items, isCustomPrice)) {
  //   return free;
  // }
  return +standart_charge;
};

export const tax = (
  tax_amount: number,
  items: Item[],
  isCustomPrice: boolean,
): number => {
  if (tax_amount <= 0) {
    return 0;
  }

  const taxAmount = (tax_amount / 100) * allPrice(items, isCustomPrice);
  return Number(taxAmount.toFixed(2));
};

export const allPrice = (items: Item[], isCustomPrice: boolean): number => {
  if (isCustomPrice) {
    return items.reduce((acc: number, item: Item) => acc += (item.item.custom_price ? item.item.custom_price : 0) * item.count, 0);
  }
  return items.reduce((acc: number, item: Item) => acc += (item.item.price ? item.item.price : 0) * item.count, 0);
};

export const total = (delivery: () => number | string, tax: () => number, allPrice: () => number): number => {
  if (typeof delivery() !== 'string') {
    return allPrice() + +delivery() + +tax();
  }
  return allPrice() + +tax();
};
