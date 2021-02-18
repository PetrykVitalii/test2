import React from 'react';
import {
  BrowserRouter, Route,
} from 'react-router-dom';
import Home from './Home';

const App: React.FC = () => (
  <BrowserRouter>
    <Route path="/" component={Home} exact />
  </BrowserRouter>
);

export default App;
