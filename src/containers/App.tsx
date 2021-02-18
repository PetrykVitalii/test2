import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from '@/store';
import { detectLanguage } from '@/store/actions/language';

import LocalStorage from '@/utils/local-storage';

import Search from '@/components/catalog/Search';
import Quote from '@/containers/Quote';
import Order from '@/containers/Order';
import DeliveryDate from '@/containers/DeliveryDate';
import NoValidLink from '@/components/NoValidLink';
import PersonalOrder from '@/containers/PersonalOrder';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { LocalStorageInfoToUserReducer } from '@/store/actions/user';
import Home from './Home';
import ItemDetails from './ItemDetails';
import Catalog from './Catalog';
import SignUp from './SignUp';
import Verify from './Verify';
import PlaceOrder from './PlaceOrder';
import Review from './Review';
import Fork from './Fork';
import QuoteDone from './QuoteDone';

const GlobalStyle = createGlobalStyle`
  ${normalize};

  @font-face {
    font-family: 'HandOfSeanDemo';
    src: local('HandOfSeanDemo'), local('HandOfSeanDemo'),
    url('/assets/fonts/hand-of-sean-demo/HandOfSeanDemo.woff2') format('woff2'),
    url('/assets/fonts/hand-of-sean-demo/HandOfSeanDemo.woff') format('woff');
  }

  * {
    box-sizing: border-box;
    font-family: 'Manrope';
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    line-height: normal;
  }

  html,
  body {
    height: 100%;
    background-color: #f0f1f2;
  }

  #root {
    max-width: 552px;
    margin: 0px auto;
    caret-color: #f43939;
    background-color: white;
    position: relative;
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  input, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input {
    :disabled {
      background-color: inherit;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

`;

LocalStorage.transit();
store.dispatch<any>(detectLanguage());
store.dispatch<any>(LocalStorageInfoToUserReducer());

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalStyle />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/catalogs/:catalogId" component={Catalog} exact />
          <Route path="/catalogs/:catalogId/search" component={Search} exact />
          <Route path="/catalogs/:catalogId/:itemId" component={ItemDetails} exact />
          <Route path="/orders/:orderId" component={PersonalOrder} exact />
          <Route path="/quotes/:quoteId" component={QuoteDone} exact />
          <ProtectedRoute path="/:catalogId/quote-details" component={Quote} exact />
          <ProtectedRoute path="/:catalogId/fork" component={Fork} exact />
          <ProtectedRoute path="/:catalogId/item-list" component={Order} exact />
          <ProtectedRoute path="/:catalogId/delivery-date" component={DeliveryDate} exact />
          <ProtectedRoute path="/:catalogId/signup" component={SignUp} exact />
          <ProtectedRoute path="/:catalogId/verify" component={Verify} exact />
          <ProtectedRoute path="/:catalogId/review" component={Review} exact />
          <ProtectedRoute path="/:catalogId/delivery-address" component={PlaceOrder} exact />

          <Route component={NoValidLink} />

          <Redirect to="/" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
);

export default App;
