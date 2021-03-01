/* eslint-disable no-param-reassign */
// import queryString from 'query-string';
// import LocalStorage from '@/utils/local-storage';
import queryString from 'query-string';
import LocalStorage from '@/utils/local-storage';
import { AsyncAction } from './common';

export interface IUtm {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  fbclid?: string;
  utm_content?: string;
  utm_term?: string;
}

export const allUtms: IUtm = {
  utm_source: 'OK',
  utm_medium: 'OK',
  utm_campaign: 'OK',
  gclid: 'OK',
  fbclid: 'OK',
  utm_content: 'OK',
  utm_term: 'OK',
};

export const trackUtm = (): AsyncAction => async (_, getState) => {
  const { router } = getState();
  const { search } = router.location;

  const localStorageUtms = LocalStorage.getUTM() || {};

  const searchUtms = search.slice(1).split('&').reduce((a: IUtm, i) => {
    const [x, y] = i.split('=') as [keyof IUtm, string];
    if (allUtms[x]) {
      a[x] = y;
    }

    return a;
  }, {}) || {} as IUtm;
  console.log(searchUtms);

  // const searchUtms = queryString.parse(search) as IUtm;

  const entriesUtms = Object.entries(searchUtms) as [keyof IUtm, string][];

  const utmsToSave = entriesUtms.reduce(
    (utms: IUtm, [key, value]) => {
      if (allUtms[key]) {
        const isEmpty = !localStorageUtms[key];
        if (isEmpty) {
          utms[key] = value;
        } else {
          utms[key] = localStorageUtms[key];
        }
      }
      return utms;
    },
    {},
  );

  LocalStorage.setUTM(utmsToSave);
};
