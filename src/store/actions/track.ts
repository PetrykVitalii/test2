/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { AsyncAction } from './common';

export const sendTrack = (id: number, event: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  try {
    const body = {
      event_type: event,
      catalog_id: id,
    };

    await mainApi.sendTrack(body);
  } catch (e) {
    console.error(e);
  }
};
