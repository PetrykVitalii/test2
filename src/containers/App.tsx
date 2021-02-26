import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import store, { history } from '@/store';

import { authRestore } from '@/store/actions/auth-restore';
import { detectLanguage } from '@/store/actions/language';
import { trackUtm } from '@/store/actions/utm-tracking';
import { trackPwaAsync } from '@/store/actions/pwa';

import LocalStorage from '@/utils/local-storage';
// import Authorization from '@/containers/Authorization';
// import Catalogs from '@/containers/Catalogs';
// import AddItemsPage from '@/containers/AddItemsPage';
// import AdvancedDetails from '@/containers/AdvancedDetails';
// import Items from '@/containers/Items';
// import ItemDetails from '@/containers/ItemDetails';
// import Signup from '@/containers/Signup';
// import Welcome from '@/containers/Welcome';
// import Dashboard from '@/containers/Dashboard';
// import Deliveries from '@/containers/Deliveries';
// // import PendingOrders from '@/containers/PendingOrders';
// // import PendingOrder from '@/containers/PendingOrder';
// // import QuoteRequests from '@/containers/QuoteRequests';
// import OrdersDate from '@/containers/OrdersDate';
// import Orders from '@/containers/Orders';
// import Order from '@/containers/Order';
// // import Quote from '@/containers/Quote';
// import AddItemsToCatalogs from '@/containers/AddItemsToCatalogs';

// import CatalogItemEdit from '@/components/catalogs/catalog-edit/CatalogsItemsEdit';
// import EditAll from '@/components/catalogs/EditBusinessDetails';
// import CreateCatalog from '@/containers/CreateCatalog';
// import CatalogDetail from '@/components/catalogs/CatalogDetail';
// import CreateCategory from '@/components/catalogs/create-steps/Category';
// import Category from '@/components/catalogs/Category';
// import ItemDetail from '@/components/catalogs/ItemDetail';

// import Settings from '@/containers/Settings';
// import ProfileSettings from '@/containers/ProfileSettings';
// import Notifications from '@/containers/Notifications';
// import LegalInfo from '@/containers/LegalInfo';
// import Help from '@/containers/Help';
// import AddItems from '@/containers/AddItems';
import HistoryState from '@/utils/HistoryState';
import Loader from '@/components/common/Loader';

// const Orders = React.lazy(() => import('@/containers/Orders'));
// const Order = React.lazy(() => import('@/containers/Order'));
// const Catalogs = React.lazy(() => import('@/containers/Catalogs'));
// const AddItemsPage = React.lazy(() => import('@/containers/AddItemsPage'));
// const Settings = React.lazy(() => import('@/containers/Settings'));
// const ProfileSettings = React.lazy(() => import('@/containers/ProfileSettings'));
// const Notifications = React.lazy(() => import('@/containers/Notifications'));
// const LegalInfo = React.lazy(() => import('@/containers/LegalInfo'));
// const Help = React.lazy(() => import('@/containers/Help'));
// const CatalogItemEdit = React.lazy(() => import('@/components/catalogs/catalog-edit/CatalogsItemsEdit'));
// const AddItemsToCatalogs = React.lazy(() => import('@/containers/AddItemsToCatalogs'));
// const EditAll = React.lazy(() => import('@/components/catalogs/EditBusinessDetails'));
// const CreateCatalog = React.lazy(() => import('@/containers/CreateCatalog'));
// const CatalogDetail = React.lazy(() => import('@/components/catalogs/CatalogDetail'));
// const CreateCategory = React.lazy(() => import('@/components/catalogs/create-steps/Category'));
// const Category = React.lazy(() => import('@/components/catalogs/Category'));
// const ItemDetail = React.lazy(() => import('@/components/catalogs/ItemDetail'));
// const AddItems = React.lazy(() => import('@/containers/AddItems'));
// const OrdersDate = React.lazy(() => import('@/containers/OrdersDate'));
// const Authorization = React.lazy(() => import('@/containers/Authorization'));
// const AdvancedDetails = React.lazy(() => import('@/containers/AdvancedDetails'));
// const Items = React.lazy(() => import('@/containers/Items'));
// const ItemDetails = React.lazy(() => import('@/containers/ItemDetails'));
// const Signup = React.lazy(() => import('@/containers/Signup'));
const Welcome = React.lazy(() => import('@/containers/Welcome'));
// const Dashboard = React.lazy(() => import('@/containers/Dashboard'));
// const Deliveries = React.lazy(() => import('@/containers/Deliveries'));

if (Number(process.env.LOG_ERROR_TO_SENTRY)) {
  Sentry.init({
    dsn: 'https://5713e176114d48018bc11a3a500b2654@o494472.ingest.sentry.io/5565601',
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const GlobalStyle = createGlobalStyle`
  ${normalize};
  @font-face {
    font-family: 'HandOfSeanDemo';
    src: local('HandOfSeanDemo'), local('HandOfSeanDemo'),
    url('/assets/fonts/hand-of-sean-demo/HandOfSeanDemo.woff2') format('woff2'),
    url('/assets/fonts/hand-of-sean-demo/HandOfSeanDemo.woff') format('woff');
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Thin-100.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Thin-100.woff') format('woff');
    font-weight: 100;
  }
  
  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Light-300.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Light-300.woff') format('woff');
    font-weight: 300;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Regular-400.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Regular-400.woff') format('woff');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Medium-500.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Medium-500.woff') format('woff');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Semibold-600.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Semibold-600.woff') format('woff');
    font-weight: 600;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Bold-700.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Bold-700.woff') format('woff');
    font-weight: 700;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-ExtraBold-800.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-ExtraBold-800.woff') format('woff');
    font-weight: 800;
  }

  @font-face {
    font-family: 'Thonburi';
    src:
    url('/assets/fonts/thonburi/Thonburi.woff2') format('woff2'),
    url('/assets/fonts/thonburi/Thonburi.woff') format('woff');
  }

  * {
    box-sizing: border-box;
    font-family: 'Manrope3', 'Thonburi', 'Noto Sans SC';
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    line-height: normal;
  }
  
  html,
  body {
    height: 100%;
  }

  body {
    @media screen and (min-width: 552px) {
      padding: 40px 0px;
      background-color: #f0f1f2;
    }
  }

  #root {
    max-width: 552px;
    margin: 0px auto;
    caret-color: #f43939;
    background-color: white;
    position: relative;
    min-height: 100%;
    @media screen and (min-width: 552px) {
      padding-bottom: 40px;
    }
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

  video::-internal-media-controls-overlay-cast-button {
    display: none;
  }
`;

LocalStorage.transit();
store.dispatch<any>(authRestore(true));
store.dispatch<any>(detectLanguage());
store.dispatch<any>(trackUtm());
store.dispatch<any>(trackPwaAsync());

const App: React.FC = () => {
  useEffect(() => {
    const historyState = new HistoryState(history);
    history.listen(historyState.listener);
    history.goBack = historyState.goBack;
  }, []);

  return (
    <Sentry.ErrorBoundary fallback="An error has occurred">
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <GlobalStyle />
            <EmptyTop />
            <Suspense fallback={<Loader scale="0.5" />}>
              <Switch>
                <Route path="/" component={Welcome} exact />
                <Redirect to="/" />
              </Switch>
            </Suspense>
            <EmptyBottom />
          </ConnectedRouter>
        </Provider>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  );
};

const EmptyTop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 40px;
  background-color: #f0f1f2;
  z-index: 900;
  width: 100%;
  @media screen and (max-width: 552px) {
    display: none;
  }
`;

const EmptyBottom = styled(EmptyTop)`
  bottom: 0;
  top: auto;
`;

export default App;
