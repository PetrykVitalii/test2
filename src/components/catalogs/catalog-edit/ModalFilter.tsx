import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectUserItems } from '@/store/selectors/items';
import { Filters } from '@/store/reducers/items';

import { HandleToggle } from '@/components/common/hooks/useToggle';
import UseWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';
import useLanguage from '@/components/common/hooks/useLanguage';

import RadioButton from '@/components/RadioButton';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hideModal: HandleToggle;
  setFilter: (filterValue: number) => void;
  filterItems: number;
}

const ModalFilter: React.FC<Props> = ({ hideModal, setFilter, filterItems }) => {
  const [activeFilter, setActiveFilter] = useState(filterItems);
  const changeActiveFilter = (filter: Filters) => () => setActiveFilter(filter);
  const userItems = useSelector(selectUserItems);
  const [{ items: itemsLan, common }] = useLanguage();

  UseWindowScrollBlock();

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const filter = () => {
    setFilter(activeFilter);
    hideModal(false);
  };

  return (
    <>
      <Background onClick={hideModal}>
        <Modal onClick={stopPropagation}>
          <ModalTitle>{itemsLan.filter_items}</ModalTitle>
          <FilterWrap className="item-list filter-all-items" onClick={changeActiveFilter(Filters.ALL)}>
            <RadioButtonWrap>
              <RadioButton isActive={activeFilter === Filters.ALL} />
            </RadioButtonWrap>
            <FilterText>
              {itemsLan.filter_all_items}
              {' '}
              (
              {userItems.length}
              )
            </FilterText>
          </FilterWrap>
          <FilterWrap className="item-list filter-listed" onClick={changeActiveFilter(Filters.LISTED)}>
            <RadioButtonWrap>
              <RadioButton isActive={activeFilter === Filters.LISTED} />
            </RadioButtonWrap>
            <FilterText>
              {itemsLan.filter_listed_items}
              {' '}
              (
              {userItems.filter((item) => item.is_listed).length}
              )
            </FilterText>
          </FilterWrap>
          <FilterWrap className="item-list filter-hidden" onClick={changeActiveFilter(Filters.HIDDEN)}>
            <RadioButtonWrap>
              <RadioButton isActive={activeFilter === Filters.HIDDEN} />
            </RadioButtonWrap>
            <FilterText>
              {itemsLan.filter_hidden_items}
              {' '}
              (
              {userItems.filter((item) => !item.is_listed).length}
              )
            </FilterText>
          </FilterWrap>
          <FilterButton>
            <Button className="item-filter cancel-btn" onClick={hideModal}>{common.btn_cancel}</Button>
            <Button className="item-filter ok-btn" onClick={filter}>{common.btn_ok}</Button>
          </FilterButton>
        </Modal>
      </Background>
    </>
  );
};

const Button = styled.div`
  cursor: pointer;
  width: 75px;
  height: 36px;
  border-radius: 2px;
  font-size: 14.5px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  color: rgb(56 151 255);
  line-height: 50px;
`;

const FilterButton = styled.div`
  height: 52px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FilterText = styled.div`
  font-size: 14.5px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.3px;
  color: #21272e;
  margin-left: 31.5px;
`;

const FilterWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
  padding-left: 3px;
`;

const RadioButtonWrap = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: #21272e;
  margin-bottom: 35px;
`;

const Modal = styled.div`
  width: 280px;
  border-radius: 6px;
  padding: 24px 8px 8px 24px;
  background-color: white;
`;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ModalFilter;
