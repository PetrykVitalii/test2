import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { selectCatalog, selectIsComming, selectIsLoading } from '@/store/selectors/catalog';
import { catalogsActions, editCatalogDetail, getCatalog } from '@/store/actions/catalog';
import { selectPlaceholder, selectCurrency } from '@/store/selectors/user';

import calcMultiRangeDate from '@/utils/calcMultiRangeDate';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import useInput from '@/components/common/hooks/useInput';

import LoaderDots from '@/components/common/LoaderDots';
import CloseIcon from '@/components/common/icons/CloseIcon';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import Loader from '@/components/common/Loader';
import CatalogCard from '@/components/catalogs/CatalogCard';
import MultyRange from '@/components/MultyRange';
import TextArea from '@/components/TextArea';
import ButtonDay from '@/components/ButtonDay';
import Button from '@/components/Button';
import InputCurrency from '@/components/InputCurrency';
import InputPercentage from '@/components/InputPercentage';
import Input from '@/components/Input';
import Switch from '@/components/Switch';
import FixedHeader from '@/components/FixedHeader';

interface Props extends RouteComponentProps<{ id: string }> {}

const BussinesDetails: React.FC<Props> = ({ match }) => {
  const [{ catalogs, common, authorization }] = useLanguage();
  const catalog = useSelector(selectCatalog);
  const currencyPlaceholder = useSelector(selectPlaceholder);
  const currency = useSelector(selectCurrency);
  const isLoading = useSelector(selectIsLoading);
  const isComming = useSelector(selectIsComming);

  const dispatch = useDispatch();
  const history = useHistory();

  const wrapperRef = useRef<any>();

  const [isChoosableDays, setIsChoosableDays] = useToggle(catalog?.is_delivery_date_choosable);
  const [isInitialized, setIsInitialized] = useToggle(false);

  const [isToggleSwitch, setIsToggleSwitch] = useToggle();
  const [standartValue, setStandartValue] = useInput();
  const [minimumOrder, setMinimumOrder] = useInput();
  const [catalogName, setCatalogName] = useInput(catalog?.name);
  const [taxAmount, setTaxAmount] = useInput();

  const [deliveryDays, setDeliveryDays] = useState(catalog?.delivery_days);
  const [isNameError, toggleIsNameError] = useToggle();
  const [isDaysError, setIsDaysError] = useToggle();
  const [isTextAreaError, setIsTextAreaError] = useToggle(false);
  const [isTaxAmountError, setIsTaxAmountError] = useToggle(false);

  const [leftInput, setLeftInput] = useState<number>(0);
  const [rightInput, setRightInput] = useState<number>(0);

  const handleBack = () => history.push(`/catalogs/${match.params.id}`);

  const goToCategory = () => history.push(`/catalogs/${match.params.id}/category`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (catalog === null) {
      dispatch(getCatalog(+match.params.id));
    }
  }, []);

  useEffect(() => {
    if (!catalog) return;

    setStandartValue(catalog.standart_charge?.toString() || '');
    setMinimumOrder(catalog.min_order_value?.toString() || '');
    setTaxAmount(catalog.tax_amount?.toString() || '');
  }, [catalog?.standart_charge, catalog?.min_order_value, catalog?.tax_amount]);

  useEffect(() => {
    if (!catalog) return;
    if (!(leftInput === rightInput)) return;

    setLeftInput(+catalog.delivery_time_from.slice(0, 2));
    setRightInput(+catalog.delivery_time_to.slice(0, 2));
  }, [catalog?.delivery_time_from, catalog?.delivery_time_to]);

  useEffect(() => {
    if (!catalog) return;
    if (catalog!.name) {
      setCatalogName(catalog!.name);
    }
  }, [catalog?.name]);

  useEffect(() => {
    if (!catalog) return;
    if (catalog!.description) {
      if (catalog!.description.length > 350) setIsTextAreaError(true);
      if (catalog!.description.length <= 350) setIsTextAreaError(false);
    }
  }, [catalog?.description]);

  useEffect(() => {
    if (!catalogName) {
      toggleIsNameError(true);
    } else {
      toggleIsNameError(false);
    }
  }, [catalogName]);

  useEffect(() => {
    setDeliveryDays(catalog?.delivery_days);
  }, [catalog]);

  useEffect(() => {
    setIsDaysError(false);

    if (isChoosableDays || deliveryDays?.length) {
      setIsInitialized(true);
    }

    if (isChoosableDays && !deliveryDays?.length && !isInitialized) {
      dispatch(catalogsActions.enableDeliveryDays(DEFAULT_DAYS));
      setIsInitialized(true);
    }
  }, [deliveryDays, isChoosableDays]);

  useEffect(() => {
    if (isToggleSwitch) {
      if (isChoosableDays) {
        window.scrollBy({ top: wrapperRef.current.offsetHeight, behavior: 'smooth' });
      }
    }
  }, [isToggleSwitch]);

  if (catalog === null || !isComming) {
    return (
      <>
        <FixedHeader>
          <IconWrap onClick={handleBack}>
            <CloseIcon />
          </IconWrap>
          <FlexColumn>
            <LoaderDots />
          </FlexColumn>
        </FixedHeader>
        <Loader />
      </>
    );
  }

  const { category } = catalog;

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

  const handleChangeChoosableDays = () => {
    setIsToggleSwitch(true);
    setIsChoosableDays(!isChoosableDays);
    setTimeout(() => setIsToggleSwitch(false), 100);
  };

  const handleDay = (day: number, newState: boolean) => () => {
    if (newState) {
      dispatch(catalogsActions.enableDeliveryDay(day));
    } else {
      dispatch(catalogsActions.disableDeliveryDay(day));
    }
  };

  const handleStandartValue = (value: string) => {
    setStandartValue(value);
    dispatch(catalogsActions.changeStandartCharge(!value.length ? null : +value));
  };

  const handleMinOrderValue = (value: string) => {
    setMinimumOrder(value);
    dispatch(catalogsActions.changeMinOrderValue(!value.length ? null : +value));
  };

  const handleTaxAmountValue = (value: string) => {
    const percent = parseFloat(value);
    dispatch(catalogsActions.changeTaxAmount(!value.length ? null : +percent));
    setTaxAmount(value);
    setIsTaxAmountError(false);
  };

  const handleDescription = (value: string) => {
    dispatch(catalogsActions.changeDescription(value));
  };

  const sendInfo = () => {
    const isExceeding = catalog.tax_amount && (catalog.tax_amount > MAX_TAX_RATE);
    setIsTaxAmountError(!!isExceeding);

    if (isExceeding) {
      return;
    }

    if (deliveryDays && !deliveryDays.length && isChoosableDays) {
      setIsDaysError(true);
      return;
    }

    if ((!catalogName && !catalog.is_default) || isTextAreaError || isDaysError) return;

    dispatch(catalogsActions.changeIsDeliveryDateChoosable(isChoosableDays));

    dispatch(
      catalogsActions.setDeliveryTime(
        leftInput < 10 ? `0${leftInput}:00:00` : `${leftInput}:00:00`,
        rightInput < 10 ? `0${rightInput}:00:00` : `${rightInput}:00:00`,
      ),
    );
    dispatch(catalogsActions.setCatalogName(catalogName));
    dispatch(editCatalogDetail(catalog.id));
  };

  const getCurrencyPlaceholder = () => `${currency === 'Rp' ? `${currency} 400.000` : currencyPlaceholder}`;

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <IconWrap onClick={handleBack}>
            <CloseIcon />
          </IconWrap>
          <FlexColumn>
            <Title>{catalog.is_default ? catalogs.all_items_header : catalogName}</Title>
            <HeaderText>{catalogs.edit_business_details_header}</HeaderText>
          </FlexColumn>
        </HeaderWrap>
      </FixedHeader>
      <ScrollView ref={wrapperRef}>
        <Container>
          {!catalog.is_default && (
            <CatalogNameWrap>
              <Input
                value={catalogName}
                onChange={setCatalogName}
                label={catalogs.catalog_name_label}
                isError={isNameError}
                errorMsg={catalogs.catalog_name_error}
              />
            </CatalogNameWrap>
          )}
          <CategoryWrap>
            <Text>{catalogs.catalog_category}</Text>
            {category.name.length ? (
              <CatalogCardWrap
                className="catalog business-details cta-select-category"
                onClick={goToCategory}
              >
                <CatalogCard data={category} icon={<SmallArrowIcon />} />
              </CatalogCardWrap>
            ) : (
              <EmptyCategory
                className="catalog business-details cta-select-category"
                onClick={goToCategory}
              >
                {catalogs.category_placeholder}
                <SmallArrowIcon />
              </EmptyCategory>
            )}
          </CategoryWrap>
          <HoursWrap>
            <FlexColumn>
              <SpaceBetween>
                <Text>{catalogs.operating_hours_label}</Text>
                <TextBlack>
                  {calcMultiRangeDate(leftInput, rightInput, true, catalogs.operating_hours_day)}
                </TextBlack>
              </SpaceBetween>
              <RangeWrap>
                <MultyRange
                  leftInput={leftInput}
                  setLeftInput={setLeftInput}
                  rightInput={rightInput}
                  setRightInput={setRightInput}
                />
              </RangeWrap>
            </FlexColumn>
          </HoursWrap>

          <TextAreaWrap>
            <TextArea
              name={catalogs.description_label}
              placeholder={authorization.deliver_within}
              descriptionValue={catalog.description}
              setDescription={handleDescription}
              isError={isTextAreaError}
              height={96}
              maxLength={350}
            />
            <TextAreaLength>
              {`${catalog.description ? catalog.description.length : '0'} / 350`}
            </TextAreaLength>
          </TextAreaWrap>

          <DeliveryFeesWrap>
            <Text>{catalogs.additional_fees_header}</Text>
            <DeliveryWrap>
              <DeliveryText>{catalogs.delivery_fees_label}</DeliveryText>
              <InputWrap>
                <InputCurrency
                  classTracking="catalog standard-charge-input-field"
                  value={standartValue}
                  onChange={handleStandartValue}
                  placeholder={currencyPlaceholder}
                />
              </InputWrap>
            </DeliveryWrap>
            <DeliveryWrap>
              <DeliveryText>{catalogs.min_order_label}</DeliveryText>
              <InputWrap>
                <InputCurrency
                  classTracking="catalog min-order-input-field"
                  value={minimumOrder}
                  onChange={handleMinOrderValue}
                  placeholder={getCurrencyPlaceholder()}
                />
              </InputWrap>
            </DeliveryWrap>
            <DeliveryWrap>
              <DeliveryText>{catalogs.taxes_label}</DeliveryText>
              <InputWrap>
                <InputPercentage
                  classTracking="catalog min-order-input-field"
                  value={taxAmount}
                  onChange={handleTaxAmountValue}
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
                    isActive={isChoosableDays}
                    onClick={handleChangeChoosableDays}
                  />
                </SwitchWrap>
              </TextCustomersWrap>
              {isChoosableDays && (
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
                  {isDaysError && <Error>{catalogs.header_delivery_days_error}</Error>}
                </>
              )}
            </FlexColumn>
          </DeliveryDayWrap>

          <ButtonWrap>
            <Button
              classTracking="catalog business-details cta-save"
              shadow
              onClick={sendInfo}
              disabled={isLoading}
            >
              {isLoading ? <LoaderDots /> : common.btn_save}
            </Button>
          </ButtonWrap>
        </Container>
      </ScrollView>
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;

  padding: 12px 24px;
`;

const ScrollView = styled.div`
  min-height: calc(100vh - 72px);
  background: #fff;
`;

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
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

  word-break: break-word;
  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.3;
  }
`;

const HeaderText = styled.p`
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
`;

const Container = styled.div`
  padding: 0 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HoursWrap = styled.div`
  margin-top: 42px;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
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

const TextBlack = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const RangeWrap = styled.div`
  margin-top: 28px;
`;

const TextAreaWrap = styled.div`
  margin-top: 60px;
`;

const TextAreaLength = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #787c80;
  margin-top: -2px;
`;

const DeliveryDayWrap = styled.div`
  margin-top: 52px;
  margin-bottom: 57px;
`;

const DaysWrap = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const DeliveryFeesWrap = styled.div`
  margin-top: 32px;
`;

const DeliveryWrap = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:nth-child(1) {
    margin-top: 35px;
  }

  :last-child {
    margin-bottom: 0;
  }
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
  margin-right: 24px;
`;

const ButtonWrap = styled.div`
  margin-top: auto;
  margin-bottom: 24px;
`;

const CatalogNameWrap = styled.div`
  margin-top: 51px;
`;

const CategoryWrap = styled.div`
  margin-top: 37px;
`;

const EmptyCategory = styled.div`
  height: 72px;
  padding: 26px 20px 27px;
  margin-top: 16px;
  border-radius: 6px;
  border: dashed 1px #b4babf;
  background-color: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #909599;
`;

const CatalogCardWrap = styled.div`
  margin-top: 16px;
  cursor: pointer;
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

export default BussinesDetails;
