/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';
import LoaderDots from '../common/LoaderDots';

enum THEME {
  default,
  snow,
  primary
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: React.ReactNode | string;
  icon?: React.ReactNode;
  theme?: THEME;
  buttonRef?: any;
  isLoader?: boolean;
  classTracking?: string;
}

export default function Button({
  onClick,
  disabled,
  theme = THEME.default,
  icon,
  text,
  style = {},
  buttonRef,
  isLoader = false,
  classTracking,
} : Props) {
  const themes = {
    [THEME.default]: DefaultButton,
    [THEME.snow]: SnowButton,
    [THEME.primary]: PrimaryButton,
  };

  const ThemedButton = themes[theme];

  return (
    <ThemedButton
      onClick={onClick}
      style={style}
      disabled={disabled || isLoader}
      ref={buttonRef}
      className={classTracking}
    >
      {isLoader ? (
        <LoaderDots />
      ) : (
        <>
          {text}
          {icon && <IconWrap>{icon}</IconWrap>}
        </>
      )}
    </ThemedButton>
  );
}

Button.theme = THEME;

const DefaultButton = styled.button`
  border-radius: 6px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  outline: none;
  height: 52px;
  width: 100%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const SnowButton = styled.button`
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  outline: none;
  height: 36px;
  width: 100%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const PrimaryButton = styled.button`
  border: none;
  border-radius: 6px;
  box-shadow: 0 14px 30px -8px rgba(94, 22, 22, 0.47);
  background: linear-gradient(99deg, #ff474d, #fa4353);
  font-weight: bold;
  outline: none;
  height: 52px;
  width: 100%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #ffffff;

  :disabled {
    background: #ff7a82;
  }

  :focus {
    background: linear-gradient(99deg, #ff474d, #fa4353);
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
`;
