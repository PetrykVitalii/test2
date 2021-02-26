/* eslint-disable no-param-reassign */
import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface Unit {
  id: number;
  name: string;
}

export interface UnitsState {
  units: Unit[];
  isLoading: boolean;
}

const initialState: UnitsState = {
  units: [],
  isLoading: false,
};

export class UnitsReducer extends ImmerReducer<UnitsState> {
  setUnits(units: Unit[]) {
    this.draftState.units = units.sort((a, b) => (a.id - b.id));
  }

  setLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }
}

export default createReducerFunction(UnitsReducer, initialState);
