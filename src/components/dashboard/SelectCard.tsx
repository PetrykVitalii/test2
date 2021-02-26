import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import { useSelector } from 'react-redux';
import { selectPlaceholder } from '@/store/selectors/user';

interface Props {
  onClick?: () => void;
  icon?: React.ReactNode;
  text: string;
  title: string;
  price?: number;
  countItem?: number;
  unitText?: string;
  classTracking?: string;
  isCount?: boolean;
  isAlignCenter?: boolean;
}

const SelectCard: React.FC<Props> = ({
  onClick,
  icon,
  text,
  title,
  price,
  unitText,
  countItem,
  classTracking = '',
  isCount = true,
  isAlignCenter = false,
}) => {
  const currancyPlaceholder = useSelector(selectPlaceholder);
  const [currPrice, setCurrPrice] = useState<number>(price!);

  useEffect(() => {
    if (price && countItem) {
      setCurrPrice(price * countItem);
    }
  }, []);

  return (
    <Wrapper isAlignCenter={isAlignCenter} className={classTracking} onClick={onClick}>
      <Content isAlignCenter={!text}>
        <Title id="title" isCode={!!text}>{title}</Title>
        {(icon || text) && (
          <Footer>
            {icon && <IconWrap>{icon}</IconWrap>}
            {text && <Text>{text}</Text>}
          </Footer>
        )}
      </Content>
      {unitText ? (
        <RightContent isAlignCenter={!price}>
          <SmallText isCount={isCount}>
            <Count>{countItem}</Count>
            {isCount && '\u2009x\u2009'}
            <UnitText>{unitText}</UnitText>
          </SmallText>
          {price && (
            <Text>
              {currancyPlaceholder.split(' ')[0]}
              {' '}
              {currPrice.toLocaleString()}
            </Text>
          )}
        </RightContent>
      ) : (
        <IconArrowWrap>
          <SmallArrowIcon />
        </IconArrowWrap>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isAlignCenter: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ isAlignCenter }) => isAlignCenter && 'center'};
  min-height: 64px;
  background-color: rgba(255, 255, 255, 0);
`;

const Content = styled.div<{ isAlignCenter: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  ${({ isAlignCenter }) => isAlignCenter && css`
    justify-content: center;
    margin-top: 0;
  `};
`;

const RightContent = styled.div<{ isAlignCenter: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 10px;

  ${({ isAlignCenter }) => isAlignCenter && css`
    justify-content: center;
    margin-top: 0;
  `};
`;

const Footer = styled.div`
  display: flex;
`;

const Title = styled.p<{ isCode: boolean }>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;
  word-break: break-word;

  ${({ isCode }) => isCode && css`
    margin-bottom: 6px;
  `};

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
  text-align: right;
`;

const SmallText = styled.p<{ isCount: boolean }>`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ isCount }) => isCount ? '#21272e' : '#787c80'};
  text-align: right;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;

  margin-bottom: 6px;
  width: 100%;
`;

const UnitText = styled.span`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  text-transform: capitalize;
`;

const Count = styled.span`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const IconWrap = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 6px;
`;

const IconArrowWrap = styled.div`
  width: 16px;
  height: 16px;
  margin-left: auto;
  margin-left: 12px;
`;

export default SelectCard;
