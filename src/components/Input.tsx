/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import formatInput from '@/utils/formatInput';

import { OnChange } from '@/components/common/hooks/useInput';
import WarningIcon from '@/components/common/icons/auth/WarningIcon';

interface Props {
  label?: string;
  errorMsg?: string;
  isError?: boolean;
  onChange: (value: string) => void | OnChange;
  onClick?: () => void;
  icon?: string | null;
  color?: string;
  iconComponent?: React.ReactNode;
  classTracking?: string;
  isBorder?: boolean;
  autocapitalize?: string;
  positionCursor?: number;
  pattern?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input: React.FC<Props> = ({
  pattern,
  type = 'text',
  label,
  errorMsg = '',
  isError = false,
  disabled,
  placeholder,
  onChange,
  onClick,
  value = '',
  readOnly = false,
  color,
  onFocus,
  onBlur,
  iconComponent,
  classTracking = '',
  isBorder = true,
  autocapitalize = 'on',
  positionCursor = 0,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [cursor, setCursor] = useState<number>(positionCursor);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e as React.ChangeEvent<HTMLInputElement>;

    setCursor(target.selectionStart!);
    onChange(formatInput(target.value));
  };

  useEffect(() => {
    inputRef.current?.setSelectionRange(cursor, cursor);
  }, [value]);

  return (
    <InputWrapper
      isBorder={isBorder}
    >
      {isError && iconComponent ? (
        <Icon isError={isError}>
          <WarningIcon />
        </Icon>
      ) : (
        iconComponent && <Icon isError={isError}>{iconComponent}</Icon>
      )}
      <StyledInput
        className={classTracking}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        disabled={disabled}
        type={type}
        isError={isError}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        readOnly={readOnly}
        color={color}
        pattern={pattern}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize={autocapitalize}
        isStatus={value.toString().length > 0}
        isBorder={isBorder}
      />
      {label && <Label>{label}</Label>}
      {isError && <Error>{errorMsg}</Error>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ isBorder: boolean }>`
  position: relative;
  min-height: 56px;
  width: 100%;

  ${({ isBorder }) => !isBorder && css`
    border: 1px solid #dae1e8;
    border-radius: 8px;
    display: flex;
    align-items: center;
  `};
`;

const StyledInput = styled.input<{isError: boolean;color?: string;isStatus: boolean;isBorder: boolean}>`
  width: 100%;
  height: 56px;
  padding: 18px 16px;
  border: ${({ isError, isBorder }) => isBorder ? (isError ? '1px solid #feaa22' : '1px solid #dae1e8') : 'none'};
  border-radius: 8px;
  color: ${({ color }) => color || '#21272e'};
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  padding-left: '16px';

  :focus {
    outline: none;
    border: ${({ isError }) => isError ? '1px solid #feaa22' : '1px solid #3897ff'};
  }

  ::placeholder {
    font-weight: 500;
    color: #909599;
    line-height: normal;
  }
`;

const Icon = styled.div<{ isError: boolean }>`
  position: absolute;
  display: inline-block;
  width: 24px;
  height: 24px;
  right: 15px;
  top: ${({ isError }) => isError ? '23%' : '50%'};
  transform: ${({ isError }) => isError ? 'translateY(0%)' : 'translateY(-50%)'};
`;

const Error = styled.div`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

const Label = styled.div`
  padding: 0 5px;
  background-color: #fff;
  position: absolute;
  top: -10px;
  left: 11px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  color: #21272e;
`;

export default Input;
