import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface LanguageState {
  ln: LANGUAGES;
}

export enum LANGUAGES {
  EN = 'EN',
  SG = 'SG',
  ID = 'ID',
  TH = 'TH',
  ZH = 'ZH'
}

const initialState: LanguageState = {
  ln: LANGUAGES.EN,
};

export class LanguageReducer extends ImmerReducer<LanguageState> {
  setLn(ln: LANGUAGES) {
    const lnToSet = Object.values(LANGUAGES).includes(ln) ? ln : LANGUAGES.EN;

    this.draftState.ln = lnToSet;
  }
}

export default createReducerFunction(LanguageReducer, initialState);
