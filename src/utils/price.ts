/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import { FullItem } from '@/store/reducers/items';

export const delivery = (
  min_order_value: number,
  standart_charge: number,
  items: FullItem[],
  free: string,
  isCustomPrice: boolean,
) => {
  if (standart_charge === null || standart_charge === 0) {
    return free;
  }
  if (min_order_value === null) {
    return +standart_charge;
  }
  if (min_order_value <= allPrice(items, isCustomPrice)) {
    return free;
  }
  return +standart_charge;
};

export const tax = (
  tax_amount: number,
  items: FullItem[],
  isCustomPrice: boolean,
): number => {
  if (tax_amount <= 0) {
    return 0;
  }

  const taxAmount = (tax_amount / 100) * allPrice(items, isCustomPrice);
  return Number(taxAmount.toFixed(2));
};

export const allPrice = (items: FullItem[], isCustomPrice: boolean): number => {
  if (isCustomPrice) {
    return items.reduce((acc: number, item: FullItem) => acc += (item.custom_price ? item.custom_price : 0) * item.count, 0);
  }
  return items.reduce((acc: number, item: FullItem) => acc += (item.price ? item.price : 0) * item.count, 0);
};

export const total = (delivery: () => number | string, tax: () => number, allPrice: () => number): number => {
  if (typeof delivery() !== 'string') {
    return allPrice() + +delivery() + +tax();
  }
  return allPrice() + +tax();
};
