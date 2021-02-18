import React from 'react';
import styled from 'styled-components';
import useLanguage from '../common/hooks/useLanguage';

import { HandleToggle } from '../common/hooks/useToggle';
import useWindowScrollBlock from '../common/hooks/useWindowScrollBlock';

interface Props {
  hideModal: HandleToggle;
  description: string;
}

const ModalAbout: React.FC<Props> = ({ hideModal, description }) => {
  const [{ catalog: catalogLan, common }] = useLanguage();

  useWindowScrollBlock();

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      <Background onClick={hideModal}>
        <Modal onClick={stopPropagation}>
          <WrapInfo>
            <ModalTitle>{catalogLan.about_header}</ModalTitle>
            <ModalText>
              {description}
            </ModalText>
          </WrapInfo>
          <AboutButton>
            <Button onClick={hideModal}>{common.btn_ok}</Button>
          </AboutButton>
        </Modal>
      </Background>
    </>
  );
};

const Button = styled.div`
  cursor: pointer;
  width: 74px;
  height: 36px;
  padding: 9px 26px 8px 40px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  color: #3897ff;
`;

const AboutButton = styled.div`
  height: 52px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const WrapInfo = styled.div`
`;

const ModalText = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: 0.3px;
  color: #787c80;
  overflow: auto;
  height: 242px;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-bottom: 20px;
`;

const Modal = styled.div`
  width: 280px;
  height: 362px;
  border-radius: 2px;
  box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22);
  border-style: solid;
  border-width: 0.5px;
  border-image-source: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.4) 5%,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0)
  );
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #ffffff, #ffffff),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.4) 5%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0)
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 0 auto;
  padding: 24px 24px 0 22px;
  background-color: white;
  position: absolute;
  left: calc((100vw - 280px) / 2);
  top: calc((100vh - 362px) / 2);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

export default ModalAbout;
