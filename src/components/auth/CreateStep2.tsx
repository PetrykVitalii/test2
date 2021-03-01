import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectCatalog, selectIsDefaultLoading } from '@/store/selectors/catalog';
import { selectPlaceholder, selectCurrency } from '@/store/selectors/user';
import Switch from '@/components/Switch';
import Button from '@/components/Button';
import { catalogsActions, editDefaultCatalog } from '@/store/actions/catalog';
import useLanguage from '../common/hooks/useLanguage';
import TruckIcon from '../common/icons/TruckIcon';
import InputCurrency from '../InputCurrency';
import InputPercentage from '../InputPercentage';
import InfoContainer from './InfoContainer';
import ButtonDay from '../ButtonDay';
import useToggle from '../common/hooks/useToggle';
import LoaderDots from '../common/LoaderDots';

interface Props {}

const CreateStep2: React.FC<Props> = () => {
  const [{ catalogs, common, authorization }] = useLanguage();
  const catalog = useSelector(selectCatalog);

  const currancyPlaceholder = useSelector(selectPlaceholder);
  const currency = useSelector(selectCurrency);
  const [isError, setIsError] = useToggle();
  const [isTaxAmountError, setIsTaxAmountError] = useToggle(false);

  const isDefaultLoading = useSelector(selectIsDefaultLoading);

  const dispatch = useDispatch();

  const wrapperRef = useRef<any>();
  const [isInitialized, setIsInitialized] = useToggle(false);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    setIsError(false);

    if (catalog?.is_delivery_date_choosable && catalog?.delivery_days?.length) {
      setIsInitialized(true);
    }

    if (catalog?.is_delivery_date_choosable && !catalog?.delivery_days?.length && !isInitialized) {
      dispatch(catalogsActions.enableDeliveryDays(DEFAULT_DAYS));
      setIsInitialized(true);
    }
  }, [catalog && catalog.is_delivery_date_choosable, catalog && catalog.delivery_days]);

  useEffect(() => {
    if (catalog && catalog.is_delivery_date_choosable) {
      window.scrollBy({ top: wrapperRef.current.offsetHeight, behavior: 'smooth' });
    }
  }, [catalog && catalog?.is_delivery_date_choosable]);

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

  const handleChangeStandartValue = (value: string) => {
    dispatch(catalogsActions.changeStandartCharge(+value));
  };

  const handleChangeMinimumOrderValue = (value: string) => {
    dispatch(catalogsActions.changeMinOrderValue(+value));
  };

  const handleChangeTaxValue = (value: string) => {
    dispatch(catalogsActions.changeTaxAmount(+value));
    setIsTaxAmountError(false);
  };

  const handleChangeChoosableDays = () => {
    dispatch(catalogsActions.changeIsDeliveryDateChoosable(!catalog!.is_delivery_date_choosable));
  };

  const handleDay = (day: number, newState: boolean) => () => {
    if (newState) {
      dispatch(catalogsActions.enableDeliveryDay(day));
    } else {
      dispatch(catalogsActions.disableDeliveryDay(day));
    }
  };

  const handleSendCatalog = () => {
    const isExceeding = catalog?.tax_amount && (catalog.tax_amount > MAX_TAX_RATE);
    setIsTaxAmountError(!!isExceeding);

    if (isExceeding) {
      return;
    }

    if (catalog && !catalog.delivery_days.length && catalog.is_delivery_date_choosable) {
      setIsError(true);
      return;
    }
    if (isError) return;
    dispatch(editDefaultCatalog(catalog!.id));
    dispatch(catalogsActions.setIsComming(false));
  };

  const getCurrencyPlaceholder = () => `${currency === 'Rp' ? `${currency} 400.000` : currancyPlaceholder}`;

  return (
    <>
      <InfoContainer
        classTracking="onboarding info-panel"
        image={<TruckIcon />}
        text={authorization.your_customers}
      />
      <DeliveryFeesWrap ref={wrapperRef}>
        <Text>{catalogs.additional_fees_header}</Text>
        <DeliveryWrap>
          <DeliveryText>{catalogs.delivery_fees_label}</DeliveryText>
          <InputWrap>
            <InputCurrency
              classTracking="catalog standard-charge-input-field"
              value={catalog?.standart_charge || ''}
              onChange={handleChangeStandartValue}
              placeholder={currancyPlaceholder}
            />
          </InputWrap>
        </DeliveryWrap>
        <DeliveryWrap>
          <DeliveryText>{catalogs.min_order_label}</DeliveryText>
          <InputWrap>
            <InputCurrency
              classTracking="catalog min-order-input-field"
              value={catalog?.min_order_value || ''}
              onChange={handleChangeMinimumOrderValue}
              placeholder={getCurrencyPlaceholder()}
            />
          </InputWrap>
        </DeliveryWrap>

        <DeliveryWrap>
          <DeliveryText>{catalogs.taxes_label}</DeliveryText>
          <InputWrap>
            <InputPercentage
              classTracking="catalog taxes-input-field"
              value={catalog?.tax_amount || ''}
              onChange={handleChangeTaxValue}
              placeholder={catalogs.taxes_placeholder}
              isError={isTaxAmountError}
              errorMsg={catalogs.taxes_error}
            />
          </InputWrap>
        </DeliveryWrap>
      </DeliveryFeesWrap>
      <DeliveryDayWrap>
        <FlexColumn>
          <Text>{catalogs.delivery_date}</Text>
          <TextCustomersWrap>
            <TextCustomers>{catalogs.allow_customers}</TextCustomers>
            <SwitchWrap>
              <Switch
                classTrackingOn="catalog choose-dd-toggle-off"
                classTrackingOff="catalog choose-dd-toggle-on"
                isActive={catalog!.is_delivery_date_choosable}
                onClick={handleChangeChoosableDays}
              />
            </SwitchWrap>
          </TextCustomersWrap>
          {catalog?.is_delivery_date_choosable && (
            <>
              <TextDeliveryDays>{catalogs.header_delivery_days}</TextDeliveryDays>
              <DaysWrap>
                {DAYS_STRING.map((value: string, idx: number) => {
                  const current = catalog.delivery_days.includes(idx);
                  return (
                    <ButtonDay key={value} isActive={current} onClick={handleDay(idx, !current)}>
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
      <BtnWrap>
        <Button
          classTracking="onboarding cta-create-catalog"
          shadow
          onClick={handleSendCatalog}
          disabled={isDefaultLoading}
        >
          {isDefaultLoading ? <LoaderDots /> : catalogs.btn_create_catalog}
        </Button>
      </BtnWrap>
    </>
  );
};

const BtnWrap = styled.div`
  margin-top: auto;
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

const TextCustomersWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
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

const DaysWrap = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeliveryDayWrap = styled.div`
  margin-top: 32px;
  margin-bottom: 54px;
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

const InputWrap = styled.div`
  min-width: 165px;
  max-width: 165px;
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

  &:nth-child(2n) {
    margin-top: 35px;
  }
`;

export default CreateStep2;
