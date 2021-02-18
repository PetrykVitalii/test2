import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';

import PhoneInput from '@/components/PhoneInput';
import useToggle from '@/components/common/hooks/useToggle';
import SearchFlag from '@/components/SearchFlag';
import Button from '@/components/Button';
import BackIcon from '@/components/common/icons/BackIcon';
import { countryActions, detectCountry } from '@/store/actions/country';
import { selectIsLoading } from '@/store/selectors/auth';
import { selectIsLoadingQuote } from '@/store/selectors/quote';
import { selectCountry } from '@/store/selectors/country';
import { CountryFromList, countryList } from '@/utils/country-list';
import usePrevious from '@/components/common/hooks/usePrevious';
import {
  authActions, sendPhoneNumber, sendSecretPhone,
} from '@/store/actions/auth';
import useInput, { ChangeEvent } from '@/components/common/hooks/useInput';
import { getUserInfoByPhone, userActions } from '@/store/actions/user';
import LocalStorage from '@/utils/local-storage';
import useLanguage from '@/components/common/hooks/useLanguage';
import { selectPhoneNumber, selectUserIsLoading } from '@/store/selectors/user';
import { selectCatalog } from '@/store/selectors/catalog';
import { sendQuote } from '@/store/actions/quote';
import reviewPage from '@/utils/reviewPage';

interface Props extends RouteComponentProps<{catalogId: string}> {}

const SignUp: React.FC<Props> = ({ history, match, location }) => {
  const { catalogId } = match.params;
  const query = location.search;
  const [isModalFlag, setIsModalFlag] = useToggle();
  const country = useSelector(selectCountry);
  const IsLoading = useSelector(selectIsLoading);
  const IsLoadingUser = useSelector(selectUserIsLoading);
  const isLoadingQuote = useSelector(selectIsLoadingQuote);
  const phone = useSelector(selectPhoneNumber);
  const { phone: sellerPhone } = useSelector(selectCatalog);
  const prevSelectedCountry = usePrevious(country);
  const [phoneNumber, setPhoneNumber] = useInput();
  const [isPhoneError, toggleIsPhoneError] = useToggle();
  const [{ order, common }] = useLanguage();
  const [isFocus, setIsFocus] = useToggle();

  const dispatch = useDispatch();

  useEffect(() => {
    const localPhone = phone;

    if (localPhone && localPhone!.length > 0) {
      const localCountry = countryList.find((contry) => localPhone.startsWith(contry.code));
      if (localCountry) {
        dispatch(countryActions.changeCountry(localCountry));
        setPhoneNumber(numberToString(localPhone, localCountry));
      }
    } else if (!phoneNumber) {
      dispatch(detectCountry());
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const changePhone = (event: ChangeEvent | string) => {
    setPhoneNumber(event);
    toggleIsPhoneError(false);
  };

  const removeUnDigital = (str: string) => str.replace(/\D|\s/g, '');
  const numberToString = (str: string, localCountry: CountryFromList) => str.replace(`${localCountry.code}`, `+${localCountry.code} `);

  const next = () => {
    const { code } = country!;
    let digitalPhone = removeUnDigital(phoneNumber);

    digitalPhone = digitalPhone.startsWith(code) ? digitalPhone : code + digitalPhone;

    if (!isValidPhoneNumber(`+${digitalPhone}`)) {
      toggleIsPhoneError(true);

      if (!phoneNumber) {
        dispatch(authActions.setErrMsg(order.phone_error_required));
      } else {
        dispatch(authActions.setErrMsg(order.phone_error_invalid));
      }

      return;
    }

    const digitalPhoneNumber = parsePhoneNumber(`+${digitalPhone}`);

    if (digitalPhoneNumber && digitalPhoneNumber.number) {
      dispatch(userActions.changeInfo('phoneNumber', (digitalPhoneNumber.number).slice(1)));
    } else {
      dispatch(userActions.changeInfo('phoneNumber', digitalPhone));
    }

    if (
      digitalPhoneNumber
      && digitalPhoneNumber.number.slice(1) === LocalStorage.getPhoneNumber()
    ) {
      window.dataLayer.push({
        event: 'agoraBuyerPhoneNumberAuthSubmit',
        formName: 'Agora Buyer Phone Number Auth Submit',
      });
      if (query === '?quote') {
        dispatch(sendQuote(catalogId));
      } else {
        const path = reviewPage(catalogId, query);
        dispatch(getUserInfoByPhone(path));
      }
    } else if (digitalPhoneNumber && digitalPhoneNumber.number.slice(1) === sellerPhone) {
      dispatch(sendSecretPhone(catalogId, query));
    } else {
      dispatch(sendPhoneNumber(catalogId, query));
    }
  };

  if (isModalFlag) {
    return <SearchFlag setIsModalFlag={setIsModalFlag} />;
  }

  const handleOnFocus = () => setIsFocus(true);
  const handleOnBlur = () => setTimeout(() => setIsFocus(false), 0);

  return (
    <WrapSignUp>
      <BackWrap onClick={history.goBack}>
        <BackIcon />
      </BackWrap>
      <Title>{order.phone_label}</Title>
      <SubText>{order.phone_sub_text}</SubText>
      <PhoneInput
        setIsModalFlag={setIsModalFlag}
        phoneNumber={phoneNumber}
        onChange={changePhone}
        prevSelectedCountry={prevSelectedCountry}
        isError={isPhoneError}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <WrapButton isFixed={!isFocus}>
        <Button classTracking="buyer auth phone-number cta-continue" isLoading={IsLoading || isLoadingQuote || IsLoadingUser} onClick={next}>
          {common.btn_continue}
        </Button>
      </WrapButton>
    </WrapSignUp>
  );
};

const BackWrap = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.div`
  max-width: 327px;
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin: 32px 0 16px;
`;

const SubText = styled.div`
  max-width: 263px;
  margin-bottom: 47px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const WrapButton = styled.div<{ isFixed: boolean }>`
  position: ${({ isFixed }) => isFixed && 'fixed'};
  margin-top: ${({ isFixed }) => !isFixed && 'auto'};
  margin-bottom: ${({ isFixed }) => !isFixed && '24px'};
  bottom: ${({ isFixed }) => isFixed && '24px'};
  max-width: 504px;
  width: ${({ isFixed }) => (isFixed ? 'calc(100% - 48px)' : '100%')};
  padding-top: 80px;
`;

const WrapSignUp = styled.div`
  padding: 32px 24px 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
`;

export default SignUp;
