import Catalogs from './language/Catalogs';

export default (name: string, catalogs: Catalogs) => {
  switch (name) {
    case 'Alcoholic Beverages':
      return catalogs.category_alcoholic;
    case 'Animal & Pet Supplies':
      return catalogs.category_animal;
    case 'Health & Beauty':
      return catalogs.category_health;
    case 'General Items':
      return catalogs.category_general;
    case 'Seafood':
      return catalogs.category_seafood;
    case 'Dry Goods':
      return catalogs.category_drygoods;
    case 'Condiments & Sauces':
      return catalogs.category_condiments;
    case 'Bakery & Sweets':
      return catalogs.category_bakery;
    case 'Apparel & Accessories':
      return catalogs.category_apparel;
    case 'Coffee & Tea':
      return catalogs.category_coffee;
    case 'Milk & Dairy':
      return catalogs.category_milk;
    case 'Beverages':
      return catalogs.category_beverages;
    case 'Hardware & Tools':
      return catalogs.category_hardware;
    case 'Fruits & Vegetables':
      return catalogs.category_fruits;
    case 'Packaging & Disposables':
      return catalogs.category_packaging;
    case 'Prepared Food':
      return catalogs.category_food;
    case 'Meat & Poultry':
      return catalogs.category_meat;
    case 'Office & Cleaning':
      return catalogs.category_office;
    case 'Electronics':
      return catalogs.category_electronics;
    case 'Seasonings & Spices':
      return catalogs.category_seasoning;
    default:
      return '';
  }
};
