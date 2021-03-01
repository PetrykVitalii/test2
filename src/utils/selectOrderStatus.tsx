export interface Status {
  key: string;
  name: string;
  classTracking: string;
}

export const STATUS_PENDING_KEY = 'Pending';
export const STATUS_CONFIRMED_KEY = 'Confirmed';
export const STATUS_SHIPPED_KEY = 'Shipped';
export const STATUS_DELIVERED_KEY = 'Delivered';
export const STATUS_CANCELLED_KEY = 'Cancelled';

export const STATUS_PENDING = 'Action Needed';
export const STATUS_CONFIRMED = 'Processed';
export const STATUS_SHIPPED = 'Shipped';
export const STATUS_DELIVERED = 'Delivered';
export const STATUS_CANCELLED = 'Cancelled';

export const STATUS: Status[] = [
  {
    key: STATUS_PENDING_KEY,
    name: STATUS_PENDING,
    classTracking: 'orders select-status action-needed',
  },
  {
    key: STATUS_CONFIRMED_KEY,
    name: STATUS_CONFIRMED,
    classTracking: 'orders select-status processed',
  },
  {
    key: STATUS_SHIPPED_KEY,
    name: STATUS_SHIPPED,
    classTracking: 'orders select-status shipped',
  },
  {
    key: STATUS_DELIVERED_KEY,
    name: STATUS_DELIVERED,
    classTracking: 'orders select-status delivered',
  },
  {
    key: STATUS_CANCELLED_KEY,
    name: STATUS_CANCELLED,
    classTracking: 'orders select-status cancelled',
  },
];
