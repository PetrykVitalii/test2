/* eslint-disable import/prefer-default-export */
import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { Unit } from '../reducers/units';

const selectUnitsState = (state: State) => state.unitsReducer;

export const selectUnits: Selector<State, Unit[]> = createSelector(
  selectUnitsState,
  ({ units }) => units,
);

export const selectLoading: Selector<State, boolean> = createSelector(
  selectUnitsState,
  ({ isLoading }) => isLoading,
);
