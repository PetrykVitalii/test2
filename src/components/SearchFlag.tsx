/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useEffect, useRef,
} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import search from '@/utils/search';
import { CountryFromList, countryList } from '@/utils/country-list';
import { countryActions } from '@/store/actions/country';
import useInput from './common/hooks/useInput';
import useFocusInput from './common/hooks/useFocusInput';
import useLanguage from './common/hooks/useLanguage';
import useWindowScrollBlock from './common/hooks/useWindowScrollBlock';
import BackIcon from './common/icons/BackIcon';
import SearchIcon from './common/icons/SearchIcon';
import useToggle, { HandleToggle } from './common/hooks/useToggle';
import CloseIcon from './common/icons/CloseIcon';

interface Props {
  setIsModalFlag: HandleToggle;
}

const SearchFlag: React.FC<Props> = ({ setIsModalFlag }) => {
  const [searchValue, setSearch] = useInput();
  const [isFocus, setIsFocus] = useToggle();
  const [inputRef, focusInput] = useFocusInput();
  const listWrapper = useRef<HTMLDivElement>(null);
  const [{ catalog: catalogLan, common }] = useLanguage();

  const dispatch = useDispatch();

  useWindowScrollBlock();

  const clearSearch = () => {
    setSearch('');
    setIsFocus(false);
    inputRef.current!.blur();
  };

  const focus = (status: boolean) => () => {
    setIsFocus(status);
    focusInput();
  };

  const searchItems = search(countryList, searchValue, ({ country }) => country);

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

  const changeCountry = (iso: string) => () => {
    const selectedCountry = countryList.find((country) => country.iso === iso)!;

    dispatch(countryActions.changeCountry(selectedCountry));

    setIsModalFlag(false);
  };

  return (
    <SearchWrap heigth={window.innerHeight}>
      <Header>
        <HeaderWrap>
          {(searchValue || isFocus) ? (
            <TopButton onClick={clearSearch}>
              <BackIcon />
            </TopButton>
          ) : (
            <PlusButton onClick={setIsModalFlag}>
              <CloseIcon />
            </PlusButton>
          )}
          {(!isFocus && !searchValue) && (
            <CountryText onClick={focus(true)}>{common.country}</CountryText>
          )}
          <SearchItem
            onClick={focusInput}
            type="text"
            value={searchValue}
            onChange={setSearch}
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="on"
          />
          <TopButton className="buyer auth phone-number country-search" onClick={focus(true)}>
            <SearchIcon />
          </TopButton>
        </HeaderWrap>
      </Header>
      <Empty />
      <ItemsContainer ref={listWrapper} heigth={window.innerHeight}>
        {searchItems.length > 0 ? (
          <>
            {searchItems.map((country) => (
              <Item
                key={`${country.code}${country.country}`}
                changeCountry={changeCountry}
                {...country}
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
        )}
      </ItemsContainer>
    </SearchWrap>
  );
};

interface ItemProps extends CountryFromList {
  changeCountry: (iso: string) => () => void;
}

const Item: React.FC<ItemProps> = ({
  changeCountry,
  country,
  code,
  iso,
}) => (
  <CountryWrap className="buyer auth phone-number country-select" onClick={changeCountry(iso)}>
    <Country>{country}</Country>
    <CountryCode>{`+${code}`}</CountryCode>
  </CountryWrap>
);

const CountryText = styled.div`
  z-index: 2;
  grid-area: input / input / input / input;
  padding: 0px 24px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: rgb(33, 39, 46);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CountryWrap = styled.div`
  max-height: 48px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Country = styled.div`
  color: rgb(33, 39, 46);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.36;
`;

const CountryCode = styled.div`
  color: rgb(144, 149, 153);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.36;
`;

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
  padding: 16px 16px 10px;
  height: ${({ heigth }) => heigth && `calc(${heigth}px - 72px)`};
  overflow-y: auto;
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

const TopButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const PlusButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  align-items: center;
  padding: 24px;
  flex-grow: 3;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  grid-template-areas: "left input right";
  align-items: center;
`;

export default SearchFlag;
