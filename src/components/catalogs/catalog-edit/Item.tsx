import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { FullItem } from '@/store/reducers/items';
import { catalogsActions } from '@/store/actions/catalog';
import unitsLan from '@/utils/unitsLan';
import code from '@/utils/code';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import Checkbox from '@/components/CheckBox';

interface Props {
  item: FullItem;
  isExist: boolean;
}

const Item: React.FC<Props> = ({ item, isExist }) => {
  const [{ common }] = useLanguage();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useToggle(isExist);

  const onChangeCheckbox = (id: number) => () => {
    if (!toggle) {
      dispatch(catalogsActions.addItem(item));
      setToggle(!toggle);
    } else {
      dispatch(catalogsActions.deleteItem(id));
      setToggle(!toggle);
    }
  };

  return (
    <List key={item.id} onClick={onChangeCheckbox(item.id)}>
      <TextWrap>
        <Text isListed={item.is_listed}>{item.name}</Text>
        <SubText isListed={item.is_listed}>
          {`${item.code ? `${code(item.code)} •` : ''} ${
            item.custom_unit_name ? item.custom_unit_name : unitsLan(item.unit, common)
          }`}

        </SubText>
      </TextWrap>
      <CheckboxWrap>
        <Checkbox
          classTracking="catalog item-list checkbox"
          isListed={item.is_listed}
          isChecked={toggle}
        />
      </CheckboxWrap>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  min-height: 64px;

  &::last-child {
    margin-bottom: 16px;
    min-height: 164px;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Text = styled.p<{ isListed: boolean }>`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${({ isListed }) => (isListed ? '#21272e' : '#909599')};
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

const SubText = styled.p<{ isListed: boolean }>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${({ isListed }) => (isListed ? '#787c80' : '#b4babf')};

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
