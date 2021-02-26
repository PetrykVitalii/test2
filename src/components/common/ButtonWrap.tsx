import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
  isFixed: boolean;
  paddingWidth?: number;
  maxWidth?: number;
  padding?: string;
  width?: string;
}

export const ButtonWrap: React.FC<Props> = ({
  children,
  isFixed,
  height = 68,
  paddingWidth = 32,
  maxWidth = 520,
  padding = null,
  width = null,
}) => (
  <BtnWrap
    height={height}
    isFixed={isFixed}
    paddingWidth={paddingWidth}
    maxWidth={maxWidth}
    padding={padding}
    width={width}
  >
    {children}
  </BtnWrap>
);

const BtnWrap = styled.div<{
  isFixed: boolean;
  height: number;
  paddingWidth: number;
  maxWidth: number;
  padding: string | null;
  width: string | null;
}>`
  position: ${({ isFixed }) => isFixed ? 'fixed' : 'static'};
  bottom: 0px;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  width: ${({ isFixed, paddingWidth, width }) => width || (isFixed ? `calc(100% - ${paddingWidth}px)` : '100%')};
  height: ${({ height }) => `${height}px`};
  background-image: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0));
  padding: ${({ padding }) => padding && padding};
  z-index: 70;

  @media screen and (min-width: 552px) {
    bottom: 40px;
  }
`;

export default ButtonWrap;
