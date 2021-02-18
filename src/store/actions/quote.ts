/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { push } from 'connected-react-router';
import { createActionCreators } from 'immer-reducer';

import LocalStorage from '@/utils/local-storage';
import reviewCode from '@/utils/reviewCode';
import { QuoteReducer } from '../reducers/quote';
import { AsyncAction } from './common';
import { itemsActions } from './items';
import { userActions } from './user';

export const quoteActions = createActionCreators(QuoteReducer);

export type QuoteActions =
  | ReturnType<typeof quoteActions.setIsComing>
  | ReturnType<typeof quoteActions.setItems>
  | ReturnType<typeof quoteActions.setItemsCount>
  | ReturnType<typeof quoteActions.setCatalogLink>
  | ReturnType<typeof quoteActions.setQuote>
  | ReturnType<typeof quoteActions.setCatalog>
  | ReturnType<typeof quoteActions.setIsLoading>;

export const sendQuote = (id: string): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(quoteActions.setIsLoading(true));
    const { userReducer: { user, order, userItems } } = getState();

    const arrItemsId: number[] = userItems.reduce((acc: number[], item) => {
      acc.push(item.id);
      return acc;
    }, []);

    const body = {
      full_name: user.fullName,
      phone_number: user.phoneNumber,
      ...(user.businessName ? { business_name: user.businessName } : {}),
      ...(order.notesQuote ? { notes: order.notesQuote } : {}),
      item_ids: arrItemsId,
    };
    const { encoded_quote_id: quoteId } = await mainProtectedApi.sendQuote(body, id);

    dispatch(push(`/quotes/${quoteId}`));
    dispatch(userActions.setUserItems([]));
    dispatch(userActions.setNotesQuote(''));
    dispatch(itemsActions.clearItemInfo());
    LocalStorage.setUserItems(null);
    LocalStorage.setNotesQuote('');
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(quoteActions.setIsLoading(false));
  }
};

export const getQuote = (id: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  try {
    const {
      seller_quote: {
        items, items_count: itemsCount, quote,
      },
      catalog_link: catalogLink,
      catalog,
    } = await mainApi.getQuote(id);

    items.forEach((item) => {
      item.code = reviewCode(item.code);
    });

    dispatch(quoteActions.setCatalog(catalog));
    dispatch(quoteActions.setItems(items));
    dispatch(quoteActions.setCatalogLink(catalogLink));
    dispatch(quoteActions.setItemsCount(itemsCount));
    dispatch(quoteActions.setQuote(quote));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(quoteActions.setIsComing(true));
  }
};
