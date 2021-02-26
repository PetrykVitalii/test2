/* eslint-disable no-console */
import { createActionCreators } from 'immer-reducer';
import { Item } from '@/store/reducers/items';
import { EmptyItemsReducer } from '@/store/reducers/emptyItems';
import { push, goBack } from 'connected-react-router';
import { AsyncAction } from './common';
import { itemsActions } from './items';
import { createCatalogActions } from './createCatalog';
import { itemsToCatalogsActions } from './items-to-catalogs';
import { catalogsActions } from './catalog';

export const emptyItemsActions = createActionCreators(EmptyItemsReducer);

export type EmptyItemsActions =
  | ReturnType<typeof emptyItemsActions.addEmptyItem>
  | ReturnType<typeof emptyItemsActions.changeInfo>
  | ReturnType<typeof emptyItemsActions.deleteItem>
  | ReturnType<typeof emptyItemsActions.clearItems>;

export const sendItems = (path?: string | undefined): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(itemsActions.loading(true));

    const { emptyItemsReducer } = getState();
    const { items } = emptyItemsReducer;

    const formatItems = ({
      name, unit, customUnit, price, description, images, code,
    }: Item) => ({
      name,
      unit_id: unit.id,
      description,
      images,
      code,
      price: price ? +price : null,
      custom_unit_name: customUnit,
    });

    const body = {
      seller_items: items.map(formatItems),
    };

    const { seller_items: itemsUser } = await mainProtectedApi.sendItems(body);
    dispatch(createCatalogActions.addItemsToNextStep(itemsUser));
    dispatch(catalogsActions.addCatalogItems(itemsUser));
    dispatch(itemsToCatalogsActions.setItems(itemsUser));

    if (path) {
      dispatch(push(path));
    } else {
      dispatch(goBack());
    }

    dispatch(emptyItemsActions.clearItems());

    window.dataLayer.push({
      event: 'agoraNewItemsSubmit',
      formName: 'Agora New Items Submit',
      noItems: `${items.length}`,
    });
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(itemsActions.loading(false));
  }
};

export const saveItemsToCatalog = (catalogId : string): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(itemsActions.loading(true));

    const { emptyItemsReducer } = getState();
    const { items } = emptyItemsReducer;

    const formatItems = ({
      name, unit, customUnit, price, description, images, code,
    }: Item) => ({
      name,
      unit_id: unit.id,
      description,
      images,
      code,
      price: price ? +price : null,
      custom_unit_name: customUnit,
    });

    const bodyItems = {
      seller_items: items.map(formatItems),
    };

    const { seller_items: itemsUser } = await mainProtectedApi.sendItems(bodyItems);

    const shortItems = itemsUser.map((item) => ({
      item_id: item.id,
      custom_price: item.custom_price,
    }));

    const body = {
      catalog_items: shortItems,
      catalog_ids: [+catalogId],
    };

    await mainProtectedApi.addItemsToCatalogs(body);

    dispatch(push(`/catalogs/${catalogId}`));

    dispatch(emptyItemsActions.clearItems());

    window.dataLayer.push({
      event: 'agoraNewItemsSubmit',
      formName: 'Agora New Items Submit',
      noItems: `${items.length}`,
    });
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(itemsActions.loading(false));
  }
};
