import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CatalogsIcon from '@/components/common/icons/navigation/catalogsIcon';
import DashboardIcon from '@/components/common/icons/navigation/dashboardIcon';
import OrdersIcon from '@/components/common/icons/navigation/ordersIcon';
import ItemsIcon from '@/components/common/icons/navigation/itemsIcon';
import SettingsIcon from '@/components/common/icons/navigation/settingsIcon';
import SelectedDashboardIcon from './common/icons/navigation/selectedDashboardIcon';
import SelectedOrdersIcon from './common/icons/navigation/selectedOrdersIcon';
import SelectedItemsIcon from './common/icons/navigation/selectedItemsIcon';
import SelectedCatalogsIcon from './common/icons/navigation/selectedCatalogsIcon';
import SelectedSettingsIcon from './common/icons/navigation/selectedSettingsIcon';
import useLanguage from './common/hooks/useLanguage';

interface Props {
  path: string;
}

const Navigation: React.FC<Props> = ({ path }) => {
  const [{ common }] = useLanguage();

  return (
    <NavigationContainer>
      <LinkWrap to="/dashboard" className="menu dashboard">
        <NavigationLink isStatus={path === 'dashboard'}>
          <NavigationIcon>
            {path === 'dashboard' ? <SelectedDashboardIcon /> : <DashboardIcon />}
          </NavigationIcon>
          <Text>{common.nav_dashboard}</Text>
        </NavigationLink>
      </LinkWrap>

      <LinkWrap to="/orders" className="menu orders">
        <NavigationLink isStatus={path === 'orders'}>
          <NavigationIcon>
            {path === 'orders' ? <SelectedOrdersIcon /> : <OrdersIcon />}
          </NavigationIcon>
          <Text>{common.nav_orders}</Text>
        </NavigationLink>
      </LinkWrap>

      <LinkWrap to="/catalogs" className="menu catalog">
        <NavigationLink isStatus={path === 'catalogs'}>
          <NavigationIcon>
            {path === 'catalogs' ? <SelectedCatalogsIcon /> : <CatalogsIcon />}
          </NavigationIcon>
          <Text>{common.nav_catalogs}</Text>
        </NavigationLink>
      </LinkWrap>

      <LinkWrap to="/items" className="menu items">
        <NavigationLink isStatus={path === 'items'}>
          <NavigationIcon>
            {path === 'items' ? <SelectedItemsIcon /> : <ItemsIcon />}
          </NavigationIcon>
          <Text>{common.nav_inventory}</Text>
        </NavigationLink>
      </LinkWrap>

      <LinkWrap to="/settings" className="menu settings">
        <NavigationLink isStatus={path === 'settings'}>
          <NavigationIcon>
            {path === 'settings' ? <SelectedSettingsIcon /> : <SettingsIcon />}
          </NavigationIcon>
          <Text>{common.nav_settings}</Text>
        </NavigationLink>
      </LinkWrap>
    </NavigationContainer>
  );
};

const LinkWrap = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  text-decoration: none;
`;

const NavigationLink = styled.div<{ isStatus: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${({ isStatus }) => (isStatus ? '#21272e' : '#b4babf')};
`;

const NavigationContainer = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.17);
  position: sticky;
  bottom: 40px;
  padding: 8px 0;
  background-color: white;
  z-index: 100;
  max-width: 552px;

  @media screen and (max-width: 552px) {
    bottom: 0;
  }
`;

const NavigationIcon = styled.div`
  width: 28px;
  height: 28px;
`;

const Text = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin-top: auto;
`;

export default Navigation;
