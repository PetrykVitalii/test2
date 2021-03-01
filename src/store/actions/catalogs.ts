import { createActionCreators } from 'immer-reducer';
import { CatalogsReducer } from '@/store/reducers/catalogs';
import { AsyncAction } from './common';

export const catalogsActions = createActionCreators(CatalogsReducer);

export type CatalogsActions =
  | ReturnType<typeof catalogsActions.setIsLoading>
  | ReturnType<typeof catalogsActions.setCatalogs>;

export const getCatalogs = (): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(catalogsActions.setIsLoading(true));

    const { seller_catalogs: catalogStats } = await mainProtectedApi.getCatalogs();

    const { languageReducer } = getState();
    const { ln } = languageReducer;
    const lnQuery = ln.toLowerCase().trim();

    const catalogStatsWithModifiedLinks = catalogStats.map((catalog) => (
      { ...catalog, short_link: `${catalog.short_link}?lang=${lnQuery}` }));

    dispatch(catalogsActions.setCatalogs(catalogStatsWithModifiedLinks));
    dispatch(catalogsActions.setIsLoading(false));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(catalogsActions.setIsLoading(false));
  }
};
