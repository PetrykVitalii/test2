/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { selectCurrency } from '@/store/selectors/user';
import { FullItem } from '@/store/reducers/items';
import unitsLan from '@/utils/unitsLan';
import formatPrice from '@/utils/formatPrice';

import EmptyImageIcon from '@/components/common/icons/EmptyImageIcon';
import useLanguage from '@/components/common/hooks/useLanguage';

interface Props {
  item: FullItem;
  isCustomPrice: boolean;
  catalogId: number | null;
}

const Item: React.FC<Props> = ({
  item, isCustomPrice, catalogId,
}) => {
  const [{ common }] = useLanguage();
  const history = useHistory();
  const currency = useSelector(selectCurrency);

  const handleItemOnClick = () => {
    history.push(`/catalog/${catalogId}/${item.id}/preview`);
  };

  return (
    <ItemWrap onClick={handleItemOnClick}>
      <WrapItemInfo>
        {item.images && item.images.length > 0 ? (
          <ItemImage isListed={item.is_listed}>
            <Image src={item.images.split(',')[0]} alt="item-image" />
          </ItemImage>
        ) : (
          <ItemEmptyImage isListed={item.is_listed}>
            <EmptyImageIcon />
          </ItemEmptyImage>
        )}
        <ItemInfo>
          <ItemName isListed={item.is_listed}>{item.name.toLowerCase()}</ItemName>
          <ItemPrice isListed={item.is_listed}>
            {`${
              isCustomPrice
                ? item.custom_price
                  ? `${currency}${formatPrice(item.custom_price)}`
                  : '- - -'
                : item.price
                  ? `${currency}${formatPrice(item.price)}`
                  : '- - -'
            } / ${
              item.unit === 'Custom'
                ? item.custom_unit_name.toLowerCase()
                : unitsLan(item.unit, common)
            }`}
          </ItemPrice>
        </ItemInfo>
      </WrapItemInfo>
    </ItemWrap>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const ItemName = styled.div<{ isListed: boolean }>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${({ isListed }) => isListed ? '#21272e' : '#909599'};
  text-transform: capitalize;

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

const ItemPrice = styled.div<{ isListed: boolean }>`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ isListed }) => isListed ? ' #787c80' : '#b4babf'};
  text-transform: capitalize;

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

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 20px;
`;

const ItemImage = styled.div<{ isListed: boolean }>`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 6px;
  opacity: ${({ isListed }) => isListed ? '1' : '0.4'};
  box-shadow: 0 4px 10px -4px rgba(33, 39, 46, 0.4);
  background-color: white;
`;

const ItemEmptyImage = styled.div<{ isListed: boolean }>`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 6px;
  background-color: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isListed }) => isListed ? '1' : '0.4'};
  border: solid 1px rgba(33, 39, 46, 0.12);
`;

const WrapItemInfo = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 11px 12px 11px 0;
  width: 100%;
  min-height: 64px;
  text-decoration: none;
  cursor: pointer;
`;

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Item;
