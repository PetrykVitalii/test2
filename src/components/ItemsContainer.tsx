import React from 'react';
import styled from 'styled-components';

import OrderItemsIcon from '@/components/common/icons/OrderItemsIcon';
import ItemQuote from '@/components/ItemQuote';
import { FullItem } from '@/store/reducers/items';
import sort from '@/utils/sort';
import useToggle from './common/hooks/useToggle';
import useLanguage from './common/hooks/useLanguage';
import ArrowDownIcon from './common/icons/ArrowDownIcon';

interface Props {
  items: FullItem[];
  isCount?: boolean;
  isCustomPrice: boolean;
  classTrackingCollapse?: string;
  classTrackingExpand?: string;
  isImage?: boolean;
}

const ItemsContainer: React.FC<Props> = ({
  items,
  isCount = false,
  isCustomPrice,
  classTrackingCollapse,
  classTrackingExpand,
  isImage = true,
}) => {
  const [isStatus, setIsStatus] = useToggle();
  const [{ catalog }] = useLanguage();

  return (
    <WrapItemsContainer
      className={
        isStatus
          ? classTrackingCollapse
          : classTrackingExpand
      }
    >
      <ItemWrap>
        <Wrap>
          {
            isImage && (
            <IconWrap>
              <OrderItemsIcon />
            </IconWrap>
            )
          }
          <ItemsTitle>{`${items.length} ${items.length === 1 ? catalog.item : catalog.items}`}</ItemsTitle>
        </Wrap>
        <ArrowBackgroundWrap onClick={setIsStatus} isStatus={isStatus}>
          <ArrowWrap>
            <ArrowDownIcon />
          </ArrowWrap>
        </ArrowBackgroundWrap>
      </ItemWrap>
      <ItemsWrap isStatus={isStatus} id="itemsContainer">
        <Line />
        {sort(items).map((item) => (
          <ItemQuote
            isCustomPrice={isCustomPrice}
            isCount={isCount}
            key={item.id}
            item={item}
          />
        ))}
      </ItemsWrap>

    </WrapItemsContainer>
  );
};

const ItemsWrap = styled.div<{isStatus: boolean}>`
  display: ${({ isStatus }) => (isStatus ? 'block' : 'none')};
`;

const WrapItemsContainer = styled.div`
  padding: 12px 13px 12px 20px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.06);
  background-color: #f4f5f9;
  min-height: 72px;
`;

const Line = styled.div`
  height: 1px;
  margin: 10px 0 10px;
  background-color: #b4babf;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const ItemsTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const ArrowWrap = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowBackgroundWrap = styled.div<{isStatus: boolean}>`
  background-color: ${({ isStatus }) => (isStatus && '#e8e8e8')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  transform: ${({ isStatus }) => (isStatus && 'rotate(180deg)')};
  transition: 0.7s;
  cursor: pointer;
`;

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
`;

export default ItemsContainer;
