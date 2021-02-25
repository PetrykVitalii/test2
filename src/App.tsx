/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Suspense } from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Welcome from './Welcome';
// import E from './E';
// import W from './W';
// import Welcome from './Welcome';
// const E = React.lazy(() => import('./E'));
// const W = React.lazy(() => import('./W'));
// const Welcome = React.lazy(() => import('./Welcome'));

interface Props {
}

const App: React.FC<Props> = () => (
  <Welcome />
  // <BrowserRouter>
    
  //   <Switch>
  //       <Route path="/" component={Welcome} exact />
  //       <Route path="/w" component={W} exact />
  //       <Route path="/e" component={E} exact />
  //     </Switch>
  // </BrowserRouter>
);

export default App;
