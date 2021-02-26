/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Item as InterfaceItem } from '@/store/reducers/items';
import { emptyItemsActions } from '@/store/actions/emptyItems';
import { selectItems } from '@/store/selectors/emptyItems';
import { Unit } from '@/store/reducers/units';

import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle, { HandleToggle } from '@/components/common/hooks/useToggle';

import unitsLan from '@/utils/unitsLan';

import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import DropDownIcon from '@/components/common/icons/DropDownIcon';
import Arrow from '@/components/common/icons/Arrow';

import Input from '@/components/InputAddItem';
import Modal from '@/components/Modal';

interface Props extends InterfaceItem{
  index: number;
  disabled: boolean;
  isValidating: boolean;
  units: Unit[];
  isLoadingUnits: boolean;
  setIsInputFocus: (value: boolean) => void;
  setIsSelect: HandleToggle;
  itemRef: any;
}

const AddItem: React.FC<Props> = ({
  disabled,
  id,
  title,
  name,
  unit,
  customUnit,
  isValidating,
  price,
  index,
  units,
  isLoadingUnits,
  setIsInputFocus,
  setIsSelect,
  itemRef,
}) => {
  const [{ items: itemsLan, common, authorization }] = useLanguage();

  const items = useSelector(selectItems);

  const [isActiveModal, setActiveModal] = useToggle();
  const [isInputFocusName, setIsInputFocusName] = useToggle();
  const [isInputFocusPrice, setIsInputFocusPrice] = useToggle();
  const [isInputFocusCustom, setIsInputFocusCustom] = useToggle();
  const [isActive, setActive] = useState(false);

  const selectRef = useOnClickOutside(() => {
    setActive(false);
    setIsSelect(false);
  });

  const dispatch = useDispatch();

  const handleFocusName = () => {
    setIsInputFocusName(true);
    setIsInputFocus(true);
  };

  const handleBlurName = () => {
    setTimeout(() => {
      setIsInputFocusName(false);
      setIsInputFocus(false);
    }, 0);
  };

  const handleFocusPrice = () => {
    setIsInputFocusPrice(true);
    setIsInputFocus(true);
  };

  const handleBlurPrice = () => {
    setTimeout(() => {
      setIsInputFocusPrice(false);
      setIsInputFocus(false);
    }, 0);
  };

  const handleFocusCustom = () => {
    setIsInputFocusCustom(true);
    setIsInputFocus(true);
  };

  const handleBlurCustom = () => {
    setTimeout(() => {
      setIsInputFocusCustom(false);
      setIsInputFocus(false);
    }, 0);
  };

  const handleUnitClick = () => {
    if (!isLoadingUnits) {
      setActive((isCurrentActive) => !isCurrentActive);
      setIsSelect(true);
    }
  };

  const removeItem = () => {
    if (!disabled) {
      if (name || customUnit || price) {
        setActiveModal(true);
        setIsSelect(true);
      } else {
        deleteAddItem();
      }
    }
  };

  const deleteAddItem = () => {
    dispatch(emptyItemsActions.deleteItem(id));
  };

  const changeUnit = (value: Unit) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(false);
    setIsSelect(false);
    dispatch(emptyItemsActions.changeUnit(id, value));
  };

  const changeInfo = (key: keyof Pick<InterfaceItem, 'name' | 'customUnit' | 'price'>) => ( /// is corr?
    value: string,
  ) => {
    dispatch(emptyItemsActions.changeInfo(key, id, value));
  };

  return (
    <AddItemWrap ref={itemRef[id]}>
      <AddItemSmallWrap>
        <CountItem>
          {itemsLan.item}
          {' '}
          {title}
        </CountItem>
        {!disabled && (
          <CancelButton className="item delete-card cross-btn" opacity={disabled ? '0.5' : '1'} onClick={removeItem}>
            <PlusIcon width="26px" height="26px" />
          </CancelButton>
        )}
      </AddItemSmallWrap>
      <Label>
        <Input
          type="text"
          onChange={changeInfo}
          changeInfoName="name"
          value={name}
          label={itemsLan.item_name}
          placeText
          isError={!name && isValidating}
          errorMsg={itemsLan.item_name_required}
          index={index}
          onFocus={handleFocusName}
          onBlur={handleBlurName}
          isFocus={isInputFocusName}
          autofocus={items.length !== 1}
        />
      </Label>
      <BoxWrapper>
        {unit.name && (
        <LabelSelect
          htmlFor="select"
          isFocus={isActive}
          isError={!unit.name && isValidating}
          onClick={handleUnitClick}
        >
          {itemsLan.unit}
        </LabelSelect>
        )}
        <Option
          className={isActive ? '' : 'item add-unit'}
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
              <EmptyUnit>{isLoadingUnits ? 'Loading...' : itemsLan.unit}</EmptyUnit>
            )}
            <IconDropDown active={isActive}>
              <DropDownIcon />
            </IconDropDown>
          </SelectWrap>
          <DropDown>
            {units.map((option, i) => (
              <DropDownItems
                key={i}
                className="item select-unit"
                onClick={changeUnit(option)}
                statusHover={option.name === unit.name}
              >
                {unitsLan(option.name, common)}
              </DropDownItems>
            ))}
          </DropDown>
        </Option>
        {!unit.name.length && isValidating && <Error>{itemsLan.unit_required}</Error>}
      </BoxWrapper>
      {unit.name === 'Custom' && (
        <Label>
          <Input
            type="text"
            placeText
            value={customUnit}
            onChange={changeInfo}
            changeInfoName="customUnit"
            label={itemsLan.unit_custom}
            isError={!customUnit && isValidating}
            errorMsg={itemsLan.unit_custom_required}
            index={index}
            onFocus={handleFocusCustom}
            onBlur={handleBlurCustom}
            isFocus={isInputFocusCustom}
          />
        </Label>
      )}
      <Label>
        <Input
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
          onFocus={handleFocusPrice}
          onBlur={handleBlurPrice}
          isFocus={isInputFocusPrice}
        />
      </Label>
      <OtherDetailsWrap>
        <OtherDetails className="item other-details other" to={`/advanced-details/${id}`}>{itemsLan.other_details}</OtherDetails>
        <IconRigth>
          <Arrow color="black" />
        </IconRigth>
      </OtherDetailsWrap>
      {isActiveModal && (
        <Modal
          classTrackingBtnLeft="item delete-item cancel-btn"
          classTrackingBtnRight="item delete-item delete-btn"
          confirm={deleteAddItem}
          closeModal={() => setActiveModal(false)}
          title={authorization.modal_delete_title}
          text={itemsLan.sure_item_delete}
          leftBtn={common.btn_cancel}
          rightBtn={authorization.btn_remove}
        />
      )}
    </AddItemWrap>
  );
};

const ContainerName = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const Error = styled.div`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
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

const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const IconDropDown = styled.div<{ active: boolean }>`
  position: absolute;
  right: 15px;
  top: 17px;
  width: 24px;
  height: 24px;
  transition: 0.5s ease;
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0)')};
`;

const EmptyUnit = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909599;
`;

const Option = styled.div<{ isActive: boolean; isError: boolean; isLabel: boolean }>`
  padding: ${({ isLabel }) => isLabel ? '19px 14px 16px 19px' : '26px 16px 11px 16px'};
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(120, 124, 128, 0.27);
  border-bottom: ${({ isError }) => (isError ? '2px solid #feaa22' : '2px solid transparent')};
  border-bottom: ${({ isActive }) => isActive && '2px solid #3897ff'};
  border-radius: 8px 8px 0 0;
  background-color: white;
  ${DropDown} {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  }
`;

const BoxWrapper = styled.div`
  position: relative;
  height: 80px;
  :last-child {
    margin: 0;
  }
`;

const LabelSelect = styled.label<{ isFocus: boolean; isError: boolean}>`
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

const OtherDetailsWrap = styled.div`
  display: flex;
  align-items: center;
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
`;

const Label = styled.div`
  height: 80px;
  width: 100%;
  position: relative;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const CancelButton = styled.div<{ opacity: string}>`
  cursor: pointer;
  width: 26px;
  height: 26px;
  transform: rotate(45deg);
  opacity: ${({ opacity }) => opacity && opacity};
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

const AddItemSmallWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  align-items: center;
`;

const AddItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: solid 1px rgba(33, 39, 46, 0.06);
  background-color: #f4f5f9;
  margin: 12px 0;
  padding: 16px 16px 24px;
`;

export default AddItem;
