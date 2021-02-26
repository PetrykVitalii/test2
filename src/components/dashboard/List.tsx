/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';

enum VARIANT {
  pink,
  yellow,
  green,
  blue
}

interface Props {
  onClick?: () => void;
  leftIcon: React.ReactNode;
  text: string;
  variant?: VARIANT;
  classTracking?: string;
}

export default function List({
  onClick,
  leftIcon,
  text,
  variant = VARIANT.pink,
  classTracking = '',
}: Props) {
  const type = {
    [VARIANT.pink]: PinkView,
    [VARIANT.yellow]: YellowView,
    [VARIANT.green]: GreenView,
    [VARIANT.blue]: BlueView,
  };

  const ThemedView = type[variant];

  return (
    <Wrapper onClick={onClick} className={classTracking}>
      <ThemedView>
        {leftIcon}
      </ThemedView>
      <View>
        <Text>{text}</Text>
        <SmallArrowIcon />
      </View>
    </Wrapper>
  );
}

List.variant = VARIANT;

const Wrapper = styled.div`
  min-height: 72px;
  padding: 12px 0px 12px 0px;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
`;

const BasicView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border: solid 2px rgba(33, 39, 46, 0.08);
  border-radius: 50%;
  margin-right: 16px;
`;

const PinkView = styled(BasicView)`
  background-color: #f2f4fa;
`;

const YellowView = styled(BasicView)`
  background-color: #fff8eb;
`;

const GreenView = styled(BasicView)`
  background-color: #e1eff0;
`;

const BlueView = styled(BasicView)`
  background-color: #f4f5f9;
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

const View = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
