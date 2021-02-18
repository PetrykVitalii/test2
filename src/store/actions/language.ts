import { createActionCreators } from 'immer-reducer';
import { LanguageReducer, LANGUAGES } from '@/store/reducers/language';
import LocalStorage from '@/utils/local-storage';
import { AsyncAction } from './common';

export const languageActions = createActionCreators(LanguageReducer);

export type LanguageActions = ReturnType<typeof languageActions.setLn>;

export const detectLanguage = (): AsyncAction => async (dispatch, getState) => {
  const { router } = getState();
  const searchLang = router.location?.query?.lang;

  switch (searchLang) {
    case 'en':
      dispatch(languageActions.setLn(LANGUAGES.EN));
      return;
    case 'th':
      dispatch(languageActions.setLn(LANGUAGES.TH));
      return;
    case 'hk':
    case 'zh':
      dispatch(languageActions.setLn(LANGUAGES.ZH));
      return;
    case 'id':
      dispatch(languageActions.setLn(LANGUAGES.ID));
      return;
    default:
  }

  const localStorageLn = LocalStorage.getLn();

  if (localStorageLn) {
    dispatch(languageActions.setLn(localStorageLn));
    return;
  }

  let browserLn: string;

  if (navigator?.languages && navigator?.languages?.length) {
    const { languages } = navigator;
    const [ln] = languages;

    browserLn = ln;
  } else if ((navigator as any)?.userLanguage) {
    browserLn = (navigator as any)?.userLanguage;
  } else {
    browserLn = navigator?.language;
  }

  switch (browserLn) {
    case 'en-US':
    case 'en':
      dispatch(languageActions.setLn(LANGUAGES.EN));
      break;
    case 'id':
      dispatch(languageActions.setLn(LANGUAGES.ID));
      break;
    case 'th':
      dispatch(languageActions.setLn(LANGUAGES.TH));
      break;
    case 'ms':
      dispatch(languageActions.setLn(LANGUAGES.SG));
      break;
    case 'zh-CN':
    case 'zh-HK':
    case 'zh-TW':
    case 'zh':
      dispatch(languageActions.setLn(LANGUAGES.ZH));
      break;
    default:
      dispatch(languageActions.setLn(LANGUAGES.EN));
  }
};

export const changeLanguage = (ln: LANGUAGES): AsyncAction => async (dispatch) => {
  LocalStorage.setLn(ln);
  dispatch(languageActions.setLn(ln));
};
