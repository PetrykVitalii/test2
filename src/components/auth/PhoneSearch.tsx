import React, {
  useState, Dispatch, SetStateAction, useEffect, useRef,
} from 'react';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import useInput from '@/components/common/hooks/useInput';
import useFocusInput from '@/components/common/hooks/useFocusInput';

import search from '@/utils/search';
import { CountryFromList } from '@/components/common/country-list';
import SearchIcon from '@/components/common/icons/SearchIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import FixedHeader from '@/components/FixedHeader';

interface Props {
  handlerCloseSearch: () => void;
  countryList: CountryFromList[];
  setCountry: Dispatch<SetStateAction<CountryFromList | undefined>>;
}

const PhoneSearch: React.FC<Props> = ({ handlerCloseSearch, setCountry, countryList }) => {
  const [{ authorization }] = useLanguage();
  const [countryInputValue, setCountryValue] = useInput();
  const [isFocused, setIsFocused] = useState(false);
  const [inputRef, focusInput] = useFocusInput();

  const listWrapper = useRef<HTMLDivElement>(null);

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
    setIsFocused(false);
    inputRef.current!.blur();
  };

  const changeCountry = (iso: string) => () => {
    const selectedCountry = countryList.find((country) => country.iso === iso)!;

    setCountryValue(selectedCountry.country);
    setCountry(selectedCountry);

    handlerCloseSearch();
  };

  const handlerFocusInput = () => {
    focusInput();
    setIsFocused(true);
  };

  const handlerUnFocusInput = () => {
    setCountryValue('');
    setIsFocused(false);
  };

  const filteredCountry = search(countryList, countryInputValue, ({ country }) => country);

  return (
    <Main>
      <FixedHeader>
        <Container>
          {isFocused ? (
            <IconBack onClick={handlerUnFocusInput}>
              <BackIcon />
            </IconBack>
          ) : (
            <IconClose onClick={handlerCloseSearch} />
          )}
          {!isFocused && !countryInputValue && (
            <TextCountry onClick={handlerFocusInput}>{authorization.country_label}</TextCountry>
          )}
          <Input
            onChange={setCountryValue}
            value={countryInputValue}
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
          />
          <IconSearch className="onboarding phone-number country-search" onClick={handlerFocusInput}>
            <SearchIcon />
          </IconSearch>
        </Container>
      </FixedHeader>
      <ListWrapper ref={listWrapper}>
        {filteredCountry.map((item, i) => (
          <Item key={i} changeCountry={changeCountry} {...item} />
        ))}
      </ListWrapper>
    </Main>
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
  <ItemWrapper className="onboarding phone-number country-select" onClick={changeCountry(iso)}>
    <CountryWrap>{country}</CountryWrap>
    <Code>{`+${code}`}</Code>
  </ItemWrapper>
);

const Main = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
  padding: 0 24px;
  flex-grow: 3;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  grid-template-areas: 'left input right';
  align-items: center;
`;

const TextCountry = styled.div`
  z-index: 2;
  grid-area: input;
  height: 30px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 0 24px;
  height: 30px;
  grid-area: input;
  font-weight: bold;
  line-height: 1.5;
  font-size: 16px;

  :focus {
    outline: none;
  }
`;

const IconSearch = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  grid-area: right;
  cursor: pointer;
`;

const IconBack = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  grid-area: left;
  cursor: pointer;
`;

const IconClose = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 2px;
  grid-area: left;
  cursor: pointer;

  :before,
  :after {
    position: absolute;
    content: '';
    height: 20px;
    width: 2px;
    background: #21272e;
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }
`;

const ListWrapper = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 73px);
  scroll-behavior: smooth;
`;

const ItemWrapper = styled.div`
  min-height: 48px;
  height: 48px;
  max-height: 48px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const CountryWrap = styled.p`
  color: #21272e;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.36;
`;

const Code = styled.p`
  color: #909599;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.36;
`;

export default PhoneSearch;
