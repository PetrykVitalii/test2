import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import PlusIcon from '@/components/common/icons/PlusIcon';

interface Props {
  image?: string;
  title: string;
  subText: string;
  buttonText: string;
  classTracking?: string;
  onClick: () => void;
}

const StepPrompt: React.FC<Props> = ({
  image,
  title,
  subText,
  buttonText,
  classTracking,
  onClick,
}) => (
  <Wrapper>
    <ImageWrap>
      <ImageIcon src={image} alt="icon-image" />
    </ImageWrap>
    <Title>{title}</Title>
    <SubText>{subText}</SubText>
    <ButtonWrap onClick={onClick}>
      <Button icon classTracking={classTracking}>
        {buttonText}
        <IconWrap>
          <PlusIcon />
        </IconWrap>
      </Button>
    </ButtonWrap>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 24px 16px 24px;
  border-radius: 6px;
  background-color: #ffffff;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const SubText = styled.p`
  width: 292px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #909599;
  margin-top: 8px;
`;

const ImageWrap = styled.div`
  margin-bottom: 16px;
`;

const ImageIcon = styled.img`
  width: 32px;
  height: 42px;
  object-fit: contain;
  font-family: AppleColorEmoji;
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const ButtonWrap = styled.div`
  width: 182px;
  margin-top: 32px;
`;

const IconWrap = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 6px;
`;

export default StepPrompt;
