// eslint-disable-next-line consistent-return
export const dayTime = (value: string, colon = false) => {
  const hours = +value;
  if (hours === 0) {
    return '12 AM';
  }
  if (colon) {
    return hours <= 12 ? `${hours}:00 AM` : `${hours - 12}:00 PM`;
  }
  return hours <= 12 ? `${hours} AM` : `${hours - 12} PM`;
};

export default (value1: number, value2: number, colon = false, ln: any): string => {
  if (value1 === 0 && value2 === 24) return ln;

  if (value1 === 0 && value2 < 24) {
    return colon ? `12:00 AM - ${dayTime(`${value2}`, colon)}` : `12 AM' - ${dayTime(`${value2}`, colon)}`;
  }
  if (value1 > 0 && value2 === 24) {
    return colon ? `${dayTime(`${value1}`, colon)} - 12:00 AM` : `${dayTime(`${value1}`)} - 12 AM`;
  }
  return `${dayTime(`${value1}`, colon)} - ${dayTime(`${value2}`, colon)}`;
};
