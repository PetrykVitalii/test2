import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { createCatalogActions } from '@/store/actions/createCatalog';
import { selectCatalog, selectIsLoading } from '@/store/selectors/createCatalog';
import { selectPlaceholder, selectCurrency } from '@/store/selectors/user';
import { selectDefaultCatalog } from '@/store/selectors/catalog';

import useLanguage from '@/components/common/hooks/useLanguage';
import useKeyPress from '@/components/common/hooks/useKeyPress';
import useInput from '@/components/common/hooks/useInput';
import useToggle from '@/components/common/hooks/useToggle';
import scrollTo from '@/utils/scrollTo';

import LoaderDots from '@/components/common/LoaderDots';
import CloseIcon from '@/components/common/icons/CloseIcon';
import ButtonWrap from '@/components/common/ButtonWrap';
import Loader from '@/components/common/Loader';
import CatalogCreateStep from '@/components/CatalogCreateStep';
import InputCurrency from '@/components/InputCurrency';
import InputPercentage from '@/components/InputPercentage';
import FixedHeader from '@/components/FixedHeader';
import ButtonDay from '@/components/ButtonDay';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import Modal from './Modal';

interface Props {
  handleCloseCreateCategory: () => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  openModal: boolean;
}

const Step2: React.FC<Props> = ({
  handleCloseCreateCategory,
  handleOpenModal,
  handleCloseModal,
  openModal,
}) => {
  const [{ catalogs, common }] = useLanguage();
  const catalog = useSelector(selectCatalog);
  const isLoading = useSelector(selectIsLoading);
  const currencyPlaceholder = useSelector(selectPlaceholder);
  const currency = useSelector(selectCurrency);
  const defaultCatalog = useSelector(selectDefaultCatalog);

  const [isReady, setIsReady] = useState<boolean>(false);

  const [standartValue, setStandartValue] = useInput('');
  const [minimumOrder, setMinimumOrder] = useInput(
    catalog.minimum_order_value ? `${catalog.minimum_order_value}` : '',
  );
  const [taxAmount, setTaxAmount] = useInput('');
  const [isTaxAmountError, setIsTaxAmountError] = useToggle();

  const [isDeliveryDateChoosable, setIsDeliveryDateChoosable] = useState<boolean>(false);

  const [isError, setIsError] = useToggle();
  const [isFocus, setIsFocus] = useToggle();
  const [isInitialized, setIsInitialized] = useToggle(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const wrapperRef = useRef<any>();

  const enterPress = useKeyPress('Enter');

  const MAX_TAX_RATE = 30.0;
  const DEFAULT_DAYS = [0, 1, 2, 3, 4];
  const DAYS_STRING = [
    common.monday,
    common.tuesday,
    common.wednesday,
    common.thursday,
    common.friday,
    common.saturday,
    common.sunday,
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (defaultCatalog) {
      const defaultStandardCharge = defaultCatalog.standart_charge ? `${defaultCatalog.standart_charge}` : '';
      const standardCharge = catalog.standart_charge ? `${catalog.standart_charge}` : defaultStandardCharge;

      if (defaultCatalog.standart_charge) {
        dispatch(createCatalogActions.changeStandartCharge(+defaultStandardCharge));
      }

      const defaultMov = defaultCatalog.min_order_value ? `${defaultCatalog.min_order_value}` : '';
      const mov = catalog.minimum_order_value ? `${catalog.minimum_order_value}` : defaultMov;

      if (defaultCatalog.min_order_value) {
        dispatch(createCatalogActions.changeMinimumOrderValue(+defaultMov));
      }

      const defaultTaxes = defaultCatalog.tax_amount ? `${defaultCatalog.tax_amount}` : '';
      const taxes = catalog.minimum_order_value ? `${catalog.tax_amount}` : defaultTaxes;

      if (defaultCatalog.tax_amount) {
        dispatch(createCatalogActions.changeTaxAmount(+defaultTaxes));
      }

      setStandartValue(standardCharge);
      setMinimumOrder(mov);
      setTaxAmount(taxes);

      const deliveryDateChoosable = catalog.is_delivery_date_choosable
        ? catalog.is_delivery_date_choosable
        : defaultCatalog.is_delivery_date_choosable;

      setIsDeliveryDateChoosable(deliveryDateChoosable);
      dispatch(createCatalogActions.setIsDeliveryDateChoosable(deliveryDateChoosable));

      if (defaultCatalog.is_delivery_date_choosable && !catalog.is_delivery_date_choosable) {
        dispatch(createCatalogActions.enableDeliveryDays(defaultCatalog.delivery_days));
      }

      setIsReady(true);
    }
  }, [defaultCatalog]);

  useEffect(() => {
    setIsError(false);

    if (catalog.is_delivery_date_choosable || catalog.delivery_days?.length) {
      setIsInitialized(true);
    }

    if (catalog.is_delivery_date_choosable && !catalog.delivery_days.length && !isInitialized) {
      dispatch(createCatalogActions.enableDeliveryDays(DEFAULT_DAYS));
      setIsInitialized(true);
    }
  }, [catalog.is_delivery_date_choosable, catalog.delivery_days]);

  useEffect(() => {
    if (enterPress) {
      handleSendCatalog();
    }
  }, [enterPress]);

  useEffect(() => {
    if (!catalog.name) history.push('/catalogs/new/step1');
  }, []);

  useEffect(() => {
    if (catalog.is_delivery_date_choosable) {
      window.scrollBy({ top: wrapperRef.current.offsetHeight, behavior: 'smooth' });
    }
  }, [catalog.is_delivery_date_choosable]);

  const handleDay = (day: number, newState: boolean) => () => {
    if (newState) {
      dispatch(createCatalogActions.enableDeliveryDay(day));
    } else {
      dispatch(createCatalogActions.disableDeliveryDay(day));
    }
  };

  const handleChangeStandartValue = (value: string) => {
    dispatch(createCatalogActions.changeStandartCharge(+value));
    setStandartValue(value);
  };

  const handleChangeMinimumOrderValue = (value: string) => {
    dispatch(createCatalogActions.changeMinimumOrderValue(+value));
    setMinimumOrder(value);
  };

  const handleChangeTaxAmount = (value: string) => {
    const percent = parseFloat(value);
    dispatch(createCatalogActions.changeTaxAmount(+percent));
    setTaxAmount(value);
    setIsTaxAmountError(false);
  };

  const handleSendCatalog = () => {
    const isExceeding = catalog.tax_amount && (catalog.tax_amount > MAX_TAX_RATE);
    setIsTaxAmountError(!!isExceeding);

    if (isExceeding) {
      return;
    }

    if (!catalog.delivery_days.length && catalog.is_delivery_date_choosable) {
      setIsError(true);
      scrollTo(window.innerHeight);
      return;
    }

    history.push('/catalogs/new/step3');
  };

  const handleChangeChoosableDays = () => {
    setIsDeliveryDateChoosable(!isDeliveryDateChoosable);
    dispatch(createCatalogActions.changeIsDeliveryDateChoosable());
  };

  const getCurrencyPlaceholder = () => `${currency === 'Rp' ? `${currency} 400.000` : currencyPlaceholder}`;

  return (
    isReady ? (
      <>
        <FixedHeader>
          <HeaderWrap>
            <IconWrap onClick={handleOpenModal}>
              <CloseIcon />
            </IconWrap>
            <Title>{catalogs.header_catalog}</Title>
          </HeaderWrap>
        </FixedHeader>
        <ScrollView ref={wrapperRef}>
          <CatalogCreateStep active={[1, 0, 0]} done={[0, 0, 0]} />
          <Container>
            <FlatList>
              <DeliveryFeesWrap>
                <Text>{catalogs.additional_fees_header}</Text>
                <Empty height="35px" />
                <DeliveryWrap>
                  <DeliveryText>{catalogs.delivery_fees_label}</DeliveryText>
                  <InputWrap>
                    <InputCurrency
                      classTracking="catalog standard-charge-input-field"
                      value={standartValue}
                      onChange={handleChangeStandartValue}
                      placeholder={currencyPlaceholder}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                    />
                  </InputWrap>
                </DeliveryWrap>
                <DeliveryWrap>
                  <DeliveryText>{catalogs.min_order_label}</DeliveryText>
                  <InputWrap>
                    <InputCurrency
                      classTracking="catalog min-order-input-field"
                      value={minimumOrder}
                      onChange={handleChangeMinimumOrderValue}
                      placeholder={getCurrencyPlaceholder()}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                    />
                  </InputWrap>
                </DeliveryWrap>
                <DeliveryWrap>
                  <DeliveryText>{catalogs.taxes_label}</DeliveryText>
                  <InputWrap>
                    <InputPercentage
                      classTracking="catalog taxes-input-field"
                      value={taxAmount}
                      onChange={handleChangeTaxAmount}
                      placeholder={catalogs.taxes_placeholder}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      isError={isTaxAmountError}
                      errorMsg={catalogs.taxes_error}
                    />
                  </InputWrap>
                </DeliveryWrap>
              </DeliveryFeesWrap>
              <DeliveryDayWrap isChoosable={isFocus}>
                <FlexColumn>
                  <Text>{catalogs.delivery_date}</Text>
                  <TextCustomersWrap>
                    <TextCustomers>{catalogs.allow_customers}</TextCustomers>
                    <SwitchWrap>
                      <Switch
                        classTrackingOn="catalog choose-dd-toggle-off"
                        classTrackingOff="catalog choose-dd-toggle-on"
                        isActive={isDeliveryDateChoosable}
                        onClick={handleChangeChoosableDays}
                      />
                    </SwitchWrap>
                  </TextCustomersWrap>
                  {isDeliveryDateChoosable && (
                    <>
                      <TextDeliveryDays>{catalogs.header_delivery_days}</TextDeliveryDays>
                      <DaysWrap>
                        {DAYS_STRING.map((value: string, idx: number) => {
                          const current = catalog.delivery_days.includes(idx);
                          return (
                            <ButtonDay
                              key={value}
                              isActive={current}
                              onClick={handleDay(idx, !current)}
                            >
                              {value[0]}
                            </ButtonDay>
                          );
                        })}
                      </DaysWrap>
                      {isError && <Error>{catalogs.header_delivery_days_error}</Error>}
                    </>
                  )}
                </FlexColumn>
              </DeliveryDayWrap>
            </FlatList>
            <ButtonWrap isFixed={!isFocus}>
              <Button shadow onClick={handleSendCatalog} disabled={isLoading}>
                {isLoading ? <LoaderDots /> : common.btn_continue}
              </Button>
            </ButtonWrap>
          </Container>
        </ScrollView>
        {openModal && (
          <Modal
            closeModal={handleCloseModal}
            cleanCatalog={handleCloseCreateCategory}
          />
        )}
      </>
    ) : (
      <>
        <Loader />
      </>
    )
  );
};

const Container = styled.div`
  padding: 0 16px;
  height: 100%;
`;

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const Empty = styled.div<{ height?: string }>`
  height: ${({ height }) => height || '72px'};
`;

const ScrollView = styled.div`
  background: #fff;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const Title = styled.p`
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

const FlatList = styled.div`
  display: flex;
  flex-direction: column;
  min-height: fit-content;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  text-transform: uppercase;
`;

const DeliveryDayWrap = styled.div<{ isChoosable: boolean }>`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  margin-bottom: ${({ isChoosable }) => isChoosable ? '64px' : '134px'};
`;

const DaysWrap = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const DeliveryFeesWrap = styled.div`
  margin-top: 32px;
  min-height: fit-content;
`;

const DeliveryWrap = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputWrap = styled.div`
  min-width: 165px;
  max-width: 165px;
`;

const DeliveryText = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  max-width: 400px;
  margin-right: 24px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextCustomersWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const TextCustomers = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #21272e;
`;

const SwitchWrap = styled.div`
  margin-top: 2px;
  margin-left: 60px;
`;

const TextDeliveryDays = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
  margin-top: 32px;
`;

const Error = styled.p`
  padding-top: 8px;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #feaa22;
`;

export default Step2;
