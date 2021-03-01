/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';

enum THEME {
  default,
  blue,
  transparent,
  white
}

enum COLORS {
  default,
  white,
  black,
  grey
}

enum SUBCOLOR {
  default,
  white,
  grey
}

enum ARROWCOLOR {
  default,
  dark,
  none
}

interface Props {
  onClick?: () => void;
  theme?: THEME;
  color?: COLORS;
  arrowColor?: ARROWCOLOR;
  leftIcon?: React.ReactNode;
  iconHeight?: string;
  text: string;
  textWrap?: boolean;
  textCapitalize?: boolean;
  subText?: string;
  subColor?: SUBCOLOR;
  height?: string;
  pending?: number | undefined;
  classTracking?: string;
}

export default function Rectangle({
  onClick,
  theme = THEME.default,
  color = COLORS.default,
  arrowColor = ARROWCOLOR.default,
  leftIcon,
  iconHeight = '24px',
  text,
  textWrap = false,
  textCapitalize = true,
  subText,
  pending,
  subColor = SUBCOLOR.default,
  height = '64px',
  classTracking = '',
}: Props) {
  const wrappers = {
    [THEME.default]: DefaultWrap,
    [THEME.blue]: BlueWrap,
    [THEME.transparent]: TransparentWrap,
    [THEME.white]: WhiteWrap,
  };

  const colors = {
    [COLORS.default]: DefaultText,
    [COLORS.white]: WhiteText,
    [COLORS.black]: BlackText,
    [COLORS.grey]: GreyText,
  };

  const subColors = {
    [SUBCOLOR.default]: DefaultSubText,
    [SUBCOLOR.white]: WhiteSubText,
    [SUBCOLOR.grey]: GreySubText,
  };

  const arrowColors = {
    [ARROWCOLOR.default]: '#B4BABF',
    [ARROWCOLOR.dark]: '#21272E',
    [ARROWCOLOR.none]: 'transparent',
  };

  const ThemedWrap = wrappers[theme];
  const ThemedText = colors[color];
  const ThemedSubText = subColors[subColor];
  const ArrowColor = arrowColors[arrowColor];

  return (
    <ThemedWrap className={classTracking} onClick={onClick} height={height}>
      <IconWrap isIcon={Boolean(leftIcon)} height={iconHeight}>
        {leftIcon}
      </IconWrap>
      <View>
        <Content>
          <ThemedText textCapitalize={textCapitalize} textWrap={textWrap}>{text}</ThemedText>
          {subText && <ThemedSubText>{subText}</ThemedSubText>}
        </Content>
      </View>
      {!!pending && (
        <Circle>
          <Count>{pending}</Count>
        </Circle>
      )}
      <IconArrowWrap>
        <SmallArrowIcon color={ArrowColor} />
      </IconArrowWrap>
    </ThemedWrap>
  );
}

Rectangle.theme = THEME;
Rectangle.color = COLORS;
Rectangle.subColor = SUBCOLOR;
Rectangle.arrowColor = ARROWCOLOR;

const DefaultWrap = styled.div<{ onClick?: () => void; height: string }>`
  min-height: ${({ height }) => height};
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  padding: 0 20px;
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

const TransparentWrap = styled(DefaultWrap)`
  border: solid 2px rgba(33, 39, 46, 0.08);
  background-color: transparent;
`;

const BlueWrap = styled(DefaultWrap)`
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #004085;
`;

const WhiteWrap = styled(DefaultWrap)`
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fff;
`;

const DefaultText = styled.p<{ textCapitalize: boolean; textWrap: boolean }>`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  text-transform: ${({ textCapitalize }) => (textCapitalize ? 'capitalize' : 'none')};

  ${({ textWrap }) => {
    if (textWrap) {
      return `
        padding-right: 50px;
      `;
    }
    return `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `;
  }}
`;

const WhiteText = styled(DefaultText)`
  color: #ffffff;
`;

const BlackText = styled(DefaultText)`
  color: #21272e;
`;

const GreyText = styled(DefaultText)`
   color: #dae1e8;
`;

const DefaultSubText = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WhiteSubText = styled.p`
  opacity: 0.7;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  margin-top: 7px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GreySubText = styled.p`
  opacity: 0.7;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
  margin-top: 7px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconWrap = styled.div<{ isIcon: boolean; height: string }>`
  display: ${({ isIcon }) => (isIcon ? 'block' : 'none')};
  min-width: 30px;
  max-width: 30px;
  height: ${({ height }) => height};
  margin-right: 16px;
`;

const IconArrowWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
  margin-left: auto;
  margin-left: 12px;
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

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f43939;
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
  border-radius: 50%;
`;

const Count = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;
