import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { OnChange } from '@/components/common/hooks/useInput';
import { userActions } from '@/store/actions/user';
import formatInput from '@/utils/formatInput';
import { User } from '@/store/reducers/user';
import { HandleToggle } from './common/hooks/useToggle';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: OnChange;
  label: string;
  type?: string;
  isError?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  setIsFocus?: HandleToggle;
  pattern?: string;
  classTracking?: string;
  maxlength?: number;
  keyStr: keyof User;
}

const InputBorder: React.FC<InputProps> = ({
  label,
  value = '',
  placeholder = '',
  type = 'text',
  isError = false,
  errorMsg = '',
  disabled = false,
  setIsFocus,
  pattern,
  classTracking = '',
  maxlength = 250,
  keyStr,
}) => {
  const [cursor, setCursor] = useState<number>(0);
  const refInput = React.useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    refInput.current?.setSelectionRange(cursor, cursor);
  }, [value]);

  const focus = () => {
    if (setIsFocus) {
      setIsFocus(true);
    }
  };

  const blur = () => {
    if (setIsFocus) {
      setIsFocus(false);
    }
  };

  const changeInfo = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
  ) => {
    const { target } = e as ChangeEvent<HTMLInputElement>;
    const { value: valueInput } = target;
    setCursor(target.selectionStart!);

    dispatch(userActions.changeInfo(keyStr, formatInput(valueInput)));
  };

  return (
    <Wrap>
      <CodeBorder>{label}</CodeBorder>
      <Input
        ref={refInput}
        className={classTracking}
        pattern={pattern}
        isError={isError}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeInfo}
        disabled={disabled}
        onFocus={focus}
        onBlur={blur}
        isStatus={value.toString().length > 0}
        // autoCapitalize="words"
        autoCorrect="off"
        spellCheck="false"
        maxLength={maxlength}
      />
      {isError && <Error>{errorMsg}</Error>}
    </Wrap>
  );
};

const Error = styled.div`
  color: #feaa22;
  position: absolute;
  bottom: -15px;
  left: 16px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

const Wrap = styled.div`
  position: relative;
`;

const CodeBorder = styled.span`
  font-size: 12.5px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  top: -2px;
  left: 10px;
  padding: 0 2px 0 6px;
  position: absolute;
  background-color: white;
`;

const Input = styled.input<{isStatus: boolean; isError: boolean}>`
  caret-color: #f43939;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border: ${({ isError }) => (isError ? '1px solid #feaa22' : '1px solid #dae1e8')};
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-top: 7px;
  padding-left: 16px;
  padding-right: 16px;
  &:focus{
    border-radius: 8px;
    border: ${({ isError }) => (isError ? '1px solid #feaa22' : '1px solid #3897ff')};
    outline: none;
  };
  &::placeholder{
    color: #b4babf;
  };
`;

export default InputBorder;
