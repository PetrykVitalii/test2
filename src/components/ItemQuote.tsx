import { FullItem } from '@/store/reducers/items';
import React from 'react';
import styled, { css } from 'styled-components';

import unitsLan from '@/utils/unitsLan';
import { calculateItemPrice } from '@/utils/item-price';
import useLanguage from './common/hooks/useLanguage';

interface Props {
  item: FullItem;
  isCount: boolean;
  isCustomPrice: boolean;
}

const ItemQuote: React.FC<Props> = ({ item, isCount, isCustomPrice }) => {
  const [{ common }] = useLanguage();

  const calculatePrice = () => calculateItemPrice(
    isCustomPrice,
    item.custom_price,
    item.price,
    '',
    item.currency_iso,
    item.count,
  );

  return (
    <ItemWrap>
      <ItemInfo isStatus={!item.code}>
        <ItemName id="title">{item.name.toLowerCase()}</ItemName>
        { item.code && <ItemCode>{item.code}</ItemCode>}
      </ItemInfo>
      <InfoWrap isStatus={!item.price}>
        <ItemUnit>
          {isCount && (
          <Span>
            {item.count}
            {' x '}
          </Span>
          )}
          {item.unit === 'Custom' ? item.custom_unit_name.toLowerCase() : unitsLan(item.unit, common)}
        </ItemUnit>
        { calculatePrice() && <ItemPrice>{calculatePrice()}</ItemPrice>}
      </InfoWrap>

    </ItemWrap>
  );
};

const ItemCode = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
  margin-top: 6px;
`;

const InfoWrap = styled.div<{isStatus: boolean}>`
  max-width: 120px;
  margin-top: 10px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;

  ${({ isStatus }) => isStatus && css`
    justify-content: center;
    margin-top: 0;
  `}
`;

const Span = styled.span`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #21272e;
  text-transform: lowercase;
`;

const ItemUnit = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #21272e;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const ItemPrice = styled.div`
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
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

const ItemInfo = styled.div<{isStatus: boolean}>`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  ${({ isStatus }) => isStatus && css`
    justify-content: center;
    margin-top: 0;
  `}
`;

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 64px;
`;

export default ItemQuote;
