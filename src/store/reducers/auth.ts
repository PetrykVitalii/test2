import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface AuthState {
  step: STEPS;
  isLoading: boolean;
  isError: boolean;
  errMsg: string;
  link: string;
}

export enum STEPS {
  PHONE_NUMBER,
  OTP,
  DETAILS,
  LOCATED,
  CREATE_CATALOG,
  ADD_ITEMS,
  SUCCESS
}

export const steps = [
  STEPS.PHONE_NUMBER,
  STEPS.OTP,
  STEPS.DETAILS,
  STEPS.LOCATED,
  STEPS.CREATE_CATALOG,
  STEPS.ADD_ITEMS,
  STEPS.SUCCESS,
];

const initialState: AuthState = {
  step: STEPS.PHONE_NUMBER,
  isLoading: false,
  isError: false,
  errMsg: '',
  link: '',
};

export class AuthReducer extends ImmerReducer<AuthState> {
  nextStep() {
    const stepLength = steps.length;
    const currentStepIndex = steps.findIndex((step) => step === this.draftState.step);
    const increasedIndex = currentStepIndex + 1;
    const newIndex = increasedIndex % stepLength;
    this.draftState.step = steps[newIndex];

    this.draftState.isLoading = false;
    this.draftState.isError = false;
    this.draftState.errMsg = '';
  }

  setParticularStep(step: STEPS) {
    this.draftState.step = step;
    this.draftState.isLoading = false;
    this.draftState.isError = false;
    this.draftState.errMsg = '';
  }

  setIsLoadingActive() {
    this.draftState.isLoading = true;
  }

  setIsLoadingInactive() {
    this.draftState.isLoading = false;
  }

  setIsErrorActive() {
    this.draftState.isError = true;
  }

  setIsErrorInactive() {
    this.draftState.isError = false;
  }

  setErrMsg(msg: string) {
    this.draftState.errMsg = msg;
  }

  setLink(link: string) {
    this.draftState.link = link;
  }
}

export default createReducerFunction(AuthReducer, initialState);
