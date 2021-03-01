export interface Select {
  name: string;
  classTracking: string;
}

export const SELECT_ALL_ORDERS = 'All Orders';
export const SELECT_UPCOMING = 'All Upcoming';
export const SELECT_TODAY = 'Today';
export const SELECT_YESTERDAY = 'Yesterday';
export const SELECT_TOMORROW = 'Tomorrow';
export const SELECT_LAST_SEVEN_DAYS = 'Last 7 days';
export const SELECT_LAST_THIRTY_DAYS = 'Last 30 days';
export const SELECT_NEXT_SEVEN_DAYS = 'Next 7 days';
export const SELECT_NEXT_THIRTY_DAYS = 'Next 30 days';
export const SELECT_CUSTOM = 'Custom';

export const SELECT_ORDER_DATE: Select[] = [
  { name: SELECT_ALL_ORDERS, classTracking: 'orders filter select-all-orders' },
  { name: SELECT_TODAY, classTracking: 'orders filter select-today' },
  { name: SELECT_YESTERDAY, classTracking: 'orders filter select-yesterday' },
  { name: SELECT_LAST_SEVEN_DAYS, classTracking: 'orders filter select-last-7-days' },
  { name: SELECT_LAST_THIRTY_DAYS, classTracking: 'orders filter select-last-30-days' },
  { name: SELECT_CUSTOM, classTracking: 'orders filter select-custom' },
];

export const SELECT_DELIVERY_DATE: Select[] = [
  { name: SELECT_UPCOMING, classTracking: 'orders filter select-all-upcoming' },
  { name: SELECT_TODAY, classTracking: 'orders filter select-today' },
  { name: SELECT_TOMORROW, classTracking: 'orders filter select-tomorrow' },
  { name: SELECT_NEXT_SEVEN_DAYS, classTracking: 'orders filter select-next-7-days' },
  { name: SELECT_NEXT_THIRTY_DAYS, classTracking: 'orders filter select-next-30-days' },
  { name: SELECT_CUSTOM, classTracking: 'orders filter select-custom' },
];
