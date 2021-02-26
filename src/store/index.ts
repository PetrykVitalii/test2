import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { LoginActions } from './actions/login';
import loginReducer from './reducers/login';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  loginReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunk,
  ),
);

export type State = ReturnType<typeof rootReducer>;
export type Actions = LoginActions;

export default createStore(rootReducer, enhancer);
