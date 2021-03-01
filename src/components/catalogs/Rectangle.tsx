import React from 'react';
import styled from 'styled-components';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';

interface Props {
  text: string;
  style?: { [key: string]: string };
  onClick?: () => void;
  icon?: React.ReactNode;
  classTracking?: string;
}

const Rectangle: React.FC<Props> = ({
  icon, text, style = {}, onClick, classTracking = '',
}) => (
  <Wrapper style={style} onClick={onClick} className={classTracking}>
    {icon && (
      <IconNodeWrap>
        {icon}
      </IconNodeWrap>
    )}
    <Text>{text}</Text>
    <IconWrap>
      <SmallArrowIcon />
    </IconWrap>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  height: 48px;
  padding: 0 16px;
  cursor: pointer;
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

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const IconNodeWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 18px;
`;

export default Rectangle;
