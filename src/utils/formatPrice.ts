const formatPrice = (number: number | string): string => {
  if (typeof number === 'string') return number;
  const formatNumber = Math.round(number * 100) / 100;
  if (formatNumber === Math.floor(formatNumber)) {
    return formatNumber.toLocaleString();
  }
  return formatNumber.toLocaleString(undefined, { minimumFractionDigits: 2 });
};

export default formatPrice;
