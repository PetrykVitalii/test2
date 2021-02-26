import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { selectCatalogItems, selectCatalog, selectIsLoading } from '@/store/selectors/catalog';
import { editCatalogDetailItems, catalogsActions } from '@/store/actions/catalog';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import CloseIcon from '@/components/common/icons/CloseIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import LoaderDots from '@/components/common/LoaderDots';
import ButtonWrap from '@/components/common//ButtonWrap';

import Search from '@/components/catalogs/create-steps/SearchStep4';
import CardItem from '@/components/catalogs/CardItem';
import FixedHeader from '@/components/FixedHeader';
import Button from '@/components/Button';
import Switch from '@/components/Switch';

interface Props {
  handleToggleEdit: () => void;
}

const CatalogItemEdit: React.FC<Props> = ({ handleToggleEdit }) => {
  const [{ catalogs, common }] = useLanguage();
  const items = useSelector(selectCatalogItems);

  const catalog = useSelector(selectCatalog);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const [isFocusedInput, setIsFocusedInput] = useToggle();
  const [isModalSearch, setIsModalSearch] = useToggle();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  if (catalog === null) return null;

  const hanleSendInfo = () => dispatch(editCatalogDetailItems(catalog.id));

  const { is_custom_pricing_enabled: isCustomPricingState } = catalog;
  const isCustomPricing = catalog.is_default ? false : isCustomPricingState;

  const handleChangeCustomPricing = () => {
    if (!isCustomPricing) {
      window.dataLayer.push({
        event: 'agoraCatalogCustomPricingSubmit',
        formName: 'Agora Catalog Custom Pricing Submit',
      });
    }
    dispatch(catalogsActions.chengeCustomPricing(!isCustomPricing));
  };

  const handleFocusInput = () => {
    setTimeout(() => {
      setIsFocusedInput(true);
    }, 0);
  };

  const handleBlurInput = () => {
    setTimeout(() => {
      setIsFocusedInput(false);
    }, 0);
  };

  const handleChangePrice = (id: number) => (value: string) => {
    dispatch(catalogsActions.changePriceItem(id, +value));
  };

  if (isModalSearch) {
    return (
      <Search
        handleChangePrice={handleChangePrice}
        handleFocusInput={handleFocusInput}
        setEditable={handleChangeCustomPricing}
        items={items}
        setIsModal={setIsModalSearch}
        isCustomPricing={isCustomPricing}
      />
    );
  }

  return (
    <>
      <FixedHeader>
        <HeaderContainer>
          <HeaderWrap>
            <IconWrap onClick={handleToggleEdit}>
              <CloseIcon />
            </IconWrap>
            <HeaderTextWrap>
              <Title>{catalogs.edit_prices}</Title>
              <HeaderText>
                {catalog.is_default ? catalogs.all_items_header : catalog.name}
              </HeaderText>
            </HeaderTextWrap>
            <SearchIconWrap className="catalog item-list search-btn" onClick={setIsModalSearch}>
              <SearchIcon />
            </SearchIconWrap>
          </HeaderWrap>
        </HeaderContainer>
      </FixedHeader>
      <ScrollView isFocus={isFocusedInput}>
        <CustomPricingWrap>
          <SubText>{catalogs.custom_pricing_label}</SubText>
          <PricingWrap>
            <SwitchWrap>
              <Switch
                classTrackingOff="catalog edit-item custom-pricing-toggle-on"
                classTrackingOn="catalog edit-item custom-pricing-toggle-off"
                isActive={isCustomPricing}
                onClick={handleChangeCustomPricing}
              />
            </SwitchWrap>
          </PricingWrap>
        </CustomPricingWrap>
        <CounterText>{catalogs.items_will_show}</CounterText>
        {items
          .slice()
          .sort(
            (a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1,
          )
          .map((item) => (
            <CardItem
              key={item.id}
              isEditable={isCustomPricing}
              item={item}
              onChange={handleChangePrice}
              price={item.price}
              customPrice={item.custom_price}
              handleFocusInput={handleFocusInput}
              handleBlurInput={handleBlurInput}
            />
          ))}
        <ButtonWrap isFixed={!isFocusedInput}>
          <Button
            classTracking="catalog item-list cta-save-changes"
            shadow
            onClick={hanleSendInfo}
            disabled={isLoading}
          >
            {isLoading ? <LoaderDots /> : common.btn_save_changes}
          </Button>
        </ButtonWrap>
      </ScrollView>
    </>
  );
};

const CustomPricingWrap = styled.div`
  display: flex;
  justify-content: space-between;
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

const PricingWrap = styled.div`
  display: flex;
`;

const SwitchWrap = styled.div`
  margin-left: 8px;
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

const HeaderContainer = styled.div`
  padding: 0 24px;
  width: 100%;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollView = styled.div<{ isFocus: boolean }>`
  overflow-y: auto;
  background: #fff;
  padding: ${({ isFocus }) => isFocus ? '24px 16px 0px 16px' : '24px 16px 86px 16px'};
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
`;

const SearchIconWrap = styled.div`
  max-width: 24px;
  max-height: 24px;
  margin-left: 24px;
  cursor: pointer;
`;

const Title = styled.p`
  z-index: 2;
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
  text-transform: capitalize;
`;

const HeaderText = styled.p`
  z-index: 2;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  text-transform: capitalize;
`;

export default CatalogItemEdit;
