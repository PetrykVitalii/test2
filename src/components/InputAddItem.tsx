/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Item as InterfaceItem } from '@/store/reducers/items';
import formatInput from '@/utils/formatInput';

import WarningIcon from '@/components/common/icons/auth/WarningIcon';
import { useSelector } from 'react-redux';
import { selectCurrency } from '@/store/selectors/user';

interface Props {
  label?: string;
  pattern?: string;
  errorMsg?: string;
  isError?: boolean;
  onChange: (key: keyof Pick<InterfaceItem, 'name' | 'customUnit' | 'price'>) => (v: string) => void;
  onClick?: () => void;
  icon?: string | null;
  color?: string;
  isFocus?: boolean;
  placeText?: boolean;
  autocapitalize?: string;
  index?: number;
  setInputFocus?: (value: boolean) => void;
  isCurrency?: boolean;
  autofocus?: boolean;
  changeInfoName: keyof Pick<InterfaceItem, 'name' | 'customUnit' | 'price'>;
  positionCursor?: number;
  inputMode?: any;
  type?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input: React.FC<Props> = ({
  isCurrency = false,
  type = 'text',
  label = '',
  errorMsg = '',
  isError = false,
  disabled,
  placeholder,
  onChange,
  onClick,
  value,
  readOnly = false,
  color,
  placeText = false,
  autocapitalize = 'on',
  pattern,
  index = 0,
  inputMode,
  onFocus,
  onBlur,
  isFocus = false,
  autofocus = false,
  changeInfoName,
  positionCursor = 0,
}) => {
  const currency = useSelector(selectCurrency);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const lableRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<number>(positionCursor);
  const [widthLable, setWidthLable] = useState(16);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e as React.ChangeEvent<HTMLInputElement>;

    if (inputRef.current && type === 'text') {
      setCursor(target.selectionStart!);
    }

    onChange(changeInfoName)(formatInput(target.value));
  };

  useEffect(() => {
    if (inputRef.current && type === 'text') {
      inputRef.current.setSelectionRange(cursor, cursor);
    }
  }, [value]);

  useEffect(() => {
    if (lableRef.current) {
      setWidthLable(lableRef.current.offsetWidth);
    }
  }, [lableRef.current]);

  return (
    <InputWrapper>
      {isError && (
        <Icon>
          <WarningIcon />
        </Icon>
      )}
      {label && (
        <Label
          placeText={placeText}
          textLabel={value}
          htmlFor={label + index}
          isFocus={isFocus}
          isError={isError}
        >
          {label}
        </Label>
      )}
      <StyledInput
        onClick={onClick}
        pattern={pattern}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        isError={isError}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        readOnly={readOnly}
        color={color}
        id={label + index}
        isLabel={!label}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize={autocapitalize}
        isCurrency={isCurrency}
        inputMode={inputMode}
        autoFocus={autofocus}
        width={+widthLable + 18}
      />
      {isError && <Error>{errorMsg}</Error>}
      {isCurrency && (
        <Currency isValue={!!value || isFocus} ref={lableRef}>
          {currency}
          &nbsp;
        </Currency>
      )}
    </InputWrapper>
  );
};

const Currency = styled.div<{ isValue: boolean }>`
  position: absolute;
  top: 25px;
  left: 16px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
  opacity: ${({ isValue }) => isValue ? '1' : '0'};
`;

const InputWrapper = styled.div`
  position: relative;
  min-height: 56px;
  width: 100%;
`;

const StyledInput = styled.input<{
  isCurrency: boolean;
  isError: boolean;
  color?: string;
  isLabel: boolean;
  width: number;
}>`
  width: 100%;
  height: 56px;
  padding: ${({ isLabel }) => isLabel ? '18px 14px 16px 19px' : '26px 16px 11px 16px'};
  border: none;
  border-bottom: ${({ isError }) => (isError ? '2px solid #feaa22' : '2px solid transparent')};
  border-radius: 8px 8px 0 0;
  color: ${({ color }) => color || '#21272e'};
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 1px 2px 0 rgba(120, 124, 128, 0.27);
  background-color: #ffffff;
  caret-color: #f43939;
  padding-left: ${({ isCurrency, width }) => isCurrency ? `${width}px` : '16px'};
  :focus {
    outline: none;
    border-bottom: ${({ isError }) => (isError ? '2px solid #feaa22' : '2px solid #3897ff')};
  }
  ::placeholder {
    font-weight: 500;
    color: #909599;
  }
`;

const Icon = styled.span`
  position: absolute;
  display: inline-block;
  width: 24px;
  height: 24px;
  right: 15px;
  top: 18px;
`;

const Error = styled.div`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

const Label = styled.label<{ isFocus: boolean; isError: boolean; placeText: boolean; textLabel: any }>`
  position: absolute;
  left: ${({ placeText, isFocus, textLabel }) => (textLabel || isFocus) ? '16px' : placeText ? '18px' : '16px'};
  top: ${({ placeText, isFocus, textLabel }) => (textLabel || isFocus) ? '7px' : placeText ? '18px' : '7px'};
  font-size: ${({ placeText, isFocus, textLabel }) => (textLabel || isFocus) ? '12px' : placeText ? '14px' : '12px'};
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  white-space: nowrap;
  letter-spacing: normal;
  color: ${({ isFocus }) => isFocus ? '#3897ff' : '#909599'};
  color: ${({ isError }) => isError && '#feaa22'};
`;

export default Input;
