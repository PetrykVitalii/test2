import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';

import { sendPhoneNumber, authActions } from '@/store/actions/auth';
import {
  selectIsLoading,
  selectErrMsg,
  selectIsError,
} from '@/store/selectors/auth';
import { countryList, CountryFromList } from '@/components/common/country-list';
import { OnChange } from '@/components/common/hooks/useInput';
import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import usePrevious from '@/components/common/hooks/usePrevious';
import useKeyPress from '@/components/common/hooks/useKeyPress';

import Button from '@/components/Button';
import Input from '@/components/Input';
import PhoneSearch from '@/components/auth/PhoneSearch';
import SellSmarterIcon from '@/components/common/icons/auth/SaleSmarter';
import LazyFlag from '@/components/auth/LazyFlag';
import LnSwitcher from '@/components/auth/LnSwitcher';
import PhoneIcon from '@/components/common/icons/auth/PhoneIcon';
import LoaderDots from '@/components/common/LoaderDots';
import ButtonWrap from '@/components/common/ButtonWrap';
import MyToast from '../Toast';

interface Props {
  phone: string;
  setPhone: OnChange;
  setPhoneForApi: Dispatch<SetStateAction<string>>;
  isCountryLoading: boolean;
  selectedCountry?: CountryFromList;
  setSelectedCountry: Dispatch<SetStateAction<CountryFromList | undefined>>;
}

const Phone: React.FC<Props> = ({
  phone,
  setPhone,
  setPhoneForApi,
  isCountryLoading,
  selectedCountry,
  setSelectedCountry,
}) => {
  const [{ authorization }] = useLanguage();
  const [isPhoneError, toggleIsPhoneError] = useToggle();
  const [isPhoneSearchOpen, setIsPhoneSearchOpen] = useToggle();
  const [isFocus, setIsFocus] = useToggle();
  const [isToast, setIsToast] = useToggle();

  const isLoading = useSelector(selectIsLoading);
  const errMsg = useSelector(selectErrMsg);
  const isError = useSelector(selectIsError);

  const prevSelectedCountry = usePrevious(selectedCountry);
  const inputRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();

  const enterPress = useKeyPress('Enter');

  useEffect(() => {
    if (enterPress) {
      nextStepHandler();
    }
  }, [enterPress]);

  useEffect(() => {
    let timer: number;

    if (isToast) {
      timer = setTimeout(() => {
        setIsToast(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [isToast]);

  useEffect(() => {
    if (!prevSelectedCountry || !phone) {
      return;
    }

    const { code: prevCode } = prevSelectedCountry!;
    const { code } = selectedCountry!;

    const updatedPhone = phone.replace(`+${prevCode}`, `+${code}`);
    setPhone(updatedPhone);
  }, [selectedCountry]);

  const handlerPhone = (value: string) => {
    toggleIsPhoneError(false);
    dispatch(authActions.setIsErrorInactive());
    setPhone(value);
  };

  const handleFocus = () => {
    const { code } = selectedCountry!;

    setIsFocus(true);

    if (phone?.trim()) {
      return;
    }

    const countryCode = `+${code} `;
    setPhone(countryCode);
    setTimeout(() => {
      inputRef.current!.setSelectionRange(countryCode.length, countryCode.length);
    }, 0);
  };

  const handlerOpenSearch = () => setIsPhoneSearchOpen(true);
  const handlerCloseSearch = () => setIsPhoneSearchOpen(false);

  const removeUnDigital = (str: string) => str.replace(/\D|\s/g, '');

  const onBlurPhone = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 0);
  };

  const nextStepHandler = () => {
    if (!navigator.onLine) {
      setIsToast(true);
      return;
    }

    const { code } = selectedCountry!;
    let digitalPhone = removeUnDigital(phone);

    digitalPhone = digitalPhone.startsWith(code) ? digitalPhone : code + digitalPhone;

    if (!isValidPhoneNumber(`+${digitalPhone}`)) {
      toggleIsPhoneError(true);
      dispatch(authActions.setIsErrorActive());

      if (!phone) {
        dispatch(authActions.setErrMsg(authorization.phone_error_required));
      } else {
        dispatch(authActions.setErrMsg(authorization.phone_error_invalid));
      }

      return;
    }

    const phoneNumber = parsePhoneNumber(`+${digitalPhone}`);

    if (phoneNumber && phoneNumber.number) {
      setPhoneForApi((phoneNumber.number).slice(1));
      dispatch(sendPhoneNumber((phoneNumber.number).slice(1)));
    } else {
      setPhoneForApi(digitalPhone);
      dispatch(sendPhoneNumber(digitalPhone));
    }
  };

  if (isPhoneSearchOpen) {
    return (
      <PhoneSearch
        handlerCloseSearch={handlerCloseSearch}
        countryList={countryList}
        setCountry={setSelectedCountry}
      />
    );
  }

  return (
    <PhoneStyled>
      <MyToast
        isActive={isToast}
        text={authorization.no_internet_connection}
        style={{
          maxWidth: '520px',
          width: 'calc(100% - 48px)',
          top: 25,
          position: 'fixed',
          backgroundColor: '#21272e',
          zIndex: 50,
        }}
        autoClose={1000}
      />
      <Header>
        <SellSmarterIcon />
        <LnSwitcher />
      </Header>
      <Container>
        <Title>{authorization.welcome_header}</Title>

        <SectionNumber isFixed={isFocus}>
          <TitleNumber>{authorization.phone_label}</TitleNumber>
          <InputWrapper>
            <ButtonFlag className="onboarding phone-number country-flag " onClick={handlerOpenSearch}>
              <LazyFlag isLoading={isCountryLoading} src={selectedCountry?.src} />
            </ButtonFlag>
            <Input
              type="tel"
              pattern="\+[0-9]{1,4}\s{1}[0-9]*"
              placeholder={authorization.phone_placeholder}
              onChange={handlerPhone}
              onFocus={handleFocus}
              onBlur={onBlurPhone}
              value={phone}
              iconComponent={<PhoneIcon />}
              errorMsg={errMsg}
              isError={isPhoneError || isError}
              positionCursor={5}
            />
          </InputWrapper>
        </SectionNumber>

        <ButtonWrap
          isFixed={!isFocus}
          maxWidth={504}
          paddingWidth={48}
          height={76}
        >
          <Button classTracking="onboarding phone-number cta-continue" shadow isLoading={isLoading} onClick={nextStepHandler}>
            {isLoading ? <LoaderDots /> : authorization.btn_continue}
          </Button>
        </ButtonWrap>
      </Container>
    </PhoneStyled>
  );
};

const PhoneStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 24px 26px 12px;
`;

const Container = styled.div`
  padding: 0 24px;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const SectionNumber = styled.section<{ isFixed: boolean }>`
  padding-top: 48px;
  margin-bottom: ${({ isFixed }) => isFixed && '80px'};
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const TitleNumber = styled.h3`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  text-transform: uppercase;
`;

const InputWrapper = styled.div`
  display: flex;
  padding-top: 21px;
`;

const ButtonFlag = styled.div`
  width: 56px;
  height: 56px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  border: 1px solid #dae1e8;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export default Phone;
