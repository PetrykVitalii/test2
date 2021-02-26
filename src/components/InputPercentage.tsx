/* eslint-disable no-nested-ternary */
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: any;
  classTracking?: string;
  label?: string;
  isThin?: boolean;
  isError?: boolean;
  errorMsg?: string;
}

const InputPercentage: React.FC<Props> = ({
  isThin = false,
  isError = false,
  errorMsg = '',
  placeholder,
  onChange,
  classTracking = '',
  value,
  label,
  onBlur,
  onFocus,
}) => {
  const [isVisibleLabel, setIsVisibleLabel] = useState(
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
    setIsVisibleLabel(!!value);
  }, [value]);

  return (
    <InputWrapper>
      <BorderWrapper isError={isError} isThin={isThin}>
        {label && <LabelHeader>{label}</LabelHeader>}
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
        <Label
          isThin={isThin}
          isVisibleLabel={isVisibleLabel}
        >
          %
        </Label>
      </BorderWrapper>
      {isError && <Error>{errorMsg}</Error>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BorderWrapper = styled.div<{isError: boolean; isThin: boolean}>`
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  border: ${({ isError }) => isError ? '1px solid #feaa22' : '1px solid #dae1e8'};
  border-radius: 8px;
  line-height: normal;
  position: relative;
  padding: ${({ isThin }) => isThin && '10px 13px'};
  height: ${({ isThin }) => !isThin && '56px'};
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

const Label = styled.div<{ isVisibleLabel: boolean; isThin: boolean }>`
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px;
  font-size: ${({ isThin }) => isThin ? '12px' : '14px'};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${({ isVisibleLabel }) => isVisibleLabel ? '#21272e' : '#b4babf'}; #;
  margin-right: 5px;
  line-height: normal;
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

const Error = styled.div`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

export default InputPercentage;
