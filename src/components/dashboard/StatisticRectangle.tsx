/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import LoaderDots from '@/components/common/LoaderDots';

interface Props {
  onPlusClick: () => void;
  onMinusClick: () => void;
  date: string;
  catalogVisits?: number;
  ordersReceived?: number;
  catalogText: string;
  ordersText: string;
  height?: string;
  classTracking?: string;
  isNextButtonDisable: boolean;
  isPrevButtonDisable: boolean;
  isLoading: boolean;
  showLoader: boolean;
}

const StatisticRectangle: React.FC<Props> = ({
  onPlusClick,
  onMinusClick,
  date,
  catalogVisits,
  ordersReceived,
  catalogText,
  ordersText,
  height = '64px',
  classTracking = '',
  isNextButtonDisable,
  isPrevButtonDisable,
  isLoading,
  showLoader,
}) => {
  const handlePlusClick = () => isNextButtonDisable ? null : onPlusClick();

  const nextIconColor = isNextButtonDisable ? 'rgba(33, 39, 46, 0.3)' : '#21272e';

  const handleMinusClick = () => isPrevButtonDisable ? null : onMinusClick();

  const prevIconColor = isPrevButtonDisable ? 'rgba(33, 39, 46, 0.3)' : '#21272e';

  return (
    <DefaultWrap className={classTracking} height={height}>
      <DateWrap>
        <DateText>{date}</DateText>
        <ButtonsWrap>
          <PastButton onClick={handleMinusClick} disabled={isPrevButtonDisable} className="dashboard date-selection left-icon">
            <SmallArrowIcon color={prevIconColor} />
          </PastButton>
          <FutureButton onClick={handlePlusClick} disabled={isNextButtonDisable} className="dashboard date-selection right-icon">
            <SmallArrowIcon color={nextIconColor} />
          </FutureButton>
        </ButtonsWrap>
      </DateWrap>
      <View>
        <Content>
          <DefaultText isLoading={showLoader && isLoading}>
            {
              showLoader && isLoading
                ? (
                  <LoaderDots />
                )
                : (
                  catalogVisits
                )
            }
          </DefaultText>
          <DefaultSubText>{catalogText}</DefaultSubText>
        </Content>
        <Content>
          <DefaultText isLoading={showLoader && isLoading}>
            {
              showLoader && isLoading
                ? (
                  <LoaderDots />
                )
                : (
                  ordersReceived
                )
            }
          </DefaultText>
          <DefaultSubText>{ordersText}</DefaultSubText>
        </Content>
      </View>
    </DefaultWrap>
  );
};

const DefaultWrap = styled.div<{ height: string }>`
  height: ${({ height }) => height};
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;
  padding: 28px 20px 24px;
  border-radius: 5px;
  border: solid 1px #dae1e8;
  background-color: #ffffff;
  user-select: none;
`;

const ButtonsWrap = styled.div`
  display: flex;
  height: 55px;
`;

const PastButton = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  transform: rotate(180deg);
  margin-right: 16px;
  cursor: ${({ disabled }) => disabled ? 'unset' : 'pointer'};
  background-color: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, 0)' : '#f0f1f2'};
`;

const FutureButton = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  cursor: ${({ disabled }) => disabled ? 'unset' : 'pointer'};
  background-color: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, 0)' : '#f0f1f2'};
`;

const DateText = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #21272e;
`;

const DateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DefaultText = styled.div<{ isLoading: boolean }>`
  font-size: 20px;
  height: 27px;
  font-weight: 600;
  color: #21272e;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  margin-bottom: 13px;
  width: ${({ isLoading }) => isLoading ? '50px' : '100%'};
  padding-top: ${({ isLoading }) => isLoading ? '8px' : '0px'};
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DefaultSubText = styled.div`
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.92px;
  color: #909599;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const View = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

export default StatisticRectangle;
