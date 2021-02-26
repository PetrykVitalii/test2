import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import useLanguage from '@/components/common/hooks/useLanguage';

import Day from './Day';

interface Props {
  date: moment.Moment;
  onClick: (date: moment.Moment) => void;
  selectedDate: null | moment.Moment;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
}

const Days: React.FC<Props> = ({
  date, onClick, selectedDate, fromDate, minDate, maxDate,
}) => {
  const [{ common }] = useLanguage();
  const thisDate = moment(date);
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf('month');
  const previousMonth = moment(date).subtract(1, 'month');
  const previousMonthDays = previousMonth.daysInMonth();
  const nextsMonth = moment(date).add(1, 'month');

  const days: React.ReactNode[] = [];

  const labels: React.ReactNode[] = [];

  const firstDayDateCorrected = firstDayDate.day() === 0 ? 7 : firstDayDate.day();
  const daysCount = days.length;

  for (let i = 1; i <= 7; i += 1) {
    thisDate.date(i);

    labels.push(
      <WeekDay key={moment(thisDate).format('DD MM YYYY')}>
        <Text>
          {common.lan === 'ZH-HK'
            ? moment().locale(common.lan.toLowerCase()).day(i).format('dd')
            : moment().locale(common.lan.toLowerCase()).day(i).format('dd')
              .slice(0, 1)}
        </Text>
      </WeekDay>,
    );
  }

  for (let i = firstDayDateCorrected; i > 1; i -= 1) {
    previousMonth.date(previousMonthDays - i + 2);

    days.push(
      <Day
        key={moment(previousMonth).format('DD MM YYYY')}
        onClick={(date1: moment.Moment) => onClick(date1)}
        currentDate={date}
        date={moment(previousMonth)}
        selectedDate={selectedDate}
        fromDate={fromDate}
      />,
    );
  }

  for (let i = 1; i <= daysInMonth; i += 1) {
    thisDate.date(i);

    days.push(
      <Day
        key={moment(thisDate).format('DD MM YYYY')}
        onClick={(date2: moment.Moment) => onClick(date2)}
        currentDate={date}
        date={moment(thisDate)}
        selectedDate={selectedDate}
        fromDate={fromDate}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );
  }

  for (let i = 1; i <= daysCount; i += 1) {
    nextsMonth.date(i);

    days.push(
      <Day
        key={moment(nextsMonth).format('DD MM YYYY')}
        onClick={(date3: moment.Moment) => onClick(date3)}
        currentDate={date}
        date={moment(nextsMonth)}
        selectedDate={selectedDate}
        fromDate={fromDate}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );
  }

  return (
    <Wrapper>
      <WeekDays>{labels.concat()}</WeekDays>
      <WrapDays>{days.concat()}</WrapDays>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  margin-top: 24px;
  margin-bottom: 12px;
`;

const WeekDay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  user-select: none;

  margin: 0 auto;

  width: 16px;
  height: 16px;
`;

const WrapDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909599;

  width: 100%;
`;

export default Days;
