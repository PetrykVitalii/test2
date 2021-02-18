import React from 'react';
import styled from 'styled-components';

import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';

import Button from '@/components/Button';
import formatPrice from '@/utils/formatPrice';
import useLanguage from '../common/hooks/useLanguage';

interface Props {
  closeModal: () => void;
  allPrice: () => number;
  total: () => number;
  iso: string;
  delivery: () => string | number;
  taxRate: number;
  taxAmount: () => number;
  catalogId: string;
}

const ModalOrder: React.FC<Props> = ({
  closeModal, allPrice, iso, delivery, taxRate, taxAmount, total,
}) => {
  const [{ order, common }] = useLanguage();

  const closeModalHandler = () => {
    closeModal();
  };

  useWindowScrollBlock();

  const modalRef = useOnClickOutside(closeModal);

  return (
    <ModalWrapper>
      <MyModal ref={modalRef}>
        <Container>
          <Title>{order.fees}</Title>
          <DivWrapper>
            <GreyText>{order.sub_total}</GreyText>
            <Text>{`${iso}${formatPrice(allPrice())}`}</Text>
          </DivWrapper>
          <DivWrapper>
            <GreyText>{order.delivery_charges}</GreyText>
            <Text>{`${typeof delivery() !== 'string' ? iso : ''}${formatPrice(delivery())}`}</Text>
          </DivWrapper>
          {taxRate && taxAmount() > 0 && (
          <DivWrapper>
            <GreyText>{`${order.taxes} (${taxRate}%)`}</GreyText>
            <Text>{`${iso}${formatPrice(taxAmount())}`}</Text>
          </DivWrapper>
          )}
          <Hr />
          <DivWrapper>
            <TextFooter>{order.total}</TextFooter>
            <TextFooter>{`${iso}${formatPrice(total())}`}</TextFooter>
          </DivWrapper>
        </Container>
        <Footer>
          <ButtonWrap>
            <Button transparent classTracking="buyer order subtotal-info ok-btn" onClick={closeModalHandler}>
              <TextUppercase>
                {common.btn_ok}
              </TextUppercase>
            </Button>
          </ButtonWrap>
        </Footer>
      </MyModal>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
`;

const MyModal = styled.div`
  border-radius: 2px;
  margin: 0 auto;
  width: 314px;
  background: #fff;
`;

const Container = styled.div`
  padding: 24px;
`;

const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  &:nth-child(2), &:nth-child(3){
    padding-bottom: 13px;
  }
  &:nth-child(4){
    padding-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-bottom: 32px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const GreyText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const TextFooter = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const Hr = styled.hr`
  border: solid 1px #ebeced;
  margin: 0;
  margin-bottom: 20px;
`;

const TextUppercase = styled.div`
  text-transform: uppercase;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonWrap = styled.div`
  display: block;
  text-decoration: none;
  min-width: 74px;
  margin: 8px 0;
`;

export default ModalOrder;
