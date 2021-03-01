import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface AuthRestoreState {
  isLoading: boolean;
  isLogIn: boolean;
}

const initialState: AuthRestoreState = {
  isLoading: false,
  isLogIn: false,
};

export class AuthRestoreReducer extends ImmerReducer<AuthRestoreState> {
  setIsLoadingActive() {
    this.draftState.isLoading = true;
  }

  setIsLoadingInActive() {
    this.draftState.isLoading = false;
  }

  setIsLogInActive() {
    this.draftState.isLogIn = true;
  }

  setIsLogInInActive() {
    this.draftState.isLogIn = false;
  }
}

export default createReducerFunction(AuthRestoreReducer, initialState);
