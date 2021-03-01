import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { FullItem } from '@/store/reducers/items';
import { selectCatalog } from '@/store/selectors/catalog';
import { HandleToggle } from '@/components/common/hooks/useToggle';

import useFocusInput from '@/components/common/hooks/useFocusInput';
import useLanguage from '@/components/common/hooks/useLanguage';
import search from '@/utils/search';

import BackIcon from '@/components/common/icons/BackIcon';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import SearchIcon from '@/components/common/icons/SearchIcon';
import Item from '@/components/catalogs/Item';
import FixedHeader from '@/components/FixedHeader';

interface Props {
  items: FullItem[];
  setIsModal: HandleToggle;
}

const Search: React.FC<Props> = ({
  items, setIsModal,
}) => {
  const catalog = useSelector(selectCatalog);

  const [searchValue, setSearch] = useInput();
  const clearSearch = () => setSearch('');
  const listWrapper = useRef<HTMLDivElement>(null);
  const [inputRef, focusInput] = useFocusInput();
  const [{ common, catalogs }] = useLanguage();

  const searchItems = search(items, searchValue, ({ name }) => name);

  useEffect(() => {
    focusInput();
  }, []);

  useEffect(() => {
    if (listWrapper.current) {
      listWrapper.current!.addEventListener('scroll', hideKeyboardOnScroll, false);
      window.addEventListener('scroll', hideKeyboardOnScroll, false);
    }

    return () => {
      listWrapper.current!.removeEventListener('scroll', hideKeyboardOnScroll, false);
      window.removeEventListener('scroll', hideKeyboardOnScroll, false);
    };
  }, [listWrapper]);

  const hideKeyboardOnScroll = () => {
    inputRef.current!.blur();
  };

  return (
    <SearchWrap>
      <FixedHeader>
        <HeaderWrap>
          <TopButton onClick={setIsModal}>
            <BackIcon />
          </TopButton>
          <SearchItem
            onClick={focusInput}
            type="text"
            autoFocus
            value={searchValue}
            onChange={setSearch}
            placeholder={common.search}
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
      </FixedHeader>
      <ItemsContainer ref={listWrapper}>
        {searchValue.length > 0 && (
          <>
            {searchItems.length > 0 ? (
              <>
                <TopMatch>{common.top_matches}</TopMatch>
                {searchItems.map((item) => (
                  <Item
                    key={item.id}
                    isCustomPrice={catalog!.is_custom_pricing_enabled}
                    item={item}
                    catalogId={catalog && catalog.id}
                  />
                ))}
              </>
            ) : (
              <WrapNoResult>
                <SearchIconWrap>
                  <SearchIcon color="gray" />
                </SearchIconWrap>
                <NoResult>{catalogs.search_no_results}</NoResult>
              </WrapNoResult>
            )}
          </>
        )}
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
  margin-bottom: 17px;
  text-transform: uppercase;
`;

const SearchWrap = styled.div`
  max-width: 552px;
  margin: 0 auto;
  position: fixed;
  z-index: 500;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  @media screen and (min-width: 552px) {
    top: 40px;
    bottom: 40px;
  }
`;

const ItemsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  position: relative;
  padding: 26px 16px 20px;
  overflow-y: auto;
  padding-top: 16px;

  height: 100%;

  /* @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  } */
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
