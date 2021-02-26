import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { HandleToggle } from '@/components/common/hooks/useToggle';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  descriptionValue?: string | null;
  setDescription: (v: string) => void;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  isError?: boolean;
  setIsFocus?: HandleToggle;
  height?: number;
  classTracking?: string;
}

const TextArea: React.FC<Props> = ({
  descriptionValue,
  setDescription,
  placeholder = '',
  name = '',
  disabled = false,
  isError = false,
  setIsFocus = null,
  height = 105,
  classTracking = '',
  maxLength,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const formatStr = (str: string) => str.replace(str[0], (s) => s.toUpperCase()).replace(/(\.|\?|!) [^A-Z0-9]{1}/g, (key) => `${key[0]}${key[1]}${key[2].toUpperCase()}`);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement> | string) => {
    const { target } = e as React.ChangeEvent<HTMLTextAreaElement>;
    const { value } = target;

    setDescription(formatStr(value));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (descriptionValue && maxLength && descriptionValue.length > maxLength) {
      setDescription(descriptionValue?.slice(0, maxLength));
    }
  }, [descriptionValue]);

  useEffect(() => {
    if (textareaRef.current) {
      if (descriptionValue === null || !descriptionValue?.length) {
        return;
      }
      textareaRef.current.style.height = '';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 12}px`;
    }
  }, []);

  return (
    <Wrap>
      <DescriptionBorder>{name}</DescriptionBorder>
      <Textarea
        disabled={disabled}
        placeholder={placeholder}
        value={descriptionValue || ''}
        onChange={onChangeHandler}
        isError={isError}
        onFocus={focus}
        onBlur={blur}
        height={height}
        className={classTracking}
        ref={textareaRef}
        autoCapitalize="sentences"
        maxLength={maxLength}
        autoComplete="off"
        autoCorrect="off"
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
`;

const DescriptionBorder = styled.span`
  font-size: 12.5px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  top: -9px;
  left: 10px;
  padding: 0 2px 0 6px;
  position: absolute;
  background-color: white;
`;

const Textarea = styled.textarea<{ isError: boolean; height: number }>`
  caret-color: #f43939;
  width: 100%;
  min-height: ${({ height }) => `${height}px`};
  border-radius: 8px;
  border: ${({ isError }) => isError ? 'solid 1px #feaa22' : 'solid 1px #dae1e8'};
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  resize: none;
  padding: 18px 16px;

  ::first-letter {
    text-transform: capitalize;
  }

  &::placeholder{
    color: #b4babf;
    line-height: 1.4;
  };
  &:focus{
    border-radius: 8px;
    border: ${({ isError }) => isError ? 'solid 1px #feaa22' : 'solid 1px #3897ff'};
    outline: none;
  };
`;

export default TextArea;
