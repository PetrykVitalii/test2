import React from 'react';
import styled, { keyframes } from 'styled-components';
import { HandleToggle } from './common/hooks/useToggle';

interface Props {
  text: string;
  setIsPopUp: HandleToggle;
  widthPopUp?: boolean;
}

const PopUp: React.FC<Props> = ({ text, setIsPopUp, widthPopUp = false }) => {
  setTimeout(() => {
    setIsPopUp(false);
  }, 3000);
  return (
    <Wrap widthPopUp={widthPopUp}>
      {text}
    </Wrap>
  );
};

const fadeIn = keyframes`
  0% {
      opacity: 0;
    }
  8% {
      opacity: 1;
    }
  92% {
      opacity: 1;
    }
  100% {
      opacity: 0;
  }
`;

const Wrap = styled.div<{widthPopUp: boolean}>`
  padding: 15px 16px;
  border-radius: 6px;
  box-shadow: 0 8px 19px -6px rgba(33, 39, 46, 0.5);
  background-color: #006e6e;
  position: fixed;
  bottom: 16px;
  width: ${({ widthPopUp }) => (widthPopUp ? 'calc(100% - 48px)' : 'calc(100% - 32px)')};
  max-width: ${({ widthPopUp }) => (widthPopUp ? 'calc(552px - 48px)' : 'calc(552px - 32px)')};
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  animation: ${fadeIn} ease 3s;
  z-index: 500;
`;

export default PopUp;
