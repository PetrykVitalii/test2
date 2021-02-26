import React from 'react';
import styled from 'styled-components';

import InfoIcon from '../common/icons/auth/InfoIcon';

const Info: React.FC = ({ children }) => (
  <InfoWrapper>
    <Icon>
      <InfoIcon />
    </Icon>
    <Text>{children}</Text>
  </InfoWrapper>
);

const InfoWrapper = styled.div`
  display: flex;
  border-radius: 8px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  padding: 16px 24px 16px 16px;
`;

const Icon = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 16px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #787c80;
`;

export default Info;
