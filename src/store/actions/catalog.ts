/* eslint-disable no-console */
import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';
import { CatalogReducer } from '@/store/reducers/catalog';
import { AsyncAction } from './common';
import { CreateCatalogItem } from '../reducers/createCatalog';

export const catalogsActions = createActionCreators(CatalogReducer);

export type CatalogActions =
  | ReturnType<typeof catalogsActions.setIsLoading>
  | ReturnType<typeof catalogsActions.setCatalog>
  | ReturnType<typeof catalogsActions.setCatalogItems>
  | ReturnType<typeof catalogsActions.changePriceItem>
  | ReturnType<typeof catalogsActions.setCategory>
  | ReturnType<typeof catalogsActions.addItem>
  | ReturnType<typeof catalogsActions.deleteItem>
  | ReturnType<typeof catalogsActions.chengeCustomPricing>
  | ReturnType<typeof catalogsActions.chengeIsPublic>
  | ReturnType<typeof catalogsActions.clearCatalog>
  | ReturnType<typeof catalogsActions.setIsComming>
  | ReturnType<typeof catalogsActions.setIsDefaultLoading>
  | ReturnType<typeof catalogsActions.addCatalogItems>
  | ReturnType<typeof catalogsActions.changeIsDeliveryDateChoosable>
  | ReturnType<typeof catalogsActions.setSelectedTab>;

export const getCatalog = (id: number): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(catalogsActions.setIsLoading(true));
    dispatch(catalogsActions.setIsComming(false));

    const { languageReducer } = getState();
    const { ln } = languageReducer;
    const lnQuery = ln.toLowerCase().trim();

    const { seller_catalog: sellerCatalog } = await mainProtectedApi.getCatalog(id);

    sellerCatalog.delivery_time_to = sellerCatalog.delivery_time_to.replace('00:00:00', '24:00:00');
    sellerCatalog.short_link = `${sellerCatalog.short_link}?lang=${lnQuery}`;

    dispatch(catalogsActions.setCatalog(sellerCatalog));

    dispatch(catalogsActions.setIsLoading(false));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(catalogsActions.setIsComming(true));
    dispatch(catalogsActions.setIsLoading(false));
  }
};

export const getCatalogItems = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(catalogsActions.setIsLoading(true));
    dispatch(catalogsActions.setIsComming(false));

    const { seller_items: sellerItems } = await mainProtectedApi.getCatalogItems(id);

    dispatch(catalogsActions.setCatalogItems(sellerItems));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(catalogsActions.setIsLoading(false));
    dispatch(catalogsActions.setIsComming(true));
  }
};

export const deleteCatalog = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(catalogsActions.setIsLoading(true));

    await mainProtectedApi.deleteCatalog(id);

    dispatch(push('/catalogs'));

    dispatch(catalogsActions.setIsLoading(false));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(catalogsActions.setIsLoading(false));
  }
};

export const editCatalogDetail = (id: number): AsyncAction => async (
  dispatch,
  getStore,
  { mainProtectedApi },
) => {
  try {
    dispatch(catalogsActions.setIsLoading(true));
    /* eslint-disable @typescript-eslint/naming-convention */
    const { catalog } = getStore().catalogReducer;

    const {
      delivery_time_from,
      delivery_time_to,
      description,
      delivery_days,
      standart_charge,
      min_order_value,
      tax_amount,
      name,
      category,
      is_delivery_date_choosable,
    } = catalog!;

    const body = {
      name,
      operating_hours: {
        time_from: delivery_time_from,
        time_to: delivery_time_to.replace('24:00:00', '00:00:00'),
      },
      description,
      delivery_days: is_delivery_date_choosable
        ? delivery_days.slice().sort((a: number, b: number) => a - b)
        : [],
      standart_charge,
      minimum_order_value: min_order_value,
      tax_amount,
      category_id: category.id,
      is_delivery_date_choosable,
    };

    await mainProtectedApi.editCatalogDetail(id, body);

    dispatch(catalogsActions.setIsLoading(false));
    dispatch(push(`/catalogs/${id}`));

    window.dataLayer.push({
      event: 'agoraCatalogBusinessDetailsSubmit',
      formName: 'Agora Catalog Business Details Submit',
    });
  } catch (e) {
    console.error(e);
    dispatch(catalogsActions.setIsLoading(false));
  }
};

export const editCatalogDetailItems = (id: number): AsyncAction => async (
  dispatch,
  getStore,
  { mainProtectedApi },
) => {
  try {
    dispatch(catalogsActions.setIsLoading(true));
    const { items, catalog } = getStore().catalogReducer;
    const { is_custom_pricing_enabled } = catalog!;

    const catalogItems: CreateCatalogItem[] = items.map(
      (item) => ({ item_id: item.id, custom_price: item.custom_price }),
    );

    const body = {
      catalog_items: catalogItems,
      is_custom_pricing_enabled,
    };

    await mainProtectedApi.editCatalogDetailItems(id, body);

    dispatch(catalogsActions.setIsLoading(false));
    dispatch(push(`/catalogs/${id}`));
  } catch (e) {
    console.error(e);
    dispatch(catalogsActions.setIsLoading(false));
  }
};

export const sendIsPublicCatalog = (id: number): AsyncAction => async (
  dispatch,
  getStore,
  { mainProtectedApi },
) => {
  try {
    const { catalog } = getStore().catalogReducer;
    const { is_public } = catalog!;
    const body = {
      is_public,
    };

    await mainProtectedApi.editCatalogIsPublic(id, body);
  } catch (e) {
    console.error(e);
  }
};

export const findDefaultCatalog = (): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const { userReducer: { defaultCatalogId } } = getState();
    dispatch(catalogsActions.setIsComming(false));
    const { seller_catalog } = await mainProtectedApi.getCatalog(defaultCatalogId);
    seller_catalog!.delivery_time_to = seller_catalog!.delivery_time_to.replace('00:00:00', '24:00:00');
    dispatch(catalogsActions.setCatalog(seller_catalog));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(catalogsActions.setIsComming(true));
  }
};

export const editDefaultCatalog = (id: number): AsyncAction => async (
  dispatch,
  getStore,
  { mainProtectedApi },
) => {
  try {
    dispatch(catalogsActions.setIsDefaultLoading(true));
    /* eslint-disable @typescript-eslint/naming-convention */
    const { catalog } = getStore().catalogReducer;

    const {
      delivery_time_from,
      delivery_time_to,
      description,
      delivery_days,
      standart_charge,
      min_order_value,
      tax_amount,
      name,
      category,
      is_delivery_date_choosable,
    } = catalog!;

    const body = {
      name,
      operating_hours: {
        time_from: delivery_time_from,
        time_to: delivery_time_to.replace('24:00:00', '00:00:00'),
      },
      description,
      delivery_days: is_delivery_date_choosable
        ? delivery_days.slice().sort((a: number, b: number) => a - b)
        : [],
      standart_charge,
      minimum_order_value: min_order_value,
      tax_amount,
      category_id: category.id,
      is_delivery_date_choosable,
    };

    window.dataLayer.push({
      event: 'agoraNewCatalogSubmit',
      formName: 'Agora New Catalog Submit',
    });

    dispatch(push('/setup/step4'));
    await mainProtectedApi.editCatalogDetail(id, body);
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(catalogsActions.setIsDefaultLoading(false));
  }
};
