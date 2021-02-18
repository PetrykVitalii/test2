import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

interface Props {
  date: moment.Moment;
  onClick: (date: moment.Moment) => void;
  selectedDate: null | moment.Moment;
  currentDate: moment.Moment;
  thisMoment: number;
  delivery_days: number[];
}

const Day: React.FC<Props> = ({
  currentDate,
  date,
  onClick,
  selectedDate,
  thisMoment,
  delivery_days,
}) => {
  const changeDate = () => {
    if (disableDays()) onClick(date);
  };

  const disableDays = (): boolean => thisMoment < date.valueOf()
    && delivery_days.filter((day) => day + 1 === date.isoWeekday()).length > 0;

  return (
    <StyledDay
      className="buyer order cta-click-delivery-date"
      onClick={changeDate}
      disabled={!date.isSame(currentDate, 'month')}
    >
      <Text
        colorDis={disableDays()}
        active={moment().isSame(date, 'day')}
        muted={!date.isSame(currentDate, 'month')}
        selected={selectedDate !== null && date.isSame(selectedDate, 'day')}
      >
        {date.date()}
      </Text>
    </StyledDay>
  );
};

const StyledDay = styled.button`
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 11px 0;
  line-height: 34px;
  position: relative;
  font-size: 16px;
  outline: none;
  user-select: none;
  height: 36px;

  background: transparent;
  border: none;

  &:disabled {
    cursor: default;
    opacity: 0;
  }
`;

const Text = styled.p<{ active: boolean; muted: boolean; selected: boolean, colorDis: boolean }>`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ colorDis }) => (colorDis ? ' rgba(0, 0, 0, 0.87)' : '#909599')};
  width: 100%;
  outline: none;
  user-select: none;

  ${({ active }) => active
  && css`
    color: #3897ff;
  `};

  ${({ muted }) => muted
  && css`
    display: none;
  `};

  ${({ selected }) => selected
  && css`
    color: #fff;
    height: 40px;
    width: 40px;
    background-color: #3897ff;
    border-radius: 50%;
    position: absolute;
    top: -1px;
    left: 3px;

    display: flex;
    align-items: center;
    justify-content: center;
  `};
`;

export default Day;
