import React, { useState } from 'react';
import styled from 'styled-components';

import { SortFilters } from '@/store/reducers/dashboard';

import { HandleToggle } from '@/components/common/hooks/useToggle';
import UseWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';
import useLanguage from '@/components/common/hooks/useLanguage';

import RadioButton from '@/components/RadioButton';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hideModal: HandleToggle;
  setFilter: (filterValue: SortFilters) => void;
  filterItems: SortFilters;
}

const ModalFilter: React.FC<Props> = ({ hideModal, setFilter, filterItems }) => {
  const [activeFilter, setActiveFilter] = useState<SortFilters>(filterItems);
  const changeActiveFilter = (filter: SortFilters) => () => setActiveFilter(filter);
  const [{ dashboard, common }] = useLanguage();

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
          <ModalTitle>{dashboard.sort_orders}</ModalTitle>
          <FilterWrap
            className="order sort-orders delivery-date"
            onClick={changeActiveFilter(SortFilters.DELIVERY_DATE)}
          >
            <RadioButtonWrap>
              <RadioButton isActive={activeFilter === SortFilters.DELIVERY_DATE} />
            </RadioButtonWrap>
            <FilterText>{dashboard.delivery_date}</FilterText>
          </FilterWrap>
          <FilterWrap
            className="order sort-orders order-date"
            onClick={changeActiveFilter(SortFilters.ORDER_DATE)}
          >
            <RadioButtonWrap>
              <RadioButton isActive={activeFilter === SortFilters.ORDER_DATE} />
            </RadioButtonWrap>
            <FilterText>{dashboard.order_date}</FilterText>
          </FilterWrap>

          <FilterButton>
            <Button className="order sort-orders cancel-btn" onClick={hideModal}>
              {common.btn_cancel}
            </Button>
            <Button className="order sort-orders ok-btn" onClick={filter}>
              {common.btn_ok}
            </Button>
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
  text-transform: uppercase;
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
