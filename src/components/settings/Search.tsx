import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { LANGUAGES } from '@/store/reducers/language';
import { HandleToggle } from '@/components/common/hooks/useToggle';

import useInput from '@/components/common/hooks/useInput';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import useLanguage from '@/components/common/hooks/useLanguage';
import search from '@/utils/search';

import BackIcon from '@/components/common/icons/BackIcon';
import SearchGreyIcon from '@/components/common/icons/items/SearchGreyIcon';
import CheckIcon from '@/components/common/icons/settings/CheckIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import FixedHeader from '@/components/FixedHeader';

interface Props {
  hideSearch: HandleToggle;
  userLanguages: Array<any>;
  currentLanguage: string | undefined;
  handleLanguageClick: (value: LANGUAGES) => () => void;
}

const Search: React.FC<Props> = ({
  hideSearch,
  userLanguages,
  currentLanguage,
  handleLanguageClick,
}) => {
  const [searchValue, setSearch] = useInput();
  const [inputRef, focusInput] = useFocusInput();
  const [{ items: itemsLan, common }] = useLanguage();

  const listWrapper = useRef<HTMLDivElement>(null);

  const searchItem = search(userLanguages, searchValue, (ln) => ln[0]);

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
              {searchItem.map((item) => (
                <Language
                  key={item[0]}
                  onClick={handleLanguageClick(item[1])}
                >
                  {item[0]}
                  <CheckIconWrap
                    isSelected={item[1] === currentLanguage}
                  >
                    <CheckIcon />
                  </CheckIconWrap>
                </Language>
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

const Empty = styled.div<{height: string}>`
  height: ${({ height }) => height && height};
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

  padding-top: 16px;
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

const Language = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px 16px;
  width: 100%;
  cursor: pointer;
`;

const CheckIconWrap = styled.div<{isSelected: boolean}>`
  display: ${({ isSelected }) => isSelected ? 'block' : 'none'};
  min-width: 22px;
  height: 22px;
`;

export default Search;
