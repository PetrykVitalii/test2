import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  SELECT_ORDER_DATE,
  SELECT_DELIVERY_DATE,
  SELECT_UPCOMING,
  SELECT_ALL_ORDERS,
  SELECT_TODAY,
  SELECT_TOMORROW,
  SELECT_YESTERDAY,
  SELECT_LAST_SEVEN_DAYS,
  SELECT_NEXT_SEVEN_DAYS,
  SELECT_LAST_THIRTY_DAYS,
  SELECT_NEXT_THIRTY_DAYS,
  SELECT_CUSTOM,
  Select,
} from '@/utils/selectOrderDate';

import { STATUS, Status } from '@/utils/selectOrderStatus';
import StatusIcon from '@/components/dashboard/Status';

import {
  selectDate,
  selectIsError,
  selectIsLoadingSelectDate,
  selectIsUpcomingDeliveriesOnly,
  selectStatusFilters,
} from '@/store/selectors/dashboard';
import { dashboardActions, checkIsOrders } from '@/store/actions/dashboard';
import { statusLn } from '@/utils/dashboardLan';
import { SortFilters } from '@/store/reducers/dashboard';

import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

import Warning from '@/components/common/icons/dashboard/Warning';
import Calendar from '@/components/common/icons/dashboard/Calendar';
import CloseIcon from '@/components/common/icons/CloseIcon';
import Button from '@/components/dashboard/Button';
import DropDown from '@/components/dashboard/DropDown';
import DateSelect from '@/components/dashboard/DateSelect';
import DeliveryDate from '@/components/dashboard/DeliveryDate';
import ButtonWrap from '@/components/common//ButtonWrap';
import FixedHeader from '@/components/FixedHeader';
import Checkbox from '@/components/CheckBox';
import Switch from '@/components/Switch';

const Orders: React.FC = () => {
  const [{ dashboard, common }] = useLanguage();
  const date = useSelector(selectDate);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoadingSelectDate);

  const [value, setValue] = useState<Select>(date.isCustom);

  const showUpcomingDeliveriesOnly = useSelector(selectIsUpcomingDeliveriesOnly);
  const statusFilters = useSelector(selectStatusFilters);

  const [isShowUpcomingOnly, setIsShowUpcomingOnly] = useToggle(showUpcomingDeliveriesOnly);
  const [selectedStatus, setSelectedStatus] = useState<Status[]>(statusFilters);

  const [isOpenDateFrom, setIsOpenDateFrom] = useToggle();
  const [isOpenDateTill, setIsOpenDateTill] = useToggle();

  const history = useHistory();
  const dispatch = useDispatch();

  const errorRef = useRef<any>();
  const handleBack = () => history.push('/orders');

  const handleClear = () => {
    handleSelectDateFrom(null);
    handleSelectDateTill(null);
    setIsShowUpcomingOnly(false);
    handleSelectStatusFilters(null);
    setValue(getOptionRange()[0]);
  };

  const handleSelectDateFrom = (d: moment.Moment | null) => {
    dispatch(dashboardActions.selectDateFrom(d));
  };

  const handleSelectDateTill = (d: moment.Moment | null) => {
    dispatch(dashboardActions.selectDateTill(d));
  };

  const handleSelectStatusFilters = (d: Status | null) => {
    if (d === null) {
      setSelectedStatus([]);
      return;
    }

    const isSelected = selectedStatus.includes(d);
    let statuses = selectedStatus;
    if (!isSelected) {
      statuses = [...statuses, d];
    } else {
      statuses = statuses.filter((status) => status !== d);
    }

    setSelectedStatus(statuses);
  };

  const handleApplyFilter = () => {
    const selected = value.name;
    const rangeType = isShowUpcomingOnly ? SortFilters.DELIVERY_DATE : SortFilters.ORDER_DATE;

    if (selected === SELECT_UPCOMING) {
      dispatch(
        checkIsOrders(
          moment(new Date()).startOf('day').valueOf(),
          Number.MAX_VALUE,
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else if (selected === SELECT_ALL_ORDERS) {
      dispatch(
        checkIsOrders(
          Number.MIN_VALUE,
          Number.MAX_VALUE,
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else if (selected === SELECT_TODAY) {
      dispatch(
        checkIsOrders(
          moment(new Date()).startOf('day').valueOf(),
          moment(new Date()).endOf('day').valueOf(),
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else if (selected === SELECT_TOMORROW) {
      dispatch(
        checkIsOrders(
          moment(new Date()).startOf('day').add(1, 'days').valueOf(),
          moment(new Date()).endOf('day').add(1, 'days').valueOf(),
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else if (selected === SELECT_YESTERDAY) {
      dispatch(
        checkIsOrders(
          moment(new Date()).startOf('day').subtract(1, 'days').valueOf(),
          moment(new Date()).endOf('day').subtract(1, 'days').valueOf(),
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else if (selected === SELECT_LAST_SEVEN_DAYS) {
      dispatch(
        checkIsOrders(
          moment(new Date()).startOf('day').subtract(7, 'days').valueOf(),
          moment(new Date()).endOf('day').valueOf(),
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else if (selected === SELECT_NEXT_SEVEN_DAYS) {
      dispatch(
        checkIsOrders(
          moment(new Date()).startOf('day').valueOf(),
          moment(new Date()).startOf('day').add(7, 'days').valueOf(),
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else if (selected === SELECT_LAST_THIRTY_DAYS) {
      dispatch(
        checkIsOrders(
          moment(new Date()).startOf('day').subtract(30, 'days').valueOf(),
          moment(new Date()).endOf('day').valueOf(),
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else if (selected === SELECT_NEXT_THIRTY_DAYS) {
      dispatch(
        checkIsOrders(
          moment(new Date()).startOf('day').valueOf(),
          moment(new Date()).startOf('day').add(30, 'days').valueOf(),
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    } else {
      dispatch(
        checkIsOrders(
          date!.dateFrom!.startOf('day').valueOf(),
          date!.dateTill!.endOf('day').valueOf(),
          rangeType,
          isShowUpcomingOnly,
          selectedStatus,
          value,
        ),
      );
    }
  };

  const checkDisabled = () => {
    if (value.name === SELECT_CUSTOM) {
      return date.dateFrom === null || date.dateTill === null;
    }

    return false;
  };

  const getOptionRange = () => (isShowUpcomingOnly ? SELECT_DELIVERY_DATE : SELECT_ORDER_DATE);
  const handleChangeUpcomingOnly = () => setIsShowUpcomingOnly(!isShowUpcomingOnly);

  useEffect(() => {
    handleSelectDateFrom(null);
    handleSelectDateTill(null);
    setValue(getOptionRange()[0]);
  }, [isShowUpcomingOnly]);

  useEffect(() => {
    dispatch(dashboardActions.setIsError(false));
  }, [value, selectedStatus, isShowUpcomingOnly]);

  useEffect(() => {
    if (isError) { goToErrorItem(); }
  }, [isError]);

  const goToErrorItem = () => {
    if (!errorRef.current) { return; }
    errorRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  if (isOpenDateFrom) {
    return (
      <DeliveryDate
        title={isShowUpcomingOnly ? dashboard.delivery_date_header : dashboard.order_date_header}
        selectDate={handleSelectDateFrom}
        date={date.dateFrom}
        close={() => setIsOpenDateFrom(false)}
        fromDate
        minDate={isShowUpcomingOnly ? moment(new Date()) : null}
        maxDate={isShowUpcomingOnly ? null : moment(new Date())}
      />
    );
  }

  if (isOpenDateTill) {
    return (
      <DeliveryDate
        title={isShowUpcomingOnly ? dashboard.delivery_date_header : dashboard.order_date_header}
        selectDate={handleSelectDateTill}
        date={date.dateTill}
        close={() => setIsOpenDateTill(false)}
        fromDate={false}
        minDate={isShowUpcomingOnly ? moment(new Date()) : null}
        maxDate={isShowUpcomingOnly ? null : moment(new Date())}
      />
    );
  }

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <BackIconWrap onClick={handleBack}>
            <CloseIcon />
          </BackIconWrap>
          <Title>{dashboard.filter_orders_header}</Title>
          <ClearButton className="orders filter clear-all-btn" onClick={handleClear}>
            {dashboard.clear_all}
          </ClearButton>
        </HeaderWrap>
      </FixedHeader>
      <ScrollView>
        <UpcomingWrapper>
          <CalendarIconWrap>
            <Calendar color="#b4babf" />
          </CalendarIconWrap>
          <ContentWrap>
            <TitleWrap>
              <UpcomingTitle>{dashboard.upcoming_deliveries_only}</UpcomingTitle>
              <SwitchWrap>
                <Switch
                  classTrackingOn="orders filter upcoming-deliveries toggle-off"
                  classTrackingOff="orders filter upcoming-deliveries toggle-on"
                  isActive={isShowUpcomingOnly}
                  onClick={handleChangeUpcomingOnly}
                />
              </SwitchWrap>
            </TitleWrap>
            <SubTitle>{dashboard.upcoming_text}</SubTitle>
          </ContentWrap>
        </UpcomingWrapper>

        <DeliveryWrapper>
          <Text>
            {isShowUpcomingOnly ? dashboard.delivery_date_header : dashboard.order_date_header}
          </Text>
          <Empty height="19px" />
          <DropDown
            classTracking="orders filter date-dropdown"
            value={value}
            setValue={setValue}
            data={getOptionRange()}
          />
          {value.name === SELECT_CUSTOM && (
            <>
              <DateSelect
                label={dashboard.from_label}
                text={date.dateFrom}
                onClick={() => setIsOpenDateFrom(!isOpenDateFrom)}
              />
              <DateSelect
                label={dashboard.till_label}
                text={date.dateTill}
                onClick={() => setIsOpenDateTill(!isOpenDateTill)}
                style={{ marginBottom: '20px' }}
              />
            </>
          )}
        </DeliveryWrapper>

        <StatusWrapper>
          <Text>{dashboard.status_header}</Text>
          {STATUS.map((status: Status, idx: number) => {
            const isSelected = selectedStatus.includes(status);
            const name = status.name.toLowerCase().trim().replace(' ', '-');
            return (
              <StatusItem key={idx}>
                <IconWrapper>
                  <StatusIcon status={status.key} />
                </IconWrapper>
                <IconText>{statusLn(status.name, common)}</IconText>
                <CheckboxWrap>
                  <Checkbox
                    classTracking={`orders filter ${name}-checkbox`}
                    isChecked={isSelected}
                    isListed
                    onClick={() => {
                      handleSelectStatusFilters(status);
                    }}
                  />
                </CheckboxWrap>
              </StatusItem>
            );
          })}
          {isError && (
          <Error ref={errorRef}>
            <IconWrap>
              <Warning />
            </IconWrap>
            {dashboard.date_range_error}
          </Error>
          )}
        </StatusWrapper>

        <ButtonWrap
          isFixed
          maxWidth={504}
          paddingWidth={48}
        >
          <Button
            classTracking="orders filter cta-apply-filters"
            text={dashboard.btn_apply_filters}
            theme={Button.theme.primary}
            disabled={isLoading || checkDisabled()}
            onClick={handleApplyFilter}
            isLoader={isLoading}
          />
        </ButtonWrap>
      </ScrollView>
    </>
  );
};

const HeaderWrap = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Empty = styled.div<{ height?: string }>`
  height: ${({ height }) => (height && height) || '72px'};
  width: 100%;
`;

const ScrollView = styled.div`
  background: #fff;
  padding: 24px;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
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

const BackIconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 24px;
  display: flex;
  align-items: center;
`;

const Error = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  min-height: 72px;
  max-height: 72px;

  border-radius: 6px;
  border: solid 1px rgba(254, 170, 34, 0.35);
  background-color: #fff8eb;

  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

// const ButtonWrap = styled.div`
//   position: fixed;
//   bottom: 24px;
//   width: calc(100% - 48px);
//   max-width: 504px;
// `;

const ClearButton = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-left: auto;
  cursor: pointer;
`;

const DeliveryWrapper = styled.div``;

const StatusWrapper = styled.div`
  padding-top: 32px;
  padding-bottom: 108px;
`;

const UpcomingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 42px;
`;

const UpcomingTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #21272e;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  padding-right: 50px;
`;

const SwitchWrap = styled.div``;

const ContentWrap = styled.div`
  width: 100%;
`;

const CalendarIconWrap = styled.div`
  display: inline-flex;
  width: 32px;
  height: 32px;
  margin-right: 20px;
`;

const StatusItem = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 28px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const IconText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const CheckboxWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-left: auto;
`;

export default Orders;
