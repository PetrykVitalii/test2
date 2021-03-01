import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getCatalogs } from '@/store/actions/catalogs';
import { selectCatalogs, selectIsLoading } from '@/store/selectors/catalogs';
import { createCatalogActions } from '@/store/actions/createCatalog';
import { catalogsActions } from '@/store/actions/catalog';
import { TAB } from '@/store/reducers/catalog';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import Loader from '@/components/common/Loader';

import Card from '@/components/catalogs/Card';
import IntroCard from '@/components/catalogs/IntroCard';
import Navigation from '@/components/Navigation';
import FixedHeader from '@/components/FixedHeader';
import scrollTo from '@/utils/scrollTo';

const Catalogs: React.FC = () => {
  const [{ catalogs }] = useLanguage();
  const history = useHistory();
  const [isCameCatalogs, setIsCameCatalogs] = useToggle(true);

  const dispatch = useDispatch();

  const allCatalogs = useSelector(selectCatalogs);
  const isLoading = useSelector(selectIsLoading);

  const handleGoToCreate = () => {
    dispatch(createCatalogActions.cleanCatalog());
    history.push('/catalogs/new/step1');
  };

  useEffect(() => {
    setIsCameCatalogs(false);
  }, [allCatalogs]);

  useEffect(() => {
    scrollTo(0);
    dispatch(catalogsActions.setSelectedTab(TAB.Items));
    dispatch(getCatalogs());
  }, []);

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <Text>{catalogs.catalogs_header}</Text>
          {allCatalogs.length > 1 && (
            <ButtonWrap
              className="catalog-list add-catalog-plus-btn"
              onClick={handleGoToCreate}
            >
              <PlusIcon />
            </ButtonWrap>
          )}
        </HeaderWrap>
      </FixedHeader>
      <Main bg={!allCatalogs.length}>
        {isLoading || isCameCatalogs ? (
          <Loader scale="0.5" />
        ) : (
          <Container>
            {allCatalogs.map((item) => (
              <CardsWrapper key={item.id}>
                <Card
                  catalog={item}
                />
              </CardsWrapper>
            ))}
            {allCatalogs.length === 1 && (
              <IntroCard
                handleCreate={handleGoToCreate}
              />
            )}
          </Container>
        )}
      </Main>
      <Navigation path="catalogs" />
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const Main = styled.div<{ bg: boolean }>`
  background: ${({ bg }) => bg ? '#fff' : '#f9f9f9'};
  min-height: calc(100vh - 144px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 224px);
  }
`;

const Container = styled.div`
  padding: 32px 24px 14px 24px;
  width: 100%;
`;

const ButtonWrap = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CardsWrapper = styled.div`
  margin-bottom: 24px;
  &:first-child {
    /* margin-bottom: 0px; */
  }
  &:last-child {
    margin-bottom: 0px;
  }
`;

export default Catalogs;
