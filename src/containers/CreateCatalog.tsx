import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createCatalogActions } from '@/store/actions/createCatalog';

import useToggle from '@/components/common/hooks/useToggle';

import Step1 from '@/components/catalogs/create-steps/Step1';
import Step2 from '@/components/catalogs/create-steps/Step2';
import Step3 from '@/components/catalogs/create-steps/Step3';
import Step4 from '@/components/catalogs/create-steps/Step4';
import AddItems from '@/containers/AddItems';
import { getCatalog } from '@/store/actions/catalog';
import { selectDefaultCatalogId } from '@/store/selectors/user';

const CreateCatalog: React.FC = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const defaultCatalogId = useSelector(selectDefaultCatalogId);

  const [openModal, setOpenModal] = useToggle(false);

  useEffect(() => {
    if (!defaultCatalogId) {
      return;
    }

    dispatch(getCatalog(defaultCatalogId));
  }, [defaultCatalogId]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCloseCreateCategory = () => {
    handleCloseModal();
    dispatch(createCatalogActions.cleanCatalog());
    history.push('/catalogs');
  };

  return (
    <Switch>
      <Route
        path={`${path}/step1`}
        exact
        render={() => (
          <Step1
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            handleCloseCreateCategory={handleCloseCreateCategory}
            openModal={openModal}
          />
        )}
      />
      <Route
        path={`${path}/step2`}
        exact
        render={() => (
          <Step2
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            handleCloseCreateCategory={handleCloseCreateCategory}
            openModal={openModal}
          />
        )}
      />
      <Route
        path={`${path}/step3`}
        exact
        render={() => (
          <Step3
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            handleCloseCreateCategory={handleCloseCreateCategory}
            openModal={openModal}
          />
        )}
      />

      <Route
        path={`${path}/step3/add-items`}
        exact
        render={() => (
          <AddItems />
        )}
      />

      <Route
        path={`${path}/step4`}
        exact
        render={() => (
          <Step4
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            handleCloseCreateCategory={handleCloseCreateCategory}
            openModal={openModal}
          />
        )}
      />
    </Switch>
  );
};

export default CreateCatalog;
