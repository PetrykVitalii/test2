import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface PathRestoreStore {
  path: string | null;
}

const initialState: PathRestoreStore = {
  path: null,
};

export class PathRestoreReducer extends ImmerReducer<PathRestoreStore> {
  public setPath(path: string) {
    this.draftState.path = path;
  }

  public resetPath() {
    this.draftState.path = null;
  }
}

export default createReducerFunction(PathRestoreReducer, initialState);
