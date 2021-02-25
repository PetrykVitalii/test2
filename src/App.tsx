/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import styled from 'styled-components';
// import E from './E';
// import W from './W';
// import Welcome from './Welcome';
// const E = React.lazy(() => import('./E'));
// const W = React.lazy(() => import('./W'));
// const Welcome = React.lazy(() => import('./Welcome'));

interface Props {
}

const App: React.FC<Props> = () => (
  <Div>
    Wwwwwwwwwwwwwwww
  </Div>
  // <BrowserRouter>

  //   <Switch>
  //       <Route path="/" component={Welcome} exact />
  //       <Route path="/w" component={W} exact />
  //       <Route path="/e" component={E} exact />
  //     </Switch>
  // </BrowserRouter>
);

const Div = styled.h1`
  color: green;
  font-size: 50px;
`;

export default App;
