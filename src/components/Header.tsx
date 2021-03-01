import React from 'react';
import styled from 'styled-components';

import SellSmarterIcon from '@/components/common/icons/auth/SaleSmarter';
import LnSwitcher from '@/components/auth/LnSwitcher';

interface HeaderProps {
}

const Header: React.FC < HeaderProps > = () => (
  <HeaderStyled>
    <SellSmarterIcon />
    <LnSwitcher />
  </HeaderStyled>
);

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  min-height: 106px;
  justify-content: space-between;
  padding: 32px 24px 26px 12px;
  position: relative;
  z-index: 10;
`;

export default Header;
