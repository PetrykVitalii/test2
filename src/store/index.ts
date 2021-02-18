import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import MainApi from '@/api/main';
import MainProtected from '@/api/main-protected';
import MainSecret from '@/api/main-secret';

import { LoginActions } from './actions/login';
import { CatalogActions } from './actions/catalog';
import { ItemsActions } from './actions/items';
import { UserActions } from './actions/user';
import { CountryActions } from './actions/country';
import { LanguageActions } from './actions/language';
import { AuthActions } from './actions/auth';
import { OrderActions } from './actions/order';
import { QuoteActions } from './actions/quote';

import loginReducer from './reducers/login';
import catalogReducer from './reducers/catalog';
import itemsReducer from './reducers/items';
import userReducer from './reducers/user';
import countryReducer from './reducers/country';
import authReducer from './reducers/auth';
import languageReducer from './reducers/language';
import orderReducer from './reducers/order';
import quoteReducer from './reducers/quote';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  loginReducer,
  catalogReducer,
  languageReducer,
  itemsReducer,
  userReducer,
  countryReducer,
  authReducer,
  orderReducer,
  quoteReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainApi = new MainApi();
const mainSecret = new MainSecret();
const mainProtectedApi = new MainProtected();

export const getApiArguments = () => ({
  mainApi,
  mainProtectedApi,
  mainSecret,
});

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunk.withExtraArgument(getApiArguments()),
  ),
);

export type State = ReturnType<typeof rootReducer>;
export type Actions =
  | LoginActions
  | CatalogActions
  | LanguageActions
  | CountryActions
  | ItemsActions
  | AuthActions
  | OrderActions
  | QuoteActions
  | UserActions;

export default createStore(rootReducer, enhancer);
