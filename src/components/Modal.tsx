import React from 'react';
import styled from 'styled-components';

import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';

import Button from '@/components/Button';

interface Props {
  closeModal: () => void;
  confirm: () => void;
  title: string;
  text: string;
  leftBtn: string;
  rightBtn: string;
  classTrackingBtnLeft?: string;
  classTrackingBtnRight?: string;
}

const Modal: React.FC<Props> = ({
  closeModal,
  confirm,
  title,
  text,
  leftBtn,
  rightBtn,
  classTrackingBtnLeft = '',
  classTrackingBtnRight = '',
}) => {
  const closeModalHandler = () => {
    confirm();
    closeModal();
  };

  useWindowScrollBlock();

  const modalRef = useOnClickOutside(closeModal);

  return (
    <ModalWrapper>
      <MyModal ref={modalRef}>
        <Content>
          <Title>{title}</Title>
          <Text>{text}</Text>
        </Content>
        <Footer>
          <ButtonWrap>
            <Button transparent onClick={closeModal} classTracking={classTrackingBtnLeft}>
              <TextUppercase>
                {leftBtn}
              </TextUppercase>
            </Button>
          </ButtonWrap>
          <ButtonWrap>
            <Button transparent onClick={closeModalHandler} classTracking={classTrackingBtnRight}>
              <TextUppercase>
                {rightBtn}
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
  width: 280px;
  background: #fff;
`;

const Content = styled.div`
  padding: 24px;
  padding-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const TextUppercase = styled.div`
  text-transform: uppercase;
`;

const Footer = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonWrap = styled.div`
  min-width: 75px;
  margin-right: 8px;

  :last-child {
    margin-right: 11px;
  }
`;

export default Modal;
