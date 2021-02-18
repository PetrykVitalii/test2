import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectCountry } from '@/store/selectors/country';
import { CountryFromList } from '@/utils/country-list';
import { selectErrMsg } from '@/store/selectors/auth';
import { HandleToggle } from './common/hooks/useToggle';
import LazyFlag from './LazyFlags';
import PhoneIcon from './common/icons/PhoneIcon';
import WarningIcon from './common/icons/WarningIcon';
import { OnChange } from './common/hooks/useInput';
import useLanguage from './common/hooks/useLanguage';

interface Props {
  setIsModalFlag: HandleToggle;
  prevSelectedCountry: CountryFromList;
  phoneNumber: string;
  onChange: OnChange;
  isError: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const PhoneInput: React.FC<Props> = ({
  setIsModalFlag,
  prevSelectedCountry,
  phoneNumber,
  onChange,
  isError,
  onFocus,
  onBlur,
}) => {
  const country = useSelector(selectCountry);
  const errMsg = useSelector(selectErrMsg);
  const [{ order }] = useLanguage();

  useEffect(() => {
    if (prevSelectedCountry && prevSelectedCountry.code && phoneNumber) {
      onChange(phoneNumber.replace(`+${prevSelectedCountry.code}`, `+${country.code}`));
    } else if (!phoneNumber && prevSelectedCountry && prevSelectedCountry.code) {
      onChange(`+${country.code} `);
    }
  }, [country]);

  const setCodeToNumber = () => {
    if (onFocus) {
      onFocus();
    }
    if (!phoneNumber) {
      onChange(`+${country.code} `);
    }
  };

  return (
    <>
      <InputWrapper>
        <ButtonFlag className="buyer auth phone-number country-flag" onClick={setIsModalFlag}>
          <LazyFlag src={country.src} />
        </ButtonFlag>
        <Wraper>
          <Wraper>
            <IconWrap>{isError ? <WarningIcon /> : <PhoneIcon />}</IconWrap>
            <Input
              value={phoneNumber}
              onChange={onChange}
              onFocus={setCodeToNumber}
              type="tel"
              pattern="\+[0-9]{1,4}\s{1}[0-9]*"
              placeholder={order.phone_placeholder}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="off"
              isError={isError}
              onBlur={onBlur}
            />
          </Wraper>
          {isError && <Error>{errMsg}</Error>}
        </Wraper>
      </InputWrapper>
    </>
  );
};

const Wraper = styled.div`
  position: relative;
  width: 100%;
`;

const Error = styled.div`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

const IconWrap = styled.div`
  position: absolute;
  display: inline-block;
  width: 24px;
  height: 24px;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
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

const Input = styled.input<{isError: boolean}>`
  border-radius: 8px;
  border: ${({ isError }) => (isError ? 'solid 1px rgb(254, 170, 34)' : 'solid 1px #dae1e8')};
  background-color: #ffffff;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  padding-left: 16px;
  height: 56px;
  &::placeholder{
    color: #b4babf;
  };
  &:focus{
    outline: none;
    border: ${({ isError }) => (isError ? 'solid 1px rgb(254, 170, 34)' : '1px solid rgb(56, 151, 255)')};
  };
`;

export default PhoneInput;
