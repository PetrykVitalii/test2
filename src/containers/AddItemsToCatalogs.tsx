/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';

import {
  selectCatalogs, selectIsComing, selectIsLoading, selectItems,
} from '@/store/selectors/items-to-catalogs';
import { addItemsToCatalog, getCatalogs, itemsToCatalogsActions } from '@/store/actions/items-to-catalogs';

import useFocusInput from '@/components/common/hooks/useFocusInput';
import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import useInput from '@/components/common/hooks/useInput';
import search from '@/utils/search';

import BackIcon from '@/components/common/icons/BackIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import Plus from '@/components/common/icons/Plus';
import Loader from '@/components/common/Loader';
import CatalogCard from '@/components/items/CatalogCard';
import Button from '@/components/Button';
import ButtonWrap from '@/components/common/ButtonWrap';

interface Props extends RouteComponentProps {}

const AddItemsToCatalogs: React.FC<Props> = ({ history }) => {
  const [searchValue, setSearch] = useInput();
  const [isFocus, setIsFocus] = useToggle();
  const [inputRef, focusInput] = useFocusInput();
  const catalogs = useSelector(selectCatalogs);
  const isComing = useSelector(selectIsComing);
  const items = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const [{ items: itemsLan }] = useLanguage();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogs());
    return () => {
      dispatch(itemsToCatalogsActions.setIsComing(false));
    };
  }, []);

  const focus = (status: boolean) => () => {
    setIsFocus(status);
    if (status) {
      focusInput();
    } else {
      inputRef.current!.blur();
    }
  };

  const searchCatalogs = useMemo(
    () => search(catalogs, searchValue, ({ name }) => name),
    [catalogs, searchValue],
  );

  const clearSearch = () => {
    setSearch('');
    setIsFocus(false);
    inputRef.current!.blur();
  };

  const catalogsLength = () => {
    const catalogLength = catalogs.filter((catalog) => catalog.isAddStatus).length + 1;
    return catalogLength > 1
      ? itemsLan.add_to_catalogs.replace(
        '{count}',
        catalogLength.toString(),
      )
      : itemsLan.add_to_catalog;
  };

  const saveItemsToCatalogs = () => {
    dispatch(addItemsToCatalog());
  };

  const getBackAction = () => (searchValue || isFocus) ? clearSearch : history.goBack;

  if (!isComing) {
    return <Loader scale="0.5" />;
  }

  if (!items.length) {
    return <Redirect to="/items" />;
  }

  if (catalogs.length === 1) {
    return <Redirect to={`/catalogs/${catalogs[0].id}`} />;
  }

  return (
    <>
      <Header>
        <TopButton onClick={getBackAction()}>
          <BackIcon />
        </TopButton>
        {!isFocus && !searchValue && (
          <TitleWrap onClick={focus(true)}>
            <Title>{itemsLan.select_catalogs}</Title>
            <SubTitle>
              { items.length > 1
                ? itemsLan.new_items.replace('{count}', items.length.toString())
                : itemsLan.new_item}
            </SubTitle>
          </TitleWrap>
        )}
        <SearchItem
          onBlur={focus(false)}
          onFocus={focus(true)}
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={setSearch}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize="on"
        />
        {searchValue ? (<PlusWrap onClick={clearSearch}><Plus /></PlusWrap>) : (
          <TopButton className="item select-catalog search-btn" onClick={focus(true)}>
            <SearchIcon />
          </TopButton>
        )}
      </Header>
      <Empty />
      <Main>
        {searchCatalogs.map((catalog) => (
          <CatalogCard key={catalog.id} catalog={catalog} />
        ))}
        <ButtonWrap
          isFixed
        >
          <Button isLoading={isLoading} classTracking="item select-catalog cta-add" shadow onClick={saveItemsToCatalogs}>
            {catalogsLength()}
          </Button>
        </ButtonWrap>
      </Main>
    </>
  );
};

const TopButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const SearchItem = styled.input`
  grid-area: input / input / input / input;
  width: 100%;
  padding: 0px 24px 0 22px;
  height: 24px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.3px;
  color: #21272e;
  border: none;
  outline: none;
  &::placeholder{
    color: #b4babf;
  }
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const TitleWrap = styled.div`
  z-index: 2;
  grid-area: input / input / input / input;
  height: 100%;
  padding: 0 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PlusWrap = styled.div`
  cursor: pointer;
  width: 18px;
  height: 18px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  width: 100%;
  padding: 0 16px 16px;
  background-color: white;
  padding: 8px 16px 80px;


  @media screen and (min-width: 552px) {
    padding-top: 44px;
  }
`;

const Empty = styled.div`
  height: 72px;
`;

const Header = styled.div`
  padding: 12px 24px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.17);
  background-color: #ffffff;
  width: 100%;
  position: fixed;
  z-index: 100;
  max-width: 552px;
  flex-grow: 3;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  grid-template-areas: "left input right";
  align-items: center;
  min-height: 74px;
`;

export default AddItemsToCatalogs;
