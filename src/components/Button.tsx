import React from 'react';
import styled, { css } from 'styled-components';
import LoaderDots from './common/LoaderDots';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shadow?: boolean;
  transparent?: boolean;
  isLoading?: boolean;
  icon?: boolean;
  disabledOnly?: boolean;
  classTracking? :string;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  isLoading = false,
  shadow = false,
  transparent = false,
  icon = false,
  disabledOnly = false,
  classTracking = '',
}) => (
  <StyledButton
    onClick={onClick}
    disabled={isLoading || disabledOnly}
    shadow={shadow}
    transparent={transparent}
    icon={icon}
    className={classTracking}
  >
    {isLoading ? <LoaderDots /> : children}
  </StyledButton>
);

interface ButtonProps {
  shadow: boolean;
  transparent: boolean;
  disabled: boolean;
  icon: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: block;
  border: none;
  background: linear-gradient(99deg, #ff474d, #fa4353);
  padding: 15px 30px;
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;

  :focus {
    background: #ed3b3b;
    outline: none;
  }

  :active {
    background: #de3d46;
  }

  :disabled {
    background: #ff7a82;
  }

  ${({ shadow }) => shadow && css`
      padding: 17px 45px;
      box-shadow: 0 14px 30px -8px rgba(94, 22, 22, 0.47);
      background: linear-gradient(99deg, #ff474d, #fa4353);
      font-weight: bold;
      height: 52px;

      :focus {
        background: linear-gradient(99deg, #ff474d, #fa4353);
      }
    `};

  ${({ transparent }) => transparent && css`
      padding: 10px;
      background: transparent;
      color: #3897ff;

      :focus {
        background: transparent;
      }

      :disabled {
        background: transparent;
      }

      :active {
        background: transparent;
      }
    `};

  ${({ icon }) => icon && css`
      padding: 12px;
      height: 100%;

      background: #f0f1f2;
      color: #21272e;
      border-radius: 8px;
      border: solid 1px #dae1e8;

      :focus {
        background: #f0f1f2;
      }

      :disabled {
        background: #f0f1f2;
      }

      :active {
        background: transparent;
      }
    `};
`;

export default Button;
