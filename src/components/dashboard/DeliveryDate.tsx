import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import useLanguage from '@/components/common/hooks/useLanguage';

import BackIcon from '@/components/common/icons/BackIcon';
import Calendar from '@/components/calendar/Calendar';
import Button from '@/components/Button';
import FixedHeader from '@/components/FixedHeader';

interface Props {
  title: string;
  selectDate: (date: moment.Moment | null) => void;
  close: () => void;
  date: moment.Moment | null;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
}

const DeliveryDate: React.FC<Props> = ({
  title,
  close,
  selectDate,
  date,
  fromDate,
  minDate,
  maxDate,
}) => {
  const [{ dashboard, common }] = useLanguage();
  const [tempDate, setTempDate] = useState<moment.Moment | null>(date);

  const handleSetDate = (value: moment.Moment | null) => setTempDate(value);

  const handleSelect = () => {
    selectDate(tempDate);
    close();
  };

  const textButton = () => {
    if (tempDate !== null) {
      if (common.lan === 'ZH-CN') {
        const [month, day] = tempDate.locale(common.lan.toLowerCase()).format('M D').split(' ');
        return `${month}月${day}日`;
      }
      const [month, day] = tempDate.format('MMMM D').split(' ');
      return `${month} ${day}`;
    }
    return '';
  };

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <IconWrap onClick={close}>
            <BackIcon />
          </IconWrap>
          <Title>{title}</Title>
        </HeaderWrap>
      </FixedHeader>
      <ScrollView>
        <CalendarWrap>
          <Calendar
            tempDate={tempDate}
            setTempDate={handleSetDate}
            fromDate={fromDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </CalendarWrap>
        <BtnWrap>
          <Button shadow onClick={handleSelect}>
            {`${dashboard.btn_select} ${textButton()}`}
          </Button>
        </BtnWrap>
      </ScrollView>
    </>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  width: 24px;
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
`;

const CalendarWrap = styled.div`
  margin-top: 27px;
`;

const ScrollView = styled.div`
  padding: 0 24px;
  overflow-y: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const BtnWrap = styled.div`
  margin-top: auto;
  margin-bottom: 16px;
  width: 100%;
`;

export default DeliveryDate;
