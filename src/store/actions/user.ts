import { createActionCreators } from 'immer-reducer';

import { UserReducer } from '../reducers/user';

export const userActions = createActionCreators(UserReducer);

export type UserActions =
  | ReturnType<typeof userActions.setUser>
  | ReturnType<typeof userActions.setDeliveries>
  | ReturnType<typeof userActions.setDefaultCatalogId>
  | ReturnType<typeof userActions.setIsLoading>
  | ReturnType<typeof userActions.setIsComing>
  | ReturnType<typeof userActions.setDefaultCatalogId>
  | ReturnType<typeof userActions.setPendingOrders>
  | ReturnType<typeof userActions.setConfirmedOrders>
  | ReturnType<typeof userActions.setPendingQuotes>;
