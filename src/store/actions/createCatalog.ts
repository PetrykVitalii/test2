/* eslint-disable no-console */
import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';
import { CreateCategoryReducer, SendCatalogBody } from '@/store/reducers/createCatalog';
import { AsyncAction } from './common';

export const createCatalogActions = createActionCreators(CreateCategoryReducer);

export type CrateCatalogActions =
  | ReturnType<typeof createCatalogActions.setIsLoading>
  | ReturnType<typeof createCatalogActions.setName>
  | ReturnType<typeof createCatalogActions.setCategory>
  | ReturnType<typeof createCatalogActions.setDescription>
  | ReturnType<typeof createCatalogActions.setOperatingHours>
  | ReturnType<typeof createCatalogActions.changeStandartCharge>
  | ReturnType<typeof createCatalogActions.changeMinimumOrderValue>
  | ReturnType<typeof createCatalogActions.changeTaxAmount>
  | ReturnType<typeof createCatalogActions.enableDeliveryDay>
  | ReturnType<typeof createCatalogActions.disableDeliveryDay>
  | ReturnType<typeof createCatalogActions.addItemToNextStep>
  | ReturnType<typeof createCatalogActions.addItemsToNextStep>
  | ReturnType<typeof createCatalogActions.deleteItemToNextStep>
  | ReturnType<typeof createCatalogActions.cleanCatalog>
  | ReturnType<typeof createCatalogActions.setIsCustomPricingEnabled>;

export const sendCatalog = (): AsyncAction => async (dispatch, getStore, { mainProtectedApi }) => {
  try {
    dispatch(createCatalogActions.setIsLoading(true));
    const catalog = getStore().createCatalogReducer.newCatalog;

    const newOperatingHours = { ...catalog.operating_hours };
    newOperatingHours.time_to = newOperatingHours.time_to.replace('24:00:00', '00:00:00');

    const sendCatalogObj: SendCatalogBody = {
      ...catalog,
      items: catalog.items.map((item) => ({ item_id: item.id, custom_price: item.custom_price })),
      category_id: catalog.category_id.id,
      delivery_days: catalog.is_delivery_date_choosable
        ? catalog.delivery_days.slice().sort((a: number, b: number) => a - b)
        : [],
      operating_hours: newOperatingHours,
    };

    const {
      seller_catalog: { id },
    } = await mainProtectedApi.sendCatalog(sendCatalogObj);

    dispatch(createCatalogActions.setIsLoading(false));
    dispatch(push(`/catalogs/${id}`, { showSuccessPopup: true }));
    dispatch(createCatalogActions.cleanCatalog());

    window.dataLayer.push({
      event: 'agoraNewCatalogSubmit',
      formName: 'Agora New Catalog Submit',
    });
  } catch (e) {
    console.error(e);
    dispatch(createCatalogActions.setIsLoading(false));
  }
};

export const addItemToNextStepAction = (id: number): AsyncAction => async (
  dispatch,
  getStore,
) => {
  dispatch(createCatalogActions.setIsLoading(true));
  const items = getStore().itemsReducer.userItems;

  const addItem = items.find((item) => item.id === id);

  if (addItem) {
    dispatch(createCatalogActions.addItemToNextStep(addItem));
  }
  dispatch(createCatalogActions.setIsLoading(false));
};
