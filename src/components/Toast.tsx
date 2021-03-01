import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

interface Props {
  text: string;
  isActive: boolean;
  style: any;
  autoClose?: number;
  padding?: number;
  bottom?: number;
}

const MyToast: React.FC<Props> = ({
  isActive,
  text,
  style,
  autoClose = 1000,
  padding = 24,
  bottom,
}) => (
  <CSSTransition
    in={isActive}
    timeout={autoClose}
    unmountOnExit
  >
    <CustomToast
      style={style}
      padding={padding}
      bottom={bottom}
    >
      <Text>{text}</Text>
    </CustomToast>
  </CSSTransition>
);

const CustomToast = styled.div<{ padding: number; bottom: number | undefined }>`
  width: ${({ padding }) => `calc(100% - ${padding * 2}px)`};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: 552px;
  height: 48px;
  padding: 0 16px;
  border-radius: 6px;
  box-shadow: 0 8px 19px -6px rgba(0, 41, 41, 0.6);
  background-color: #006e6e;
  display: flex;
  align-items: center;
  bottom: ${({ bottom }) => bottom && `${bottom}px`};

  &.enter {
    opacity: 0;
  }
  &.enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.exit {
    opacity: 1;
  }
  &.exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }

  @media screen and (min-width: 552px) {
    bottom: ${({ bottom }) => bottom && `${bottom + 40}px`};
  }

`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default MyToast;
