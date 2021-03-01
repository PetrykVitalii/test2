import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProps, Redirect, useHistory } from 'react-router';
import { Route } from 'react-router-dom';

import { pathRestoreActions } from '@/store/actions/path-restore';
import { selectAuthRestoreIsLoggedIn, selectAuthRestoreIsLoading } from '@/store/selectors/auth-restore';

import Loader from './Loader';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const isLoading = useSelector(selectAuthRestoreIsLoading);
  const isLoggedIn = useSelector(selectAuthRestoreIsLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  if (isLoading) return <Loader />;

  if (!isLoggedIn) {
    dispatch(pathRestoreActions.setPath(history.location.pathname));
  }

  return isLoggedIn ? <Route {...props} /> : <Redirect to="/" />;
};

export default ProtectedRoute;
