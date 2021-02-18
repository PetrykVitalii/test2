/* eslint-disable import/prefer-default-export */
interface Dic {
  [name: string] : string;
}

const dic: Dic = {
  USD: '$',
  SGD: 'S$',
  HKD: 'HK$',
  TWD: 'NT$',
  THB: '฿',
  IDR: 'Rp',
  INR: '₹',
};

export const checkCurrency = (currency_iso: string) => {
  const displayCurrency = dic[currency_iso] || currency_iso;
  return displayCurrency || '$';
};
