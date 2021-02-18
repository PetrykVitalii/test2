import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FullItem } from '@/store/reducers/items';
import { userActions } from '@/store/actions/user';
import unitsLan from '@/utils/unitsLan';
import { calculateItemPrice } from '@/utils/item-price';
import LocalStorage from '@/utils/local-storage';
import MinusIcon from '../common/icons/MinusIcon';
import PlusIcon from '../common/icons/PlusIcon';
import useLanguage from '../common/hooks/useLanguage';
import DeleteItemIcon from '../common/icons/DeleteItemIcon';

interface Props {
  catalogId: string;
  item: FullItem;
  isCustomPrice: boolean;
}

const OrderItems: React.FC<Props> = ({ catalogId, item, isCustomPrice }) => {
  const dispatch = useDispatch();
  const [{ order, common }] = useLanguage();

  const counter = (status: boolean, id: number) => () => {
    if (item.count === 0 && !status) {
      return;
    }
    let count;
    if (status) {
      count = +item.count + 1;
    } else {
      count = +item.count - 1;
    }

    dispatch(userActions.counter(status, id));
    LocalStorage.setUserItemCount(id, +count);
  };

  const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(userActions.setCount(item.id, +value));
    LocalStorage.setUserItemCount(item.id, +value);
  };

  const deleteItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    LocalStorage.setDeleteItem(item.id);
    dispatch(userActions.deleteItem(item.id));
  };

  const calculatePrice = () => calculateItemPrice(
    isCustomPrice,
    item.custom_price,
    item.price,
    '',
    item.currency_iso,
  );

  const selectInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  return (
    <ItemWrap>
      <ItemInfo to={`/catalogs/${catalogId}/${item.id}`}>
        <ItemName colorItem={!!item.count}>{item.name.toLowerCase()}</ItemName>
        {item.count === 0 ? (
          <RemoveWrap className="buyer order remove-item-btn" onClick={deleteItem}>
            <DeleteItemIcon />
            <Remove>{order.remove}</Remove>
          </RemoveWrap>
        ) : (
          <ItemPrice>
            {`${calculatePrice() ? `${calculatePrice()}/` : ''}  ${
              item.unit === 'Custom' ? item.custom_unit_name.toLowerCase() : unitsLan(item.unit, common)
            }`}
          </ItemPrice>
        )}
      </ItemInfo>
      <CountWrap>
        <IconWrap className="buyer order minus-qty-btn" onClick={counter(false, item.id)}>
          <MinusIcon color={item.count ? '#21272E' : 'rgba(33, 39, 46, 0.08)'} />
        </IconWrap>
        <InputCount
          className="buyer order input-qty-field"
          colorItem={!!item.count}
          value={+item.count}
          type="text"
          onChange={changeCount}
          pattern="[0-9]*"
          maxLength={4}
          onFocus={selectInput}
        />
        <IconWrap className="buyer order add-qty-btn" onClick={counter(true, item.id)}>
          <PlusIcon />
        </IconWrap>
      </CountWrap>
    </ItemWrap>
  );
};

const Remove = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #feaa22;
`;

const RemoveWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  cursor: pointer;
`;

const IconWrap = styled.div`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const InputCount = styled.input<{colorItem: boolean}>`
  padding: 5px 10px 5px 9px;
  border-radius: 8px;
  border: solid 2px rgba(33, 39, 46, 0.08);
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${({ colorItem }) => (colorItem ? '#21272e' : '#909599')} ;
  width: 56px;
  caret-color: black;

  &:focus {
    outline: none;
    border: 1px solid rgb(56, 151, 255);
  };

  &:disabled {
    color: ${({ colorItem }) => (colorItem ? '#21272e' : '#909599')} ;
  }

  &::selection {
    color: #21272e;
    background: #b9b8b8;
  }
`;

const CountWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 120px;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  margin-top: 3px;
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

const ItemName = styled.div<{colorItem: boolean}>`
  font-size: 16px;
  font-weight: ${({ colorItem }) => (colorItem ? 'bold' : '600')};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${({ colorItem }) => (colorItem ? '#21272e' : '#909599')};
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

const ItemInfo = styled(Link)`
  width: calc(100% - 130px);
  text-decoration: none;
`;

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
`;

export default OrderItems;
