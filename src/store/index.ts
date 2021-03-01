import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import MainApi from '@/api/main';
import MainProtectedApi from '@/api/main-protected';
import CloudflareApi from '@/api/cloudflare';
import SendImage from '@/api/send-image';
import * as Sentry from '@sentry/react';

import { AuthActions } from './actions/auth';
import { AuthRestoreActions } from './actions/auth-restore';
import { ItemsActions } from './actions/items';
import { LanguageActions } from './actions/language';
import { CatalogsActions } from './actions/catalogs';
import { CatalogActions } from './actions/catalog';
import { CategoriesActions } from './actions/categories';
import { CrateCatalogActions } from './actions/createCatalog';
import { EmptyItemsActions } from './actions/emptyItems';
import { UnitsActions } from './actions/units';
import { UserActions } from './actions/user';
import { SettingsActions } from './actions/settings';
import { DashboardActions } from './actions/dashboard';
import { PathRestoreActions } from './actions/path-restore';
import { PwaActions } from './actions/pwa';
import { ItemsToCatalogsActions } from './actions/items-to-catalogs';

import authReducer from './reducers/auth';
import authRestoreReducer from './reducers/auth-restore';
import itemsReducer from './reducers/items';
import languageReducer from './reducers/language';
import catalogsReducer from './reducers/catalogs';
import catalogReducer from './reducers/catalog';
import categoryReducer from './reducers/categories';
import createCatalogReducer from './reducers/createCatalog';
import emptyItemsReducer from './reducers/emptyItems';
import unitsReducer from './reducers/units';
import userReducer from './reducers/user';
import dashboardReducer from './reducers/dashboard';
import settingsReducer from './reducers/settings';
import pathRestoreReducer from './reducers/path-restore';
import itemsToCatalogsReducer from './reducers/items-to-catalogs';
import pwaReducer from './reducers/pwa';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  authReducer,
  itemsReducer,
  authRestoreReducer,
  languageReducer,
  catalogsReducer,
  catalogReducer,
  categoryReducer,
  createCatalogReducer,
  unitsReducer,
  emptyItemsReducer,
  userReducer,
  settingsReducer,
  dashboardReducer,
  pathRestoreReducer,
  itemsToCatalogsReducer,
  pwaReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainApi = new MainApi();
const mainProtectedApi = new MainProtectedApi();
const cloudflareApi = new CloudflareApi();
const sendImage = new SendImage();

const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

export const getApiArguments = () => ({
  mainApi,
  mainProtectedApi,
  cloudflareApi,
  sendImage,
  sentryReduxEnhancer,
});

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunk.withExtraArgument(getApiArguments()),
  ),
);

export type State = ReturnType<typeof rootReducer>;
export type Actions =
  | LanguageActions
  | AuthActions
  | ItemsActions
  | AuthRestoreActions
  | CatalogsActions
  | CatalogActions
  | CategoriesActions
  | CrateCatalogActions
  | UnitsActions
  | EmptyItemsActions
  | UserActions
  | DashboardActions
  | SettingsActions
  | ItemsToCatalogsActions
  | PathRestoreActions
  | PwaActions;

export default createStore(rootReducer, enhancer);
