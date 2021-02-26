import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';
import { STEPS } from '@/store/reducers/auth';
import { LANGUAGES } from '@/store/reducers/language';
import LocalStorage from '@/utils/local-storage';
import { AuthRestoreReducer } from '../reducers/auth-restore';
import { AsyncAction } from './common';
import { authActions } from './auth';
import { userActions } from './user';
import { catalogsActions } from './catalog';
import { languageActions } from './language';
import { pathRestoreActions } from './path-restore';

export const authRestoreActions = createActionCreators(AuthRestoreReducer);

export type AuthRestoreActions =
  | ReturnType<typeof authRestoreActions.setIsLoadingActive>
  | ReturnType<typeof authRestoreActions.setIsLoadingInActive>
  | ReturnType<typeof authRestoreActions.setIsLogInActive>
  | ReturnType<typeof authRestoreActions.setIsLogInInActive>;

export const authRestore = (isGlobal: boolean = false): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    if (!LocalStorage.getAccessToken()) return;

    if (isGlobal) dispatch(authRestoreActions.setIsLoadingActive());

    const {
      short_link: shortLink,
      seller,
      deliveries,
      items_count: itemsCount,
      pending_orders: pendingOrders,
      confirmed_orders: confirmedOrders,
      default_catalog: defaultCatalog,
      pending_quotes: pendingQuotes,
      language,
    } = await mainProtectedApi.getMe();

    const { router, languageReducer, pathRestoreReducer } = getState();
    const { pathname } = router.location;
    const { ln } = languageReducer;
    const lnQuery = ln.toLowerCase().trim();
    const { path } = pathRestoreReducer;

    if (defaultCatalog && (pathname.startsWith('/setup') || pathname.startsWith('/signup'))) {
      defaultCatalog!.delivery_time_to = defaultCatalog!.delivery_time_to.replace(
        '00:00:00',
        '24:00:00',
      );
      dispatch(catalogsActions.setCatalog(defaultCatalog));
    }

    dispatch(authRestoreActions.setIsLogInActive());
    dispatch(authRestoreActions.setIsLoadingInActive());
    dispatch(authActions.setLink(`${shortLink}?lang=${lnQuery}`));
    dispatch(userActions.setUser(seller));
    dispatch(userActions.setDefaultCatalogId(defaultCatalog.id));
    dispatch(userActions.setDeliveries(deliveries));
    dispatch(userActions.setPendingOrders(pendingOrders));
    dispatch(userActions.setConfirmedOrders(confirmedOrders));
    dispatch(userActions.setPendingQuotes(pendingQuotes));

    switch (language) {
      case 'en':
        dispatch(languageActions.setLn(LANGUAGES.EN));
        break;
      case 'th':
        dispatch(languageActions.setLn(LANGUAGES.TH));
        break;
      case 'hk':
      case 'zh':
        dispatch(languageActions.setLn(LANGUAGES.ZH));
        break;
      case 'id':
        dispatch(languageActions.setLn(LANGUAGES.ID));
        break;
      default:
        break;
    }

    if (!seller.full_name || !seller.business_name) {
      dispatch(push('/setup/step1'));
      dispatch(authActions.setParticularStep(STEPS.DETAILS));
      return;
    }

    if (!seller.country_id) {
      dispatch(push('/setup/step2'));
      dispatch(authActions.setParticularStep(STEPS.LOCATED));
      return;
    }

    if (
      defaultCatalog.created_at
        && defaultCatalog.created_at === defaultCatalog.updated_at
    ) {
      dispatch(push('/setup/step3'));
      dispatch(authActions.setParticularStep(STEPS.CREATE_CATALOG));
      return;
    }

    if (!itemsCount && pathname === '/setup/step4') {
      dispatch(push('/setup/step4'));
      dispatch(authActions.setParticularStep(STEPS.ADD_ITEMS));
      return;
    }

    if (pathname === '/' || pathname.startsWith('/signup') || pathname.startsWith('/setup')) {
      if (path) {
        dispatch(push(path));
        dispatch(pathRestoreActions.resetPath());
        return;
      }

      dispatch(push('/dashboard'));
    }

    dispatch(authActions.setParticularStep(STEPS.SUCCESS));
  } catch (e) {
    dispatch(authRestoreActions.setIsLoadingInActive());
  }
};
