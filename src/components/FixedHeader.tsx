import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectIsPWA } from '@/store/selectors/pwa';

interface Props {
  height?: number;
  isAlwaysVisible?: boolean;
}

const FixedHeader: React.FC<Props> = ({ children, height = 72, isAlwaysVisible }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isPWA = useSelector(selectIsPWA);

  const prevScrollPos = useRef(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    const shouldBeShown = prevScrollPos.current > currentScrollPos;
    prevScrollPos.current = currentScrollPos;

    if (currentScrollPos <= 0) {
      setIsVisible(true);
      return;
    }

    if (currentScrollPos >= document.documentElement.scrollHeight) {
      setIsVisible(false);
      return;
    }

    setIsVisible(shouldBeShown);
  };

  const headerVisibility = (isPWA && !isAlwaysVisible) ? isVisible : true;

  return (
    <Header isVisible={headerVisibility} height={height}>
      {children}
    </Header>
  );
};

const Header = styled.header<{ height: number; isVisible: boolean }>`
  min-height: ${({ height }) => `${height}px`};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  position: sticky;
  top: 40px;
  width: 100%;
  max-width: 552px;
  z-index: 110;
  display: flex;
  align-items: center;
  transition: 0.3s;
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0px)' : 'translateY(-300%)')};

  @media screen and (max-width: 552px) {
    top: 0;
  }
`;

export default FixedHeader;
