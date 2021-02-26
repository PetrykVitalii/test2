import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { FullItem } from '@/store/reducers/items';
import { catalogsActions } from '@/store/actions/catalog';
import { selectCurrency } from '@/store/selectors/user';
import unitsLan from '@/utils/unitsLan';
import formatPrice from '@/utils/formatPrice';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import EmptyImageIcon from '@/components/common/icons/EmptyImageIcon';

import Checkbox from '@/components/CheckBox';
import { itemsActions } from '@/store/actions/items';

interface Props {
  item: FullItem;
  isExist: boolean;
  isCustomPrice: boolean;
}

const Item: React.FC<Props> = ({ item, isExist, isCustomPrice }) => {
  const [{ common }] = useLanguage();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useToggle(isExist);

  const currency = useSelector(selectCurrency);

  const price = isCustomPrice ? item.custom_price : item.price;

  const onChangeCheckbox = (id: number) => () => {
    if (!toggle) {
      dispatch(catalogsActions.addItem(item));
      setToggle(!toggle);
    } else {
      dispatch(catalogsActions.deleteItem(id));
      dispatch(itemsActions.changeItem(id, item.custom_price));
      setToggle(!toggle);
    }
  };

  return (
    <List key={item.id} onClick={onChangeCheckbox(item.id)}>
      <ItemWrap>
        {item.images && item.images.length > 0 ? (
          <ItemImage isListed={item.is_listed}>
            <Image src={item.images.split(',')[0]} alt="item-image" />
          </ItemImage>
        ) : (
          <ItemEmptyImage isListed={item.is_listed}>
            <EmptyImageIcon />
          </ItemEmptyImage>
        )}
        <TextWrap>
          <Text isDisabled={item.is_listed}>{item.name.toLowerCase()}</Text>
          <SubText isDisabled={item.is_listed}>
            {`${price ? `${currency}${formatPrice(price)} /` : ''} ${item.custom_unit_name ? item.custom_unit_name.toLowerCase() : unitsLan(item.unit, common)}`}
          </SubText>
        </TextWrap>
      </ItemWrap>
      <CheckboxWrap>
        <Checkbox
          classTracking="catalog item-list checkbox"
          isChecked={toggle}
          isListed={item.is_listed}
        />
      </CheckboxWrap>
    </List>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const ItemImage = styled.div<{ isListed: boolean }>`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 6px;
  opacity: ${({ isListed }) => (isListed ? '1' : '0.4')};
  box-shadow: 0 4px 10px -4px rgba(33, 39, 46, 0.4);
  background-color: white;
`;

const ItemEmptyImage = styled.div<{ isListed: boolean }>`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcfcfc;
  opacity: ${({ isListed }) => (isListed ? '1' : '0.4')};
  border: solid 1px rgba(33, 39, 46, 0.12);
`;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 40px);
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  min-height: 64px;
  cursor: pointer;

  &::last-child {
    margin-bottom: 16px;
    min-height: 164px;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 17px;
  width: calc(100% - 65px);
`;

const Text = styled.p<{ isDisabled: boolean }>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  color: ${({ isDisabled }) => (isDisabled ? '#21272e' : '#909599')};
  text-transform: capitalize;

  word-wrap: break-word;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const SubText = styled.p<{ isDisabled: boolean }>`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
  color: ${({ isDisabled }) => (isDisabled ? '#787c80' : '#b4babf')};
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

const CheckboxWrap = styled.div`
  margin-left: 8px;
`;

export default Item;
