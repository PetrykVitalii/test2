import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FullItem } from '@/store/reducers/items';
import unitsLan from '@/utils/unitsLan';

import { changeToggle, itemsActions } from '@/store/actions/items';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '../common/hooks/useToggle';

import SmallArrowIcon from '../common/icons/items/SmallArrowIcon';

import Switch from '../Switch';

interface Props {
  userItem: FullItem;
  search?: boolean;
}

const Item: React.FC<Props> = ({ userItem, search = false }) => {
  const [{ common }] = useLanguage();
  const [isActive, setActive] = useToggle(userItem.is_listed);
  const dispatch = useDispatch();

  const changeActive = () => {
    if (!isActive) {
      dispatch(changeToggle(userItem.id, 'on'));
    } else {
      dispatch(changeToggle(userItem.id, 'off'));
    }
    dispatch(itemsActions.changeToggleItem(userItem.id));
    setActive(!isActive);
  };

  return (
    <ItemWrap>
      <Switch classTrackingOn={search ? 'item-list search toggle-off' : 'item-list list toggle-off'} classTrackingOff={search ? 'item-list search toggle-on' : 'item-list list toggle-on'} isActive={isActive} onClick={changeActive} />
      <ItemInfo>
        <LinkItem className={search ? 'item-list search select-item' : 'item-list select-item-panel'} to={`/item-details/${userItem.id}`}>
          <NameItem isColor={userItem.is_listed}>{userItem.name.toLowerCase()}</NameItem>
          <PackingItem isColor={userItem.is_listed}>
            {userItem.unit === 'Custom'
              ? userItem.custom_unit_name.toLowerCase()
              : unitsLan(userItem.unit, common)}
          </PackingItem>
        </LinkItem>
      </ItemInfo>
      <LinkItem className={search ? 'item-list search select-item' : 'item-list select-item-panel'} to={`/item-details/${userItem.id}`}>
        <RightArrow>
          <SmallArrowIcon />
        </RightArrow>
      </LinkItem>
    </ItemWrap>
  );
};

const LinkItem = styled(Link)`
  text-decoration: none;
  display: block;
`;

const RightArrow = styled.div`
  width: 16px;
  height: 16px;
  margin-top: 2px;
`;

const ItemInfo = styled.div`
  width: calc(100% - 110px);
`;

const NameItem = styled.div<{isColor: boolean}>`
  font-size: 16px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => isColor ? '#21272e' : '#909599'};
  text-transform: capitalize;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const PackingItem = styled.div<{isColor: boolean}>`
  margin-top: 3px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${({ isColor }) => isColor ? '#787c80' : '#b4babf'};
  text-transform: capitalize;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ItemWrap = styled.div`
  padding: 10.3px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Item;
