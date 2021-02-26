/* eslint-disable no-console */
import { createActionCreators } from 'immer-reducer';
import { Units } from '@/api/main';
import { UnitsReducer } from '../reducers/units';
import { AsyncAction } from './common';

export const unitsActions = createActionCreators(UnitsReducer);

export type UnitsActions =
  | ReturnType<typeof unitsActions.setLoading>
  | ReturnType<typeof unitsActions.setUnits>;

export const getUnits = (): AsyncAction => async (
  dispatch,
  getState,
  { mainApi },
) => {
  try {
    const { unitsReducer } = getState();

    if (!unitsReducer.units.length) {
      dispatch(unitsActions.setLoading(true));
      const { units }: Units = await mainApi.getUnits();
      dispatch(unitsActions.setUnits(units));
    }
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(unitsActions.setLoading(false));
  }
};
