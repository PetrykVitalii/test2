import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';
import LoaderDots from './common/LoaderDots';

export interface IMenuItem {
  id: number;
  name: string;
  icon: React.FC<{}>;
  onClick: (event: SyntheticEvent) => void;
}

interface Props {
  closeMenu: () => void;
  menuItems: IMenuItem[];
  loading?: { isLoading: boolean; itemId: number; }
}

const Menu: React.FC<Props> = ({ closeMenu, menuItems, loading }) => {
  useWindowScrollBlock();

  const menuRef = useOnClickOutside(closeMenu);

  return (
    <BackgroundWrapper>
      {/* use onclick to close menu for iOS version less than 12 */}
      <MenuWrapper onClick={closeMenu}>
        <MyMenu ref={menuRef}>
          {menuItems
            && menuItems.map((item: IMenuItem) => (
              <ItemWrapper key={item.id}>
                {loading?.isLoading && loading.itemId === item.id ? (
                  <LoaderWrapper>
                    <LoaderDots />
                  </LoaderWrapper>
                ) : (
                  <MenuItem onClick={item.onClick}>
                    {item.icon && (
                    <MenuIcon>
                      <item.icon />
                    </MenuIcon>
                    )}
                    <MenuTitle>{item.name}</MenuTitle>
                  </MenuItem>
                )}
              </ItemWrapper>
            ))}
        </MyMenu>
      </MenuWrapper>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
`;

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  max-width: 552px;
  margin: 0 auto;
`;

const MyMenu = styled.div`
  width: 200px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  background-color: #ffffff;
  position: absolute;
  top: 60px;
  right: 9px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 44px;
  cursor: pointer;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 24px 0 16px;
`;

const MenuTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

export default Menu;
