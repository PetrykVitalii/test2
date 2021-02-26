import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import useLanguage from '@/components/common/hooks/useLanguage';
// import { monthLn } from '@/utils/dashboardLan';

import Days from '@/components/calendar/Days';
import ArrowCalendar from '@/components/common/icons/dashboard/ArrowCalendar';

interface Props {
  tempDate: moment.Moment | null;
  setTempDate: (value: moment.Moment | null) => void;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
}

const Calendar: React.FC<Props> = ({
  tempDate, setTempDate, fromDate, minDate, maxDate,
}) => {
  const [{ common }] = useLanguage();

  const CURRENT_DATE = tempDate ? moment(new Date(tempDate.toDate())) : null;

  const [date, setDate] = useState<moment.Moment>(CURRENT_DATE || moment());

  const [rerender, setRerender] = useState(false);

  const resetDate = () => setDate(moment());

  const formatDate = () => {
    if (common.lan === 'ZH-CN') {
      return `${date.locale(common.lan.toLowerCase()).format('YYYY M')}月`;
    }
    return date.locale(common.lan.toLowerCase()).format('MMMM YYYY');
  };

  const changeMonth = (value: number) => {
    setDate(date.month(value));
    setRerender(!rerender);
  };

  const changeDate = (select: moment.Moment) => {
    let tempSelectedDate = tempDate;

    if (tempDate === null) {
      tempSelectedDate = moment(select);
    } else if (select.isBefore(tempDate, 'day') || select.isAfter(tempDate, 'day')) {
      tempSelectedDate = moment(select);
    } else if (tempDate.isSame(tempDate, 'day')) {
      tempSelectedDate = null;
    }

    setTempDate(tempSelectedDate);
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
        onClick={(data: moment.Moment) => changeDate(data)}
        date={date}
        selectedDate={tempDate}
        fromDate={fromDate}
        minDate={minDate}
        maxDate={maxDate}
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
  font-weight: 500;
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
