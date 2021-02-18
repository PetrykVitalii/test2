import { checkCurrency } from './currency';
import formatPrice from './formatPrice';

/* eslint-disable import/prefer-default-export */
export const calculateItemPrice = (
  isCustomPrice : boolean,
  custom_price: number,
  price: number,
  strPrice: string,
  currency_iso: string,
  count: number = 1,
) => {
  if (isCustomPrice) {
    if (custom_price) {
      return `${checkCurrency(currency_iso)}${formatPrice((+custom_price * count))}`;
    }
    return `${strPrice}`;
  }
  if (price) {
    return `${checkCurrency(currency_iso)}${formatPrice((+price * count))}`;
  }
  return `${strPrice}`;
};
