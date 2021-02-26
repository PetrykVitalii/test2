/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Item as InterfaceItem } from '@/store/reducers/items';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle, { HandleToggle } from '@/components/common/hooks/useToggle';
import Input from '@/components/InputAddItem';
import DropDownIcon from '@/components/common/icons/DropDownIcon';
import { Unit } from '@/store/reducers/units';
import { emptyItemsActions } from '@/store/actions/emptyItems';
import unitsLan from '@/utils/unitsLan';
import { Link, useHistory } from 'react-router-dom';
import { selectItems } from '@/store/selectors/emptyItems';
import Modal from './ModalDelete';
import Arrow from '../common/icons/Arrow';

interface Props extends InterfaceItem {
  isValidating: boolean;
  onDelete: () => void;
  length: number;
  units: Unit[];
  index: number;
  setIsInputFocus: (value: boolean) => void;
  setIsSelect: HandleToggle;
  itemRef: any;
}

const Item: React.FC<Props> = ({
  id,
  name,
  unit,
  price,
  customUnit,
  isValidating,
  onDelete,
  length,
  units,
  index,
  setIsInputFocus,
  setIsSelect,
  itemRef,
}) => {
  const [{ authorization, items: itemsLan, common }] = useLanguage();

  const [isActive, setActive] = useState(false);
  const [openModal, setOpenModal] = useToggle();
  const [isInputFocusName, setIsInputFocusName] = useToggle();
  const [isInputFocusPrice, setIsInputFocusPrice] = useToggle();
  const [isInputFocusCustom, setIsInputFocusCustom] = useToggle();

  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFocusName = () => {
    setIsInputFocusName(true);
    setIsInputFocus(true);
  };

  const handleBlurName = () => {
    setIsInputFocusName(false);
    setIsInputFocus(false);
  };

  const handleFocusPrice = () => {
    setIsInputFocusPrice(true);
    setIsInputFocus(true);
  };

  const handleBlurPrice = () => {
    setIsInputFocusPrice(false);
    setIsInputFocus(false);
  };

  const handleFocusCustom = () => {
    setIsInputFocusCustom(true);
    setIsInputFocus(true);
  };

  const handleBlurCustom = () => {
    setIsInputFocusCustom(false);
    setIsInputFocus(false);
  };

  const goToCategory = () => history.push(`/setup/step4/${id}`);

  const changeInfo = (key: keyof Pick<InterfaceItem, 'name' | 'customUnit' | 'price'>) => (
    value: string,
  ) => {
    dispatch(emptyItemsActions.changeInfo(key, id, value));
  };

  const changeUnit = (value: Unit) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(false);
    setIsSelect(false);
    dispatch(emptyItemsActions.changeUnit(id, value));
  };

  const openModalHandler = () => {
    if (!name) {
      onDelete();
      setIsSelect(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleDelete = () => {
    onDelete();
    setIsSelect(false);
  };

  const handleUnitClick = () => {
    setActive((isCurrentActive) => !isCurrentActive);
    setIsSelect(true);
  };

  const closeModalHandler = () => setOpenModal(false);

  const selectRef = useOnClickOutside(() => {
    setActive(false);
    setIsSelect(false);
  });

  return (
    <Wrapper ref={itemRef[id]}>
      <ItemWrapper>
        <Header>
          <CountItem>
            {itemsLan.item}
            {' '}
            {index + 1}
          </CountItem>
          {length !== 1 && (
            <CancelButton className="onboarding add-items delete-card cross-btn" disabled={length === 1} isActive={length > 1} onClick={openModalHandler} />
          )}
        </Header>

        <BoxWrapper>
          <Input
            index={index}
            type="text"
            label={authorization.item_placeholder}
            onChange={changeInfo}
            changeInfoName="name"
            value={name}
            errorMsg={authorization.item_error}
            isError={!name && isValidating}
            onFocus={handleFocusName}
            onBlur={handleBlurName}
            isFocus={isInputFocusName}
            placeText
            autofocus={items.length !== 1}
          />
        </BoxWrapper>

        <BoxWrapper>
          {!!unit.name.length && (
            <Label
              htmlFor="select"
              isFocus={isActive}
              isError={!unit.name && isValidating}
              onClick={handleUnitClick}
            >
              {authorization.item_unit_label}
            </Label>
          )}
          <Option
            id="select"
            ref={selectRef}
            isActive={isActive}
            isError={!unit.name && isValidating}
            onClick={handleUnitClick}
            isLabel={!unit.name}
          >
            <SelectWrap>
              {unit.name.length ? (
                <ContainerName>{unitsLan(unit.name, common)}</ContainerName>
              ) : (
                <EmptyUnit>{authorization.item_unit_label}</EmptyUnit>
              )}
              <IconDropDown active={isActive}>
                <DropDownIcon />
              </IconDropDown>
            </SelectWrap>
            <DropDown>
              {units.map((option, i) => (
                <DropDownItems
                  key={i}
                  onClick={changeUnit(option)}
                  className="item select-unit"
                  statusHover={option.name === unit.name}
                >
                  {unitsLan(option.name, common)}
                </DropDownItems>
              ))}
            </DropDown>
          </Option>
          {!unit.name.length && isValidating && <Error>{authorization.item_unit_error}</Error>}
        </BoxWrapper>

        {unit.name === 'Custom' && (
          <BoxWrapper>
            <Input
              onFocus={handleFocusCustom}
              onBlur={handleBlurCustom}
              isFocus={isInputFocusCustom}
              placeText
              isError={!customUnit && isValidating}
              type="text"
              value={customUnit}
              onChange={changeInfo}
              changeInfoName="customUnit"
              label={itemsLan.unit_custom}
              index={index}
            />
            {!customUnit && isValidating && <Error>{authorization.item_custom_unit_error}</Error>}
          </BoxWrapper>
        )}
        <BoxWrapper>
          <Input
            onFocus={handleFocusPrice}
            onBlur={handleBlurPrice}
            isFocus={isInputFocusPrice}
            placeText
            type="number"
            pattern="\d*"
            inputMode="decimal"
            value={price}
            onChange={changeInfo}
            changeInfoName="price"
            label={itemsLan.item_standard_price}
            index={index}
            isCurrency
          />
        </BoxWrapper>
        <OtherDetailsWrap>
          <OtherDetails className="item other-details other" to={`/setup/step4/${id}`}>{itemsLan.other_details}</OtherDetails>
          <IconRigth onClick={goToCategory}>
            <Arrow color="black" />
          </IconRigth>
        </OtherDetailsWrap>
      </ItemWrapper>

      {openModal && <Modal closeModal={closeModalHandler} deleteItem={handleDelete} />}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const OtherDetailsWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
`;

const OtherDetails = styled(Link)`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: right;
  color: #21272e;
  margin-right: 8px;
  text-decoration: none;
  white-space: nowrap;
`;

const IconRigth = styled.div`
  width: 8px;
  height: 7px;
  cursor: pointer;
`;

const ItemWrapper = styled.div`
  min-height: 48px;
  padding: 18px 16px 20px;
  border-radius: 8px;
  border: solid 1px rgba(33, 39, 46, 0.06);
  background-color: #f4f5f9;
  margin-bottom: 24px;
  
  :last-child {
    margin-bottom: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
`;

const CountItem = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;
`;

const CancelButton = styled.button<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'not-allowed')};

  :before,
  :after {
    position: absolute;
    content: '';
    height: 20px;
    width: 2px;
    background: ${({ isActive }) => (isActive ? '#21272e' : '#c3c3c3')};
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }

  :focus {
    outline: none;
  }
`;

const BoxWrapper = styled.div`
  margin-bottom: 18px;
  position: relative;
  

  :last-child {
    margin: 0;
  }
`;

const Label = styled.label<{ isFocus: boolean; isError: boolean}>`
  position: absolute;
  left: 16px;
  top: 7px;
  z-index: 2;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ isFocus, isError }) => isFocus ? '#3897ff' : isError ? '#feaa22' : '#909599'};
`;

const IconDropDown = styled.div<{ active: boolean }>`
  position: absolute;
  right: 15px;
  top: 18px;
  width: 24px;
  height: 24px;
  transition: 0.5s ease;
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0)')};
`;

const ContainerName = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const EmptyUnit = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909599;
`;

const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropDownItems = styled.div<{ statusHover: boolean }>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 44px;
  letter-spacing: normal;
  color: #21272e;
  width: 100%;
  height: 44px;
  padding: 0 17px;
  background-color: ${({ statusHover }) => (statusHover ? '#f5f6f7' : ' #ffffff')};
  cursor: pointer;
`;

const DropDown = styled.div`
  position: absolute;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.22);
  background-color: #ffffff;
  overflow: auto;
  /* max-height: 190px; */
  width: 100%;
  z-index: 2;
  top: 62px;
  left: 0;
  right: 0;
`;

const Option = styled.div<{ isActive: boolean; isError: boolean; isLabel: boolean }>`
  background-color: #ffffff;
  padding: ${({ isLabel }) => isLabel ? '19px 14px 16px 19px' : '26px 16px 11px 16px'};
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(120, 124, 128, 0.27);
  
  border-bottom: ${({ isError }) => (isError ? '2px solid #feaa22' : '2px solid transparent')};
  border-bottom: ${({ isActive }) => isActive && '2px solid #3897ff'};
  border-radius: 8px 8px 0 0;

  ${DropDown} {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  }
`;

const Error = styled.div`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

export default Item;
