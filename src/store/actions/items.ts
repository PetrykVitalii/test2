/* eslint-disable import/no-cycle */
import reviewCode from '@/utils/reviewCode';
import { createActionCreators } from 'immer-reducer';
import { ItemsReducer } from '../reducers/items';
import { getCatalog } from './catalog';
import { AsyncAction } from './common';

export const itemsActions = createActionCreators(ItemsReducer);

export type ItemsActions =
  | ReturnType<typeof itemsActions.setCatalogItems>
  | ReturnType<typeof itemsActions.getItem>
  | ReturnType<typeof itemsActions.changeToggleItem>
  | ReturnType<typeof itemsActions.clearItem>
  | ReturnType<typeof itemsActions.clearItemInfo>
  | ReturnType<typeof itemsActions.loading>
  | ReturnType<typeof itemsActions.setIsCustomPrice>
  | ReturnType<typeof itemsActions.loading>;

export const getItemById = (itemId: number, catalogId: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  try {
    dispatch(itemsActions.loading(false));
    const { catalogReducer: { catalog } } = getState();

    if (!catalog.seller_catalog.category.name) {
      await dispatch(getCatalog(catalogId));
    }

    const { item, is_custom_price: isCustomPrice } = await mainApi.getItemById(itemId);

    item.code = reviewCode(item.code);

    dispatch(itemsActions.getItem(item));
    dispatch(itemsActions.setIsCustomPrice(isCustomPrice));
  } finally {
    dispatch(itemsActions.loading(true));
  }
};
