/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import Days from '@/components/calendar/Days';
import ArrowCalendar from '@/components/common/icons/ArrowCalendar';
import { selectOrder } from '@/store/selectors/user';
import { userActions } from '@/store/actions/user';
import { selectCatalog } from '@/store/selectors/catalog';
import useLanguage from '../common/hooks/useLanguage';

interface Props {

}

const Calendar: React.FC<Props> = () => {
  const { deliveryDate } = useSelector(selectOrder);

  const [date, setDate] = useState(moment());

  const [rerender, setRerender] = useState(false);

  const { seller_catalog: { delivery_days } } = useSelector(selectCatalog);

  const thisMoment = moment().startOf('day').valueOf();

  const [{ common }] = useLanguage();

  const dispatch = useDispatch();

  const resetDate = () => setDate(moment());

  const changeMonth = (month: number) => {
    setDate(date.month(month));
    setRerender(!rerender);
  };

  const changeDate = (select: moment.Moment) => {
    let tempSelectedDate = deliveryDate;

    if (deliveryDate === null) {
      tempSelectedDate = moment(select);
    } else if (select.isBefore(deliveryDate, 'day') || select.isAfter(deliveryDate, 'day')) {
      tempSelectedDate = moment(select);
    } else if (deliveryDate.isSame(deliveryDate, 'day')) {
      tempSelectedDate = null;
    }

    dispatch(userActions.changeOrderDate(tempSelectedDate));
  };

  const formatDate = () => {
    if (common.lan === 'ZH-CN') {
      return `${date.locale(common.lan.toLowerCase()).format('YYYY M')}月`;
    }
    return date.locale(common.lan.toLowerCase()).format('MMMM YYYY');
  };

  return (
    <MyCalendar>
      <Heading>
        <IconLeftArrow onClick={() => changeMonth(date.month() - 1)}>
          <ArrowCalendar />
        </IconLeftArrow>
        <Text onClick={resetDate}>{formatDate()}</Text>
        <IconRightArrow onClick={() => changeMonth(date.month() + 1)}>
          <ArrowCalendar />
        </IconRightArrow>
      </Heading>

      <Days
        delivery_days={delivery_days}
        thisMoment={thisMoment}
        onClick={(data: moment.Moment) => changeDate(data)}
        date={date}
        selectedDate={deliveryDate}
      />
    </MyCalendar>
  );
};

const MyCalendar = styled.div`
  background-color: #ffffff;
  width: 312px;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  height: 24px;
  user-select: none;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  user-select: none;
`;

const IconLeftArrow = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconRightArrow = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transform: rotate(180deg);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Calendar;
