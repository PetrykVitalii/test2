import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';
import useLanguage from '@/components/common/hooks/useLanguage';

interface Props {
  closeModal: () => void;
  deleteItem: () => void;
}

const Modal: React.FC<Props> = ({ closeModal, deleteItem }) => {
  const [{ authorization }] = useLanguage();

  const deleteItemHandler = () => {
    deleteItem();
    closeModal();
  };

  const modalRef = useOnClickOutside(closeModal);

  useWindowScrollBlock();

  return (
    <ModalWrapper>
      <MyModal ref={modalRef}>
        <TextWrapper>
          <Title>{authorization.modal_delete_title}</Title>
          <Text>{authorization.modal_delete_text}</Text>
        </TextWrapper>
        <ButtonsWrapper>
          <ButtonWrap>
            <Button classTracking="onboarding add-items delete-card cancel-btn" transparent onClick={closeModal}>
              <TextUppercase>
                {authorization.btn_cancel}
              </TextUppercase>
            </Button>
          </ButtonWrap>
          <ButtonWrap>
            <Button classTracking="onboarding add-items delete-card delete-btn" transparent onClick={deleteItemHandler}>
              <TextUppercase>
                {authorization.btn_remove}
              </TextUppercase>
            </Button>
          </ButtonWrap>
        </ButtonsWrapper>
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
  min-height: 172px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  padding: 24px;
  padding-bottom: 13px;
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

const ButtonsWrapper = styled.div`
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
