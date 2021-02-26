import { createActionCreators } from 'immer-reducer';
import { СategoryReducer } from '@/store/reducers/categories';
import { AsyncAction } from './common';

export const categoriesActions = createActionCreators(СategoryReducer);

export type CategoriesActions =
  | ReturnType<typeof categoriesActions.setIsLoading>
  | ReturnType<typeof categoriesActions.setIsComming>
  | ReturnType<typeof categoriesActions.setСategory>;

export const getCategories = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(categoriesActions.setIsLoading(true));

    const { categories } = await mainProtectedApi.getCategories();

    dispatch(categoriesActions.setСategory(categories));
    dispatch(categoriesActions.setIsLoading(false));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(categoriesActions.setIsComming(true));
    dispatch(categoriesActions.setIsLoading(false));
  }
};
