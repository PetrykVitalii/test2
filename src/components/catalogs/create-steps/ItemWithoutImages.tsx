import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { FullItem } from '@/store/reducers/items';
import { addItemToNextStepAction, createCatalogActions } from '@/store/actions/createCatalog';
import unitsLan from '@/utils/unitsLan';

import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

import Checkbox from '@/components/CheckBox';

interface Props {
  item: FullItem;
  isExist: boolean;
}

const ItemWithoutImages: React.FC<Props> = ({ item, isExist }) => {
  const [{ common }] = useLanguage();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useToggle(isExist);

  const onChangeCheckbox = (id: number) => () => {
    if (!toggle) {
      dispatch(addItemToNextStepAction(id));
      setToggle(!toggle);
    } else {
      dispatch(createCatalogActions.deleteItemToNextStep(id));
      setToggle(!toggle);
    }
  };

  return (
    <List key={item.id} onClick={onChangeCheckbox(item.id)}>
      <ItemWrap>
        <TextWrap>
          <Text isDisabled={item.is_listed}>{item.name.toLowerCase()}</Text>
          <SubText isDisabled={item.is_listed}>
            {`${item.code ? `${item.code} • ` : ''} ${
              item.custom_unit_name
                ? item.custom_unit_name.toLowerCase()
                : unitsLan(item.unit, common)
            }`}
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

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  min-height: 64px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: calc(100% - 10px);
`;

const Text = styled.p<{ isDisabled: boolean }>`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${({ isDisabled }) => (isDisabled ? '#21272e' : '#909599')};
  margin-bottom: 3px;
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

const SubText = styled.p<{isDisabled: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${({ isDisabled }) => isDisabled ? '#787c80' : '#b4babf'};
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

export default ItemWithoutImages;
