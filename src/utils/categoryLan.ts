export default (name: string, catalog: any) => {
  switch (name) {
    case 'Alcoholic Beverages':
      return catalog.category_alcoholic;
    case 'Animal & Pet Supplies':
      return catalog.category_animal;
    case 'Health & Beauty':
      return catalog.category_health;
    case 'General Items':
      return catalog.category_general;
    case 'Seafood':
      return catalog.category_seafood;
    case 'Dry Goods':
      return catalog.category_drygoods;
    case 'Condiments & Sauces':
      return catalog.category_condiments;
    case 'Bakery & Sweets':
      return catalog.category_bakery;
    case 'Apparel & Accessories':
      return catalog.category_apparel;
    case 'Coffee & Tea':
      return catalog.category_coffee;
    case 'Milk & Dairy':
      return catalog.category_milk;
    case 'Beverages':
      return catalog.category_beverages;
    case 'Hardware & Tools':
      return catalog.category_hardware;
    case 'Fruits & Vegetables':
      return catalog.category_fruits;
    case 'Packaging & Disposables':
      return catalog.category_packaging;
    case 'Prepared Food':
      return catalog.category_food;
    case 'Meat & Poultry':
      return catalog.category_meat;
    case 'Office & Cleaning':
      return catalog.category_office;
    case 'Electronics':
      return catalog.category_electronics;
    case 'Seasonings & Spices':
      return catalog.category_seasoning;
    default:
      return '';
  }
};
