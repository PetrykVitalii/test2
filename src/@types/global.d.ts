import { compose } from 'redux';
import { PrecacheEntry } from 'workbox-precaching/_types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __WB_MANIFEST: (string | PrecacheEntry)[];
    dataLayer: {
      push: (args: {
        event?: string;
        formName?: string;
        noItems?: string;
        launchedOn?: string;
      }) => void;
    };
  }
}
