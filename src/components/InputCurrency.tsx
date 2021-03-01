/* eslint-disable no-nested-ternary */
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { selectCurrency } from '@/store/selectors/user';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: any;
  classTracking?: string;
  label?: string;
  isThin?: boolean;
}

const InputCurrency: React.FC<Props> = ({
  isThin = false,
  placeholder,
  onChange,
  classTracking = '',
  value,
  label,
  onBlur,
  onFocus,
}) => {
  const currency = useSelector(selectCurrency);
  const [isVisibleLable, setIsVisibleLable] = useState(
    !((value !== null && value!.toString().length > 0)),
  );

  const dic = '0123456789.,';

  const onKeyPress = (e: ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;
    if (!dic.includes(key)) {
      e.preventDefault();
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement> | string) => {
    const { target } = e as ChangeEvent<HTMLInputElement>;

    onChange(target.value);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | string) => {
    inputHandler(e);
  };

  useEffect(() => {
    setIsVisibleLable(!!value);
  }, [value]);

  return (
    <InputWrapper isThin={isThin}>
      {label && <LabelHeader>{label}</LabelHeader>}
      <Label
        isThin={isThin}
        isVisibleLable={isVisibleLable}
      >
        {currency}
      </Label>
      <StyledInput
        isThin={isThin}
        className={classTracking}
        type="number"
        value={value}
        pattern="\d*"
        inputMode="decimal"
        placeholder={placeholder}
        onChange={onChangeHandler}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{isThin: boolean}>`
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid #dae1e8;
  border-radius: 8px;
  line-height: normal;
  position: relative;
  padding: ${({ isThin }) => isThin && '10px 13px'};
  height: ${({ isThin }) => !isThin && '56px'};

  &:focus-within {
    border-color: #3897ff;
  }
`;

const StyledInput = styled.input<{isThin: boolean}>`
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px;
  font-size: ${({ isThin }) => isThin ? '12px' : '14px'};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #21272e;
  width: 100%;
  line-height: normal;

  &::placeholder{
    font-size: ${({ isThin }) => isThin ? '12px' : '14px'};
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #b4babf;
  }
`;

const Label = styled.div<{ isVisibleLable: boolean; isThin: boolean }>`
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px;
  font-size: ${({ isThin }) => isThin ? '12px' : '14px'};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-right: 5px;
  line-height: normal;
  display: ${({ isVisibleLable }) => isVisibleLable ? 'block' : 'none'};
`;

const LabelHeader = styled.div`
  font-size: 12.5px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  top: -12px;
  left: 10px;
  padding: 0 2px 0 6px;
  position: absolute;
  background-color: white;
  white-space: nowrap;
`;

export default InputCurrency;
