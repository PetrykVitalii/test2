import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectIsLoading } from '@/store/selectors/settings';
import { HandleToggle } from '../common/hooks/useToggle';
import UseWindowScrollBlock from '../common/hooks/useWindowScrollBlock';
import Loader from '../common/Loader';
import useLanguage from '../common/hooks/useLanguage';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hideModal: HandleToggle;
  logOut: () => void;
  classTrackingCancel?: string;
  classTrackingLogOut?: string;
}

const ModalLogOut: React.FC<ModalProps> = ({
  hideModal,
  logOut,
  classTrackingCancel,
  classTrackingLogOut,
}) => {
  UseWindowScrollBlock();
  const isLoading = useSelector(selectIsLoading);
  const [{ settings }] = useLanguage();

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const deleteItemHandle = () => [!isLoading && logOut()];

  const hide = () => [!isLoading && hideModal(false)];

  return (
    <>
      <Background height={window.innerHeight} onClick={hideModal}>
        <Modal height={window.innerHeight} onClick={stopPropagation}>
          <Wrap>
            <SmallWrap>
              <DeleteTitle>{settings.link_logout}</DeleteTitle>
            </SmallWrap>
            {isLoading && (
              <SmallLoader>
                <Loader width="100%" height="100%" />
              </SmallLoader>
            )}
          </Wrap>
          <DeleteText>{settings.logout_popup_text}</DeleteText>
          <FilterButton>
            <Button
              className={classTrackingCancel}
              disable={isLoading}
              onClick={hide}
            >
              {settings.logout_popup_cancel}
            </Button>
            <Button
              className={classTrackingLogOut}
              disable={isLoading}
              onClick={deleteItemHandle}
            >
              {settings.logout_popup_confirm}
            </Button>
          </FilterButton>
        </Modal>
      </Background>
    </>
  );
};

const SmallLoader = styled.div`
  width: 50px;
  height: 0px;
  position: relative;
  transform: scale(0.4);
`;

const SmallWrap = styled.div``;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div<{ disable: boolean }>`
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 10px;
  height: 36px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 36px;
  color: ${({ disable }) => (disable ? '#787c80' : 'rgb(56 151 255)')};
`;

const FilterButton = styled.div`
  height: 52px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteText = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  margin: 20px 0 25px;
`;

const DeleteTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const Modal = styled.div<{ height: number }>`
  width: 280px;
  min-height: 185px;
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
  padding: 24px 16px 0 24px;
  background-color: white;
  position: absolute;
  left: calc((100vw - 280px) / 2);
  top: ${({ height }) => height && `calc((${height}px - 220px) / 2)`};
`;

const Background = styled.div<{ height: number }>`
  width: 100vw;
  height: ${({ height }) => height && `${height}px`};
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

export default ModalLogOut;
