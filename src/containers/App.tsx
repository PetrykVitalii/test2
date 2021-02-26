import React, { Suspense } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Welcome from './Welcome';
import Q from './Q';


const App: React.FC = () => (
  <BrowserRouter>
      <Suspense fallback={'aaaaaaaaaaa'}>
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/" component={Q} exact />
          <Redirect to="/" />
        </Switch>
      </Suspense>
</BrowserRouter>
);

export default App;
