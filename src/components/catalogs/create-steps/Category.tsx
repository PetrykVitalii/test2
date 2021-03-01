import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import {
  selectCategories, selectIsComming,
} from '@/store/selectors/categories';
import { categoriesActions, getCategories } from '@/store/actions/categories';
import { IСategory } from '@/store/reducers/categories';
import { createCatalogActions } from '@/store/actions/createCatalog';
import checkLn from '@/utils/categoryLn';

import useLanguage from '@/components/common/hooks/useLanguage';

import CloseIcon from '@/components/common/icons/CloseIcon';
import CatalogCard from '@/components/catalogs/CatalogCard';
import Loader from '@/components/common/Loader';
import FixedHeader from '@/components/FixedHeader';

interface Props {
}

const Category: React.FC<Props> = () => {
  const [{ common, catalogs }] = useLanguage();

  const dispatch = useDispatch();
  const history = useHistory();

  const categories = useSelector(selectCategories);
  const isComming = useSelector(selectIsComming);

  const handleSelectCategory = (obj: IСategory) => () => {
    dispatch(createCatalogActions.setCategory(obj));

    goBack();
  };

  const goBack = () => history.push('/catalogs/new/step1');

  const sortedCategories = categories.map((category) => ({
    ...category,
    trasnlatedName: checkLn(category.name, catalogs),
  })).sort((a, b) => a.trasnlatedName > b.trasnlatedName ? 1 : -1);

  useEffect(() => {
    
    dispatch(getCategories());
    return () => {
      dispatch(categoriesActions.setIsComming(false));
    };
  }, []);

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <IconWrap onClick={goBack}>
            <CloseIcon />
          </IconWrap>
          <Title>{common.category_header}</Title>
        </HeaderWrap>
      </FixedHeader>
      <ScrollView>
        <Container>
          {!isComming ? (
            <Loader scale="0.5" />
          ) : sortedCategories.map((category) => (
            <CardWrap
              className="catalog business-details category-dropdown-selection"
              key={category.id}
              onClick={handleSelectCategory(category)}
            >
              <CatalogCard data={category} />
            </CardWrap>
          ))}
        </Container>
      </ScrollView>
    </>
  );
};

const HeaderWrap = styled.div`
  padding: 12px 24px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
`;

const ScrollView = styled.div`
  overflow-y: auto;
  background: #fff;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const Container = styled.div`
  padding: 32px 16px 32px 16px;
`;

const CardWrap = styled.div`
  cursor: pointer;
  margin-bottom: 16px;
  :last-child{
    margin-bottom: 0;
  }
`;

export default Category;
