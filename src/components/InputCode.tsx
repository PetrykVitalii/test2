import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: any;
  classTracking?: string;
  label?: string;
  isThin?: boolean;
  isFocus: boolean;
  style?: { [key: string]: string };
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
  disabled,
  isFocus,
  style = {},
}) => {
  const inputHandler = (e: ChangeEvent<HTMLInputElement> | string) => {
    const { target } = e as ChangeEvent<HTMLInputElement>;

    onChange(target.value);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | string) => {
    inputHandler(e);
  };

  return (
    <InputWrapper isThin={isThin} style={style}>
      {label && <LabelHeader>{label}</LabelHeader>}
      <Label
        isVisibleLable={isFocus || value!.toString().length > 0}
      >
        #
      </Label>
      <StyledInput
        isThin={isThin}
        className={classTracking}
        type="text"
        value={value}
        placeholder={isFocus ? '' : placeholder}
        disabled={disabled}
        onChange={onChangeHandler}
        onBlur={onBlur}
        onFocus={onFocus}
        autoCapitalize="characters"
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

const Label = styled.div<{ isVisibleLable: boolean }>`
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #21272e;
  /* margin-right: 5px; */
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
