import 'core-js';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import '@/pwa/init';
import App from '@/containers/App';

ReactDOM.render(<App />, document.getElementById('root'));
