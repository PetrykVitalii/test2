export const catalogLn = (name: string, catalog: any) => {
  switch (name) {
    case 'Central District':
      return catalog.name_central_district;
    case 'Business Customers':
      return catalog.name_business_customers;
    case 'Pick-up Only':
      return catalog.name_pick_up_only;
    case 'Group Buys':
      return catalog.name_group_buys;
    case 'Organic Items':
      return catalog.name_organic_items;
    case 'Credit Card Payment':
      return catalog.name_credit_card_payment;
    case 'East Java Customers':
      return catalog.name_east_java;
    case 'Next Day Delivery':
      return catalog.name_next_day_delivery;
    case 'Pre-orders':
      return catalog.name_preorders;
    case 'Wholesale Orders':
      return catalog.name_wholesale_orders;
    default:
      return '';
  }
};
