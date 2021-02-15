import React from "react";
import ReactDOM from "react-dom";
// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';
import styled from 'styled-components';

// Sentry.init({
//   dsn: 'https://5713e176114d48018bc11a3a500b2654@o494472.ingest.sentry.io/5565601',
//   autoSessionTracking: true,
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

const App = () => {
  const fail = () => {
    const styledC: any = styled;
    console.log(styledC);
    document.body.style.background = "red";
  };

  return (
  <Div onClick={fail}>My React and TypeScript App!</Div>
)};

const Div = styled.h1`
`;

ReactDOM.render(
  <App />,
  document.getElementById("root")
);