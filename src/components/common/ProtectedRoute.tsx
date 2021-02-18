/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RouteProps, Redirect, useRouteMatch,
} from 'react-router';
import { Route } from 'react-router-dom';

import { selectUserItems } from '@/store/selectors/user';
import LocalStorage from '@/utils/local-storage';
import { userActions } from '@/store/actions/user';
import { selectCatalog, selectLoading } from '@/store/selectors/catalog';
import { getCatalog } from '@/store/actions/catalog';
import Loader from '../Loader';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  let items = useSelector(selectUserItems);
  const catalog = useSelector(selectCatalog);
  const isLoading = useSelector(selectLoading);
  const match = useRouteMatch<{ catalogId: string }>('/:catalogId');
  const catalogId = match?.params?.catalogId || '';

  const dispatch = useDispatch();

  useEffect(() => {
    if (!catalog.phone) {
      dispatch(getCatalog(catalogId));
    }
  }, []);

  if (!LocalStorage.getUserInfo()) {
    return <Redirect to={`/catalogs/${catalogId}`} />;
  }

  if (!items.length) {
    if (LocalStorage.getUserItems() && LocalStorage.getUserItems().length) {
      dispatch(userActions.setUserItems(LocalStorage.getUserItems()));
      items = LocalStorage.getUserItems();
    } else {
      return <Redirect to={`/catalogs/${catalogId}`} />;
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return items.length > 0 && (catalog && catalog.phone) ? <Route {...props} /> : <Redirect to={`/catalogs/${catalogId}`} />;
};

export default ProtectedRoute;
