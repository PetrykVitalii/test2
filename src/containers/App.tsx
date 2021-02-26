import React, { Suspense } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const Welcome = React.lazy(() => import('@/containers/Welcome'));

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

const App: React.FC = () => (
  <Sentry.ErrorBoundary fallback="An error has occurred">
    <BrowserRouter>
      <GlobalStyle />
      <EmptyTop />
      <Suspense fallback="q">
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Redirect to="/" />
        </Switch>
      </Suspense>
      <EmptyBottom />
    </BrowserRouter>
  </Sentry.ErrorBoundary>
);

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
