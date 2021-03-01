import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Calendar from '@/components/common/icons/dashboard/Calendar';

interface Props {
  label: string;
  text?: moment.Moment | null;
  onClick: () => void;
  style?: { [key: string]: string };
}

const DateSelect: React.FC<Props> = ({
  label, onClick, text, style = {},
}) => (
  <Wrapper onClick={onClick} style={style}>
    <Label>{label}</Label>
    {text ? <Text>{text.format('DD / MM / YYYY')}</Text> : <GreyText>DD / MM / YYYY</GreyText>}
    <Calendar />
    <IconWrap>
      <Calendar />
    </IconWrap>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-top: 32px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 56px;
  max-height: 56px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #ffffff;
  padding: 0 16px;
`;

const Label = styled.p`
  padding: 0 5px;
  background-color: #fff;
  position: absolute;
  top: -11px;
  left: 11px;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 16px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const GreyText = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909599;
`;

export default DateSelect;
