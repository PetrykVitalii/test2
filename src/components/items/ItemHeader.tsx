import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { HandleToggle } from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

import SearchIcon from '@/components/common/icons/SearchIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import FixedHeader from '@/components/FixedHeader';

interface Props {
  openSearch: HandleToggle;
}

const ItemHeader: React.FC<Props> = ({ openSearch }) => {
  const [{ items: itemsLan }] = useLanguage();
  return (
    <FixedHeader>
      <HeaderWrap>
        <HeaderText>{itemsLan.items_header}</HeaderText>
        <HeaderSmallWrapper>
          <HeaderIcon className="item-list search-btn item" onClick={openSearch}>
            <SearchIcon />
          </HeaderIcon>
          <HeaderRectangle className="item-list add-item-plus-btn" to="/add-items">
            <HeaderPlus>
              <PlusIcon color="black" />
            </HeaderPlus>
          </HeaderRectangle>
        </HeaderSmallWrapper>
      </HeaderWrap>
    </FixedHeader>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
`;

const HeaderSmallWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  width: 142px;
  padding-bottom: 2px;
  font-size: 29px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
`;

const HeaderPlus = styled.div`
  width: 24px;
  height: 24px;
`;

const HeaderIcon = styled.div`
  margin-top: 2px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const HeaderRectangle = styled(Link)`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color:#21272e;
`;

export default ItemHeader;
