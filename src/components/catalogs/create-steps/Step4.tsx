import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCatalog, selectIsLoading, selectIsCustomPricingEnabled, selectItems,
} from '@/store/selectors/createCatalog';
import { createCatalogActions, sendCatalog } from '@/store/actions/createCatalog';
import { catalogsActions } from '@/store/actions/catalog';

import useLanguage from '@/components/common/hooks/useLanguage';
import useKeyPress from '@/components/common/hooks/useKeyPress';
import useToggle from '@/components/common/hooks/useToggle';

import Search from '@/components/catalogs/create-steps/SearchStep4';
import Modal from '@/components/catalogs/create-steps/Modal';

import SearchIcon from '@/components/common/icons/SearchIcon';
import CloseIcon from '@/components/common/icons/CloseIcon';
import CheckWhite from '@/components/common/icons/dashboard/Check';
import CardItem from '@/components/catalogs/CardItem';
import CatalogCreateStep from '@/components/CatalogCreateStep';
import ButtonWrap from '@/components/common/ButtonWrap';
import FixedHeader from '@/components/FixedHeader';
import Button from '@/components/Button';
import Switch from '@/components/Switch';

interface Props {
  handleCloseCreateCategory: () => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  openModal: boolean;
}

const Step4: React.FC<Props> = ({
  handleCloseCreateCategory,
  handleOpenModal,
  handleCloseModal,
  openModal,
}) => {
  const [{ catalogs }] = useLanguage();
  const catalog = useSelector(selectCatalog);
  const isLoading = useSelector(selectIsLoading);

  const [isModal, setIsModal] = useToggle();
  const [isFocusedInput, setIsFocusedInput] = useToggle();

  const enterPress = useKeyPress('Enter');

  const history = useHistory();
  const dispatch = useDispatch();

  const isCustomPricingEnabled = useSelector(selectIsCustomPricingEnabled);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (enterPress) {
      handleNextStep();
    }
  }, [enterPress]);

  useEffect(() => {
    if (!catalog.name) history.push('/catalogs/new/step1');
  }, []);

  const setEditable = () => {
    if (!isCustomPricingEnabled) {
      window.dataLayer.push({
        event: 'agoraCatalogCustomPricingSubmit',
        formName: 'Agora Catalog Custom Pricing Submit',
      });
    }
    dispatch(createCatalogActions.setIsCustomPricingEnabled(!isCustomPricingEnabled));
  };

  const handleNextStep = () => {
    dispatch(catalogsActions.setCatalogItems(catalog.items));
    dispatch(sendCatalog());
  };

  const createCategoryItems = useSelector(selectItems);

  const handleFocusInput = () => setIsFocusedInput(!isFocusedInput);

  const handleChangePrice = (id: number) => (value: string) => {
    dispatch(createCatalogActions.changePriceItem(id, +value));
  };

  if (isModal) {
    return (
      <Search
        handleChangePrice={handleChangePrice}
        handleFocusInput={handleFocusInput}
        setEditable={setEditable}
        items={createCategoryItems}
        setIsModal={setIsModal}
        isCustomPricing={isCustomPricingEnabled}
      />
    );
  }

  return (
    <ContainerWrap>
      <FixedHeader>
        <HeaderWrap>
          <IconWrap onClick={handleOpenModal}>
            <CloseIcon />
          </IconWrap>
          <Title>{catalogs.header_catalog}</Title>
          <SearchIconWrap
            className="catalog item-list search-btn"
            onClick={setIsModal}
          >
            <SearchIcon />
          </SearchIconWrap>
        </HeaderWrap>
      </FixedHeader>
      <ScrollView>
        <CatalogCreateStep active={[1, 1, 1]} done={[1, 1, 0]} />
        <Container isFixed={!isFocusedInput}>
          <CustomPricingWrap>
            <SubText>{catalogs.custom_pricing_label}</SubText>
            <PricingWrap>
              <SwitchWrap>
                <Switch
                  isActive={isCustomPricingEnabled}
                  onClick={setEditable}
                  classTrackingOff="catalog edit-item custom-pricing-toggle-off"
                  classTrackingOn="catalog edit-item custom-pricing-toggle-on"
                />
              </SwitchWrap>
            </PricingWrap>
          </CustomPricingWrap>
          <CounterText>{catalogs.items_will_show}</CounterText>
          {createCategoryItems.slice().sort(
            (a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()
              ? 1 : -1,
          ).map((item) => (
            <CardItem
              key={item.id}
              item={item}
              isEditable={isCustomPricingEnabled}
              onChange={handleChangePrice}
              price={item.price}
              customPrice={item.custom_price}
              handleFocusInput={handleFocusInput}
            />
          ))}
        </Container>
        <ButtonWrap
          isFixed={!isFocusedInput}
          maxWidth={552}
          padding="0 16px"
          width="100%"
        >
          <Button
            isLoading={isLoading}
            shadow
            onClick={handleNextStep}
          >
            <>
              <WhiteText>{catalogs.btn_create_catalog}</WhiteText>
              <CheckWhite />
            </>
          </Button>
        </ButtonWrap>
      </ScrollView>
      {openModal && (
        <Modal
          closeModal={handleCloseModal}
          cleanCatalog={handleCloseCreateCategory}
        />
      )}
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  min-height: 100%;
  background-color: white;
  position: relative;
`;

const WhiteText = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #ffffff;
  margin-right: 6px;
`;

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const ScrollView = styled.div`
  background: #fff;
  position: relative;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const Container = styled.div<{ isFixed: boolean }>`
  padding: ${({ isFixed }) => isFixed ? '32px 16px 86px 16px' : '32px 16px 16px 16px'};
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const Title = styled.div`
  z-index: 2;
  grid-area: input / input / input / input;
  height: 100%;
  padding: 0 24px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SubText = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #21272e;
`;

const CounterText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  margin: 8px 0 24px;
  width: calc(100% - 50px);
`;

const CustomPricingWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PricingWrap = styled.div`
  display: flex;
`;

const SwitchWrap = styled.div`
  margin-left: 8px;
`;

const SearchIconWrap = styled.div`
  max-width: 24px;
  max-height: 24px;
  margin-left: 24px;
  margin-left: auto;
  cursor: pointer;
`;

export default Step4;
