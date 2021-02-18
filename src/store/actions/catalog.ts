/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createActionCreators } from 'immer-reducer';
import reviewCode from '@/utils/reviewCode';
import sort from '@/utils/sort';
import { CatalogReducer } from '../reducers/catalog';
import { AsyncAction } from './common';
import { sendTrack } from './track';
import { itemsActions } from './items';

export const catalogActions = createActionCreators(CatalogReducer);

export type CatalogActions =
  | ReturnType<typeof catalogActions.setCatalog>
  | ReturnType<typeof catalogActions.setScrollY>
  | ReturnType<typeof catalogActions.setisError>
  | ReturnType<typeof catalogActions.loading>;

export const getCatalog = (id: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  try {
    const { router: { location } } = getState();

    const catalog = await mainApi.getCatalog(id);

    dispatch(catalogActions.setCatalog(catalog));

    const items = await mainApi.getCatalogItems(id);

    items.seller_items.forEach((item) => {
      item.is_status = false;
      item.count = 1;
      item.code = reviewCode(item.code);
    });

    dispatch(
      itemsActions.setCatalogItems(
        sort(items.seller_items.filter((item) => item.is_listed)),
      ),
    );

    if (location.pathname.includes(`/catalogs/${id}`)) {
      dispatch(sendTrack(catalog.seller_catalog.id, 'catalog_view'));
    }

    dispatch(itemsActions.setIsCustomPrice(items.is_custom_price));
  } catch (e) {
    dispatch(catalogActions.setisError(true));
  } finally {
    dispatch(catalogActions.loading(false));
  }
};
