/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FullItem } from '@/store/reducers/items';
import { itemsActions } from '@/store/actions/items';
import unitsLan from '@/utils/unitsLan';
import { calculateItemPrice } from '@/utils/item-price';
import ArrowIcon from '../common/icons/ArrowIcon';
import CheckBoxOffIcon from '../common/icons/CheckBoxOffIcon';
import CheckBoxOnIcon from '../common/icons/CheckBoxOnIcon';
import EmptyImageIcon from '../common/icons/EmptyImageIcon';
import useLanguage from '../common/hooks/useLanguage';

interface Props {
  item: FullItem;
  catalogId: string;
  isSearch?: boolean;
  isCustomPrice: boolean;
}

const Item: React.FC<Props> = ({
  item, catalogId, isSearch = false, isCustomPrice,
}) => {
  const dispatch = useDispatch();
  const [{ catalog: catalogLan, common }] = useLanguage();

  const changeActive = () => {
    dispatch(itemsActions.changeToggleItem(item.id));
  };

  const calculatePrice = () => calculateItemPrice(
    isCustomPrice,
    item.custom_price,
    item.price,
    catalogLan.price_on_request,
    item.currency_iso,
  );

  return (
    <ItemWrap>
      <WrapItemInfo
        className={
          isSearch
            ? 'buyer-catalog search-select-item'
            : 'buyer-catalog select-item-panel'
        }
        to={`/catalogs/${catalogId}/${item.id}`}
      >
        {item.images && item.images.length > 0 ? (
          <ItemImage>
            <Image src={item.images.split(',')[0]} alt="ItemImage" />
          </ItemImage>
        ) : (
          <ItemEmptyImage>
            <EmptyImageIcon />
          </ItemEmptyImage>
        )}
        <ItemInfo>
          <ItemName>{item.name.toLowerCase()}</ItemName>
          <ItemPrice>
            <Span>{calculatePrice()}</Span>
            {` / ${
              item.unit === 'Custom'
                ? item.custom_unit_name.toLowerCase()
                : unitsLan(item.unit, common)
            }`}
          </ItemPrice>
        </ItemInfo>
        <WrapIcon>
          <ArrowIcon />
        </WrapIcon>
      </WrapItemInfo>
      <WrapCheckBox
        onClick={changeActive}
        active={!!item.is_status}
        className={
          isSearch ? 'buyer-catalog search-checkbox' : 'buyer-catalog checkbox'
        }
      >
        {item.is_status ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
      </WrapCheckBox>
    </ItemWrap>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const Span = styled.span`
  text-transform: none;
`;

const ItemPrice = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
  word-break: break-word;
  text-transform: capitalize;
  
  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-inline-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const WrapIcon = styled.div`
  width: 18px;
  height: 18px;
`;

const WrapCheckBox = styled.div<{active: boolean}>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  padding: ${({ active }) => (!active ? '2px' : '0px')};
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  word-break: break-word;
  text-transform: capitalize;
  
  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 16px;
  width: calc(100% - 80px);
`;

const ItemImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  box-shadow: 0 4px 10px -4px rgba(33, 39, 46, 0.4);
  margin-left: -24px;
  background-color: white;
`;

const ItemEmptyImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  margin-left: -24px;
  background-color: white;
  border: solid 1px rgba(33, 39, 46, 0.12);
`;

const WrapItemInfo = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  background-color: #ffffff;
  padding: 11px 12px 11px 0;
  margin-right: 20px;
  width: calc(100% - 40px);
  min-height: 64px;
  text-decoration: none;
  cursor: pointer;
`;

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 6px 8px 24px;
`;

export default Item;
