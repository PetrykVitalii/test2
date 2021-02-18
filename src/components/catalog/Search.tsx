import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Redirect, RouteComponentProps } from 'react-router';
import { useSelector } from 'react-redux';

import search from '@/utils/search';
import { selectCatalogItems, selectIsCustomPrice } from '@/store/selectors/items';
import { selectCatalog } from '@/store/selectors/catalog';
import UseWindowScrollBlock from '../common/hooks/useWindowScrollBlock';
import useFocusInput from '../common/hooks/useFocusInput';
import useInput from '../common/hooks/useInput';
import BackIcon from '../common/icons/BackIcon';
import SearchIcon from '../common/icons/SearchIcon';
import useLanguage from '../common/hooks/useLanguage';
import Item from './Item';
import CloseIcon from '../common/icons/CloseIcon';

interface Props extends RouteComponentProps<{catalogId: string}> {}

const Search: React.FC<Props> = ({ match, history }) => {
  const [searchValue, setSearch] = useInput();
  const clearSearch = () => setSearch('');
  const [inputRef, focusInput] = useFocusInput();
  const listWrapper = useRef<HTMLDivElement>(null);
  const [{ catalog: catalogLan }] = useLanguage();
  const catalog = useSelector(selectCatalog);
  const items = useSelector(selectCatalogItems);
  const isCustomPrice = useSelector(selectIsCustomPrice);

  const { catalogId } = match.params;

  UseWindowScrollBlock();

  const searchItems = search(items, searchValue, ({ name }) => name);

  useEffect(() => {
    if (listWrapper.current) {
      listWrapper.current?.addEventListener('scroll', hideKeyboardOnScroll, false);
      window.addEventListener('scroll', hideKeyboardOnScroll, false);
    }

    return () => {
      listWrapper.current?.removeEventListener('scroll', hideKeyboardOnScroll, false);
      window.removeEventListener('scroll', hideKeyboardOnScroll, false);
    };
  }, [listWrapper]);

  const hideKeyboardOnScroll = () => {
    inputRef.current!.blur();
  };

  if (!catalog.seller_catalog.category.name) {
    return <Redirect to={`/catalogs/${catalogId}`} />;
  }

  return (
    <SearchWrap heigth={window.innerHeight}>
      <Header>
        <HeaderWrap>
          <TopButton onClick={() => history.goBack()}>
            <BackIcon />
          </TopButton>
          <SearchItem
            onClick={focusInput}
            type="text"
            autoFocus
            value={searchValue}
            onChange={setSearch}
            placeholder={catalogLan.search_placeholder}
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="on"
          />
          <PlusButton visibility={searchValue} onClick={clearSearch}>
            <CloseIcon />
          </PlusButton>
        </HeaderWrap>
      </Header>
      <Empty />
      <ItemsContainer ref={listWrapper} heigth={window.innerHeight}>
        {searchValue.length > 2
          && (searchItems.length > 0 ? (
            <>
              <TopMatch>{catalogLan.matches_header}</TopMatch>
              {searchItems.map((item) => (
                <Item
                  isCustomPrice={isCustomPrice}
                  isSearch
                  catalogId={catalogId}
                  item={item}
                  key={item.id}
                />
              ))}
            </>
          ) : (
            <WrapNoResult>
              <SearchIconWrap>
                <SearchIcon color="gray" />
              </SearchIconWrap>
              <NoResult>{catalogLan.no_results}</NoResult>
            </WrapNoResult>
          ))}
      </ItemsContainer>
    </SearchWrap>
  );
};

const WrapNoResult = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 280px;
  padding-bottom: 50px;
  margin: 0 auto ;
  padding-top: 54px;
`;

const SearchIconWrap = styled.div`
  width: 32px;
  height: 32px;
`;

const NoResult = styled.div`
  font-size: 17px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: center;
  color: #909599;
  margin-top: 18px;
`;

const TopMatch = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  margin-bottom: 24px;
  text-transform: uppercase;
`;

const SearchWrap = styled.div<{heigth: number}>`
  max-width: 552px;
  margin: 0 auto;
  height: ${({ heigth }) => heigth && `${heigth}px`};
  position: fixed;
  z-index: 500;
  overflow-y: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Empty = styled.div`
  width: 100%;
  height: 72px;
`;

const ItemsContainer = styled.div<{ heigth: number}>`
  width: 100%;
  background-color: #ffffff;
  position: relative;
  padding: 26px 16px 10px;
  height: ${({ heigth }) => heigth && `calc(${heigth}px - 72px)`};
  overflow-y: auto;
`;

const SearchItem = styled.input`
  width: 85%;
  padding: 0px 24px;
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

const TopButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const PlusButton = styled.div<{visibility: string}>`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ visibility }) => (visibility.length > 0 ? 'visibile' : 'hidden')};
`;

const Header = styled.header`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  max-width: 552px;
  height: 72px;
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
`;

export default Search;
