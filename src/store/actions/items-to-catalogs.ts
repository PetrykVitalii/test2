/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { push } from 'connected-react-router';
import { createActionCreators } from 'immer-reducer';
import { AddCatalog, ItemsToCatalogsReducer } from '../reducers/items-to-catalogs';
import { AsyncAction } from './common';

export const itemsToCatalogsActions = createActionCreators(ItemsToCatalogsReducer);

export type ItemsToCatalogsActions =
  | ReturnType<typeof itemsToCatalogsActions.setCatalogs>
  | ReturnType<typeof itemsToCatalogsActions.setIsComing>
  | ReturnType<typeof itemsToCatalogsActions.setIsLoading>
  | ReturnType<typeof itemsToCatalogsActions.changeToggleCatalog>
  | ReturnType<typeof itemsToCatalogsActions.setItems>;

export const getCatalogs = (): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const { seller_catalogs: catalogStats } = await mainProtectedApi.getCatalogs();

    const filterCatalogs: AddCatalog[] = catalogStats
      .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
      .sort((a, b) => a.is_default < b.is_default ? 1 : -1);

    filterCatalogs.forEach((catalog) => {
      catalog.isAddStatus = false;
    });

    dispatch(itemsToCatalogsActions.setCatalogs(filterCatalogs));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(itemsToCatalogsActions.setIsComing(true));
  }
};

export const addItemsToCatalog = (): AsyncAction => async (
  dispatch,
  getStore,
  { mainProtectedApi },
) => {
  try {
    dispatch(itemsToCatalogsActions.setIsLoading(true));
    const { items, catalogs } = getStore().itemsToCatalogsReducer;

    const arrCatalogsId: number[] = catalogs
      .filter((catalog) => catalog.isAddStatus)
      .map((catalog) => catalog.id);
    const arrItems = items.map((item) => ({ item_id: item.id, custom_price: item.custom_price }));

    if (!arrCatalogsId.length) {
      const defaultCatalog = catalogs.find((catalog) => catalog.is_default);
      dispatch(push(`/catalogs/${defaultCatalog?.id}`));
      return;
    }

    const body = {
      catalog_items: arrItems,
      catalog_ids: arrCatalogsId,
    };

    await mainProtectedApi.addItemsToCatalogs(body);

    if (arrCatalogsId.length === 1) {
      dispatch(push(`/catalogs/${arrCatalogsId[0]}`));
    } else {
      dispatch(push('/catalogs'));
    }

    window.dataLayer.push({
      event: 'agoraAddItemsIntoCatalog',
      formName: 'Agora Add Items into Catalog',
    });
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(itemsToCatalogsActions.setIsLoading(false));
  }
};
