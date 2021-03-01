/* eslint-disable no-console */
import { createActionCreators } from 'immer-reducer';
import { FullItem, ItemsReducer } from '@/store/reducers/items';
import { goBack } from 'connected-react-router';
import { AsyncAction } from './common';

export const itemsActions = createActionCreators(ItemsReducer);

export type ItemsActions =
  | ReturnType<typeof itemsActions.getItems>
  | ReturnType<typeof itemsActions.setIsComming>
  | ReturnType<typeof itemsActions.getItem>
  | ReturnType<typeof itemsActions.changeToggleItem>
  | ReturnType<typeof itemsActions.loading>
  | ReturnType<typeof itemsActions.smallLoading>
  | ReturnType<typeof itemsActions.saveLoading>
  | ReturnType<typeof itemsActions.changeUrl>
  | ReturnType<typeof itemsActions.changeItem>
  | ReturnType<typeof itemsActions.changeResponse>;

export const getUrl = (file: Blob): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi, sendImage },
) => {
  try {
    dispatch(itemsActions.smallLoading(true));

    const format = file.type.split('/')[1];

    const { image_url: imageUrl } = await mainProtectedApi.getUrl(format);

    if (imageUrl.length > 0) {
      await sendImage.sendImage(imageUrl, file);
    }

    const length = imageUrl.indexOf('?');

    const imageUrlWithoutQuery = imageUrl.slice(0, length);

    dispatch(itemsActions.changeUrl(imageUrlWithoutQuery));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(itemsActions.smallLoading(false));
  }
};

export const getUserItems = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(itemsActions.loading(true));
    const items = await mainProtectedApi.getItems();

    dispatch(itemsActions.getItems(items.seller_items));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(itemsActions.setIsComming(true));
    dispatch(itemsActions.loading(false));
  }
};

export const getUserItem = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(itemsActions.loading(true));
    const items = await mainProtectedApi.getItem(id);

    dispatch(itemsActions.getItem(items.item));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(itemsActions.loading(false));
  }
};

export const changeToggle = (id: number, action: string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    // dispatch(itemsActions.loading(true));
    await mainProtectedApi.changeToggle(id, action);
  } catch (e) {
    console.error(e);
  } finally {
    // dispatch(itemsActions.loading(false));
  }
};

export const editItem = (id: number, body: Pick<FullItem, 'name' | 'price' | 'images' | 'code' | 'is_listed' | 'description' | 'custom_unit_name' | 'unit_id'>): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(itemsActions.saveLoading(true));

    await mainProtectedApi.editItem(id, body);

    window.dataLayer.push({
      event: 'agoraItemOtherDetailsSubmit',
      formName: 'Agora Item Other Details Submit',
    });
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(goBack());
    dispatch(itemsActions.saveLoading(false));
  }
};

export const deleteUserItem = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(itemsActions.loading(true));
    const response = await mainProtectedApi.deleteItem(id);
    dispatch(goBack());
    dispatch(itemsActions.changeResponse(response.status === 'OK'));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(itemsActions.loading(false));
    dispatch(itemsActions.changeResponse(false));
  }
};
