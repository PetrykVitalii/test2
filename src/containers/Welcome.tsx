import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { selectAuthRestoreIsLoading, selectAuthRestoreIsLoggedIn } from '@/store/selectors/auth-restore';
import { authRestore } from '@/store/actions/auth-restore';
import { selectIsInstallPwaVisible } from '@/store/selectors/pwa';

import useLanguage from '@/components/common/hooks/useLanguage';
import Loader from '@/components/common/Loader';

import InstallPwaIos from '@/components/InstallPwaIos';
import Button from '@/components/Button';
import Header from '@/components/Header';

import { installPwa } from '@/utils/install-pwa';

const Welcome: React.FC = () => {
  const history = useHistory();
  const [{ authorization }] = useLanguage();
  const isLoading = useSelector(selectAuthRestoreIsLoading);
  const isLoggedIn = useSelector(selectAuthRestoreIsLoggedIn);
  const isInstallPwaVisible = useSelector(selectIsInstallPwaVisible);

  const dispatch = useDispatch();

  const handleGetStarted = () => history.push('/signup');

  if (isLoading) return <Loader />;

  if (isLoggedIn) {
    dispatch(authRestore(true));
    return null;
  }

  return (
    <>
      <WelcomeStyled height={window.innerHeight}>
        <Header />
        <Container>
          <Title>
            {authorization.welcome_message_start}
            &nbsp;
            <Highlight>
              {authorization.welcome_message_highlight}
              &nbsp;
            </Highlight>
            {authorization.welcome_message_end}
          </Title>

          <BtnWrapper>
            <Button classTracking="cta-get-started" shadow onClick={handleGetStarted}>
              {authorization.btn_get_started}
            </Button>
          </BtnWrapper>

          {isInstallPwaVisible && (
            <>
              <div style={{ minHeight: '76px' }} />
              <AppContainer onClick={installPwa} className="splash install-app">
                <AppContainerSection>
                  <AppIcon />
                  <AppText>{authorization.install_app}</AppText>
                </AppContainerSection>
                <AppCta>{authorization.install_cta}</AppCta>
              </AppContainer>
            </>
          )}

          <Dots src="/assets/common/lines_left.png" alt="dots-image" />
        </Container>
      </WelcomeStyled>
      <InstallPwaIos />
    </>
  );
};

const WelcomeStyled = styled.div<{height: number}>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: #fff;
  height: ${({ height }) => `${height}px`};

  @media screen and (min-width: 552px) {
    height: calc(100vh - 80px);
  }
`;

const Container = styled.div`
  padding: 50px 24px 0px;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
  position: relative;
  z-index: 1;
`;

const Highlight = styled.span`
  display: inline-flex;
  line-height: 1.5;
  color: #f43939;
`;

const BtnWrapper = styled.div`
  margin-top: auto;
  padding-bottom: 24px;
  padding-top: 80px;
  position: relative;
  z-index: 1;
`;

const Dots = styled.img`
  position: absolute;
  left: 12%;
  height: 100%;
  bottom: 0px;
  z-index: 0;
`;

const AppContainer = styled.div`
  width: 100%;
  max-width: 552px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 1;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px 13px;
  background-color: #f5f6f7;
  border-top: 1px solid rgba(33, 39, 46, 0.12);
  border-bottom: 1px solid rgba(33, 39, 46, 0.12);
  cursor: pointer;

  @media screen and (min-width: 552px) {
    bottom: 40px;
    width: 100%;
  }
`;

const AppContainerSection = styled.div`
  display: flex;
  align-items: center;
`;

const AppIcon = styled.div`
  width: 50px;
  height: 50px;
  min-width: 40px;
  min-height: 40px;
  margin-right: 16px;
  background-image: url('/assets/common/app-icon.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const AppText = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
  max-width: 160px;
`;

const AppCta = styled.div`
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: right;
  color: #3897ff;
`;

export default Welcome;
