import { createActionCreators } from 'immer-reducer';
import { PathRestoreReducer } from '@/store/reducers/path-restore';

export const pathRestoreActions = createActionCreators(PathRestoreReducer);

export type PathRestoreActions =
  | ReturnType<typeof pathRestoreActions.setPath>
  | ReturnType<typeof pathRestoreActions.resetPath>;
