import { FullItem } from '@/store/reducers/items';

const sort = (items: FullItem[]) => {
  const sortItems = [...items];
  return sortItems.sort((a, b) => {
    const lowA = a.name.toLowerCase();
    const lowB = b.name.toLowerCase();
    if (lowA < lowB) {
      return -1;
    }
    if (lowA > lowB) {
      return 1;
    }
    return 0;
  });
};

export default sort;
