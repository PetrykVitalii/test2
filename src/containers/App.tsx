import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { normalize } from 'styled-normalize';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from '@/store';

const Home = lazy(() => import('@/components/Home'));
const About = lazy(() => import('@/components/About'));
const Navigation = lazy(() => import('@/components/Navigation'));

const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
  }

`;

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalStyle />
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
          <Navigation />
        </Suspense>
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
);

export default App;
