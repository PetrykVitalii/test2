import React from 'react';
import styled from 'styled-components';

import { FullItem } from '@/store/reducers/items';
import Item from './Item';
import { HandleToggle } from '../common/hooks/useToggle';
import FilterIcon from '../common/icons/items/FilterIcon';
import useLanguage from '../common/hooks/useLanguage';

enum Filters {
  ALL,
  LISTED,
  HIDDEN
}

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  openModal: HandleToggle;
  userItems: FullItem[];
  filter: Filters;
}

const Catalog: React.FC<ModalProps> = ({ openModal, userItems, filter }) => {
  const [{ items: itemsLan }] = useLanguage();

  const filterName = () => {
    if (filter === Filters.LISTED) return itemsLan.filter_listed_items;
    if (filter === Filters.HIDDEN) return itemsLan.filter_hidden_items;
    return itemsLan.filter_all_items;
  };
  return (
    <>
      <TopWrap>
        <CountItems>
          {`${filterName()}
          (${userItems.length})`}
        </CountItems>
        <Filter className="item-list filter-btn" onClick={openModal}>
          {itemsLan.filter}
          <FilterImg>
            <FilterIcon />
          </FilterImg>
        </Filter>
      </TopWrap>
      <ItemsWrap>
        {userItems.map((userItem: FullItem) => <Item key={userItem.id} userItem={userItem} />)}
      </ItemsWrap>
    </>
  );
};

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 16px;
  align-items: center;
`;

const CountItems = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.3px;
  color: #909599;
  white-space: nowrap;
`;

const Filter = styled.div`
  cursor: pointer;
  font-size: 12px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #3897ff;
  display: flex;
  align-items: center;
`;

const FilterImg = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 0 1px 4px;
`;

export default Catalog;
