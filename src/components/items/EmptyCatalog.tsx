import React from 'react';
import styled from 'styled-components';

import useLanguage from '../common/hooks/useLanguage';

const EmptyCatalog: React.FC = () => {
  const [{ items: itemsLan }] = useLanguage();

  return (
    <>
      <AddItem>{itemsLan.add_items}</AddItem>
      <ArrowTop src="/assets/items/arrow.png" alt="arrow" />
      <EyesWrap>
        <Eyes src="/assets/items/eyes.png" alt="eyes" />
      </EyesWrap>
      <NoItem>{itemsLan.no_items}</NoItem>
      <SubTextWrap>
        <NoItemSubText>
          {itemsLan.no_items_sub_text}
        </NoItemSubText>
      </SubTextWrap>
    </>
  );
};

const AddItem = styled.div`
  font-family: HandOfSeanDemo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #787c80;
  position: absolute;
  top: 27px;
  right: 84px;
  z-index: 20;
`;

const ArrowTop = styled.img`
  width: 110px;
  height: 65px;
  object-fit: contain;
  transform: rotate(1deg);
  position: absolute;
  top: 21px;
  right: 49px;
  z-index: 10;
`;

const NoItem = styled.div`
  font-size: 25px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const EyesWrap = styled.div`
  width: 62px;
  padding-top: 129px;
  margin: 0 auto 8px;
`;

const Eyes = styled.img`
  width: 62px;
  height: 80px;
  object-fit: contain;
  font-family: AppleColorEmoji;
  font-size: 64px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const SubTextWrap = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

const NoItemSubText = styled.div`
  max-width: 268px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #787c80;
`;

export default EmptyCatalog;
