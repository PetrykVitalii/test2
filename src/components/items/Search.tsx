import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { HandleToggle } from '@/components/common/hooks/useToggle';
import { FullItem } from '@/store/reducers/items';
import search from '@/utils/search';

import useInput from '@/components/common/hooks/useInput';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import useLanguage from '@/components/common/hooks/useLanguage';

import SearchGreyIcon from '@/components/common/icons/items/SearchGreyIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import FixedHeader from '@/components/FixedHeader';
import Item from '@/components/items/Item';

interface Props {
  hideSearch: HandleToggle;
  userItems: FullItem[];
}

const Search: React.FC<Props> = ({ hideSearch, userItems }) => {
  const [searchValue, setSearch] = useInput();
  const [inputRef, focusInput] = useFocusInput();
  const [{ items: itemsLan, common }] = useLanguage();

  const listWrapper = useRef<HTMLDivElement>(null);

  const searchItem = search(userItems, searchValue, ({ name }) => name);

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

  const clearSearch = () => setSearch('');

  return (
    <SearchWrap>
      <FixedHeader>
        <HeaderWrap>
          <TopButton onClick={hideSearch}>
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
            autoCapitalize="off"
          />
          <PlusButton visibility={searchValue} onClick={clearSearch}>
            <PlusIcon width="27px" height="27px" />
          </PlusButton>
        </HeaderWrap>
      </FixedHeader>
      <ItemsContainer ref={listWrapper}>
        {searchValue.length > 0
          && (!searchItem.length ? (
            searchValue.length > 0 && (
              <WrapNoResult>
                <SearchIcon>
                  <SearchGreyIcon />
                </SearchIcon>
                <NoResult>{itemsLan.no_results}</NoResult>
              </WrapNoResult>
            )
          ) : (
            <>
              {searchItem.map((userItem: FullItem) => (
                <Item search key={userItem.id} userItem={userItem} />
              ))}
            </>
          ))}
      </ItemsContainer>
    </SearchWrap>
  );
};

const SearchWrap = styled.div`
  width: 100%;
`;

const WrapNoResult = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 280px;
  padding-bottom: 50px;
  margin: 86px auto 0;
`;

const SearchIcon = styled.div`
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

const ItemsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
`;

const SearchItem = styled.input`
  width: 85%;
  padding: 0 24px;
  height: 24px;
  font-size: 16.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
  border: none;
  outline: none;
  caret-color: #f43939;
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
  width: 27px;
  height: 27px;
  margin-bottom: 2px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ visibility }) => visibility.length > 0 ? 'visibile' : 'hidden'};
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
