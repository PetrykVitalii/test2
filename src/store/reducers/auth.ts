import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface AuthState {
  isLoading: boolean,
  isError: boolean,
  errMsg: string,
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  errMsg: '',
};

export class AuthReducer extends ImmerReducer<AuthState> {
  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsError(isError: boolean) {
    this.draftState.isError = isError;
  }

  setErrMsg(errMsg: string) {
    this.draftState.errMsg = errMsg;
  }
}

export default createReducerFunction(AuthReducer, initialState);
