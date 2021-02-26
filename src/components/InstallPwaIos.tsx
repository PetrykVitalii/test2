import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { pwaActions } from '@/store/actions/pwa';
import { selectIsIosInstallPWA, selectIsAndroidChromeInstallPWA } from '@/store/selectors/pwa';

const InstallPwaIos: React.FC = () => {
  const isIosInstallPWA = useSelector(selectIsIosInstallPWA);
  const isAndroidChromeInstallPWA = useSelector(selectIsAndroidChromeInstallPWA);

  const dispatch = useDispatch();

  if (!isIosInstallPWA && !isAndroidChromeInstallPWA) return null;

  const handleCloseClick = () => {
    dispatch(pwaActions.setIsIosInstallPWA(false));
    dispatch(pwaActions.setIsAndroidChromeInstallPWA(false));
  };

  return (
    <InstallPwaIosStyled isIosInstallPWA={isIosInstallPWA}>
      <LeftSide>
        <AppIcon />
        <TextStyled>
          Tap
          {' '}
          {isIosInstallPWA ? <ShareIPhoneIcon /> : <ShareAndroidIcon />}
          {' '}
          and
          {' '}
          <b>&quot;Add to Home Screen&quot;</b>
          {' '}
          to install the app on your phone
        </TextStyled>
      </LeftSide>
      <RightSide>
        <CloseIcon onClick={handleCloseClick} />
      </RightSide>
    </InstallPwaIosStyled>
  );
};

const InstallPwaIosStyled = styled.div<{ isIosInstallPWA: boolean }>`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
  bottom: ${({ isIosInstallPWA }) => (isIosInstallPWA ? '40px' : 'auto')};
  top: ${({ isIosInstallPWA }) => (isIosInstallPWA ? 'auto' : '40px')};
  left: 50%;
  transform: translateX(-50%);
  max-width: 552px;
  width: 100%;

  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fff;
  border-radius: 6px;
  padding: 12px;

  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  box-shadow: 0 3px 12px -6px rgba(0, 0, 0, 0.54);

  @media screen and (max-width: 552px) {
    bottom: ${({ isIosInstallPWA }) => (isIosInstallPWA ? '20px' : 'auto')};
    top: ${({ isIosInstallPWA }) => (isIosInstallPWA ? 'auto' : '20px')};
    left: 16px;
    right: 16px;
    transform: translateX(0%);
    width: auto;
  }
`;

const LeftSide = styled.div`
  display: flex;
  width: 100%;
  margin-right: 12px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const AppIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url('/assets/common/app-icon.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 12px;
`;

const TextStyled = styled.div`
`;

const ShareIPhoneIcon = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('/assets/common/share-icon-iphone.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const ShareAndroidIcon = styled(ShareIPhoneIcon)`
  background-image: url('/assets/common/share-icon-android.svg');
`;

const CloseIcon = styled.div`
  width: 16px;
  height: 16px;
  background-image: url('/assets/common/close.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
`;

export default InstallPwaIos;
