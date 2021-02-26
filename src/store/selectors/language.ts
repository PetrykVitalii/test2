import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { LANGUAGES } from '@/store/reducers/language';

type LanguagesEnumValues = keyof typeof LANGUAGES;

const selectLanguage = (state: State) => state.languageReducer;

export const selectLn: Selector<State, LanguagesEnumValues> = createSelector(
  selectLanguage,
  ({ ln }) => ln,
);

export const selectLnForQuery: Selector<State, string> = createSelector(
  selectLanguage,
  ({ ln }) => ln.toLowerCase().trim(),
);
