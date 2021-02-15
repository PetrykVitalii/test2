import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from "./components/App";

Sentry.init({
  dsn: 'https://5713e176114d48018bc11a3a500b2654@o494472.ingest.sentry.io/5565601',
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Sentry.ErrorBoundary fallback="An error has occurred">
    <App />
  </Sentry.ErrorBoundary>,
  document.getElementById("root")
);