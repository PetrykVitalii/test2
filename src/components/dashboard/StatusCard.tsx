/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';

enum THEME {
  blue,
  green,
  purple,
  yellow
}

interface Props {
  icon: React.ReactNode;
  text?: string;
  title: string;
  theme?: THEME;
}

export default function StatusCard({
  icon,
  text,
  title,
  theme = THEME.blue,
} : Props) {
  const themes = {
    [THEME.blue]: BlueWrap,
    [THEME.green]: GreenWrap,
    [THEME.purple]: PurpleWrap,
    [THEME.yellow]: YellowWrap,
  };

  const ThemedWrap = themes[theme];

  return (
    <Wrapper>
      <ThemedWrap>
        <IconWrap>
          {icon}
        </IconWrap>
      </ThemedWrap>
      <Content>
        <Title>{title}</Title>
        <Text>
          {text}
        </Text>
      </Content>
    </Wrapper>
  );
}

StatusCard.theme = THEME;

const Wrapper = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
`;

const Text = styled.p`
  margin-top: 4px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const IconWrap = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlueWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 8.7px;
  border: solid 2.2px rgba(33, 39, 46, 0.08);
  background-color: #eaf4ff;

  margin-right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const GreenWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 8.7px;
  border: solid 2.2px rgba(33, 39, 46, 0.08);
  background-color: #e5f4f5;

  margin-right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PurpleWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 8.7px;
  border: solid 2.2px rgba(33, 39, 46, 0.08);
  background-color: #f2f4fa;

  margin-right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const YellowWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 8.7px;
  border: solid 2.2px rgba(33, 39, 46, 0.08);
  background-color: #fff8eb;

  margin-right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
