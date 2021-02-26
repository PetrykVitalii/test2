import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectDate } from '@/store/selectors/dashboard';
import useToggle from '../common/hooks/useToggle';

interface Props {
  date: moment.Moment;
  onClick: (date: moment.Moment) => void;
  selectedDate: null | moment.Moment;
  currentDate: moment.Moment;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
}

const Day: React.FC<Props> = ({
  currentDate,
  date,
  onClick,
  selectedDate,
  fromDate,
  minDate,
  maxDate,
}) => {
  const dateState = useSelector(selectDate);

  const [isDisabled, setIsDisabled] = useToggle();

  const disableDays = () => {
    const isMin = minDate && minDate.unix() > date.unix();
    const isMax = maxDate && maxDate.unix() < date.unix();
    if (isMin || isMax) {
      setIsDisabled(true);
      return;
    }

    if (fromDate) {
      if (dateState.dateTill) {
        setIsDisabled(dateState.dateTill.unix() < date.unix());
      }
    } else if (dateState.dateFrom) {
      setIsDisabled(dateState.dateFrom.unix() > date.unix());
    }
  };

  const handleClick = () => {
    if (!isDisabled) onClick(date);
  };

  useEffect(() => {
    disableDays();
  });

  return (
    <StyledDay onClick={handleClick} disabled={!date.isSame(currentDate, 'month')}>
      <Text
        colorGrey={isDisabled}
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

const Text = styled.p<{ active: boolean; muted: boolean; selected: boolean; colorGrey: boolean }>`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ colorGrey }) => (colorGrey ? '#909599' : 'rgba(0, 0, 0, 0.87)')};
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
