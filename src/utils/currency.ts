interface IDic {
  [name: string]: string;
}

export const dic: IDic = {
  USD: '$',
  SGD: 'S$',
  HKD: 'HK$',
  TWD: 'NT$',
  THB: '฿',
  IDR: 'Rp',
  INR: '₹',
};

export const placeholderCurrency: IDic = {
  USD: '$ 16',
  SGD: 'S$ 16',
  HKD: 'HK$ 16',
  TWD: 'NT$ 16',
  THB: '฿ 160',
  IDR: 'Rp 20.000',
  INR: '₹ 16',
};

export const displayCurrency = (currency_iso: string) => {
  const displayValue = dic[currency_iso] || currency_iso;
  return displayValue || '$';
};
