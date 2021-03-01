import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import { getUserInfo, logOut, resetLoadingStatus } from '@/store/actions/settings';

import { LANGUAGES } from '@/store/reducers/language';

import { selectLn } from '@/store/selectors/language';
import { selectUser, selectIsLoading } from '@/store/selectors/settings';
import { selectIsInstallPwaVisible, selectIsPWA } from '@/store/selectors/pwa';

import { installPwa } from '@/utils/install-pwa';

import DownloadIcon from '@/components/common/icons/DownloadIcon';
import ArrowIcon from '@/components/common/icons/settings/ArrowIcon';
import BellIcon from '@/components/common/icons/settings/BellIcon';
import HelpIcon from '@/components/common/icons/settings/HelpIcon';
import InfoIcon from '@/components/common/icons/settings/InfoIcon';
import LogOutIcon from '@/components/common/icons/settings/LogOutIcon';
import Loader from '@/components/common/Loader';
import LoaderDots from '@/components/common/LoaderDots';

import InstallPwaIos from '@/components/InstallPwaIos';

import ModalLogOut from '@/components/settings/ModalLogOut';
import Navigation from '@/components/Navigation';
import FixedHeader from '@/components/FixedHeader';

const Settings: React.FC = () => {
  const [{ settings, dashboard, common }] = useLanguage();
  const history = useHistory();
  const [isActiveModal, setIsActiveModal] = useToggle(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const userLanguage = useSelector(selectLn);
  const isInstallPwaVisible = useSelector(selectIsInstallPwaVisible);
  const isPWA = useSelector(selectIsPWA);

  const firstLetters = user?.full_name
    .split(' ')
    .map((word) => word[0])
    .join('');

  const getLanguageName = () => {
    switch (userLanguage.toLowerCase()) {
      case LANGUAGES.EN.toLowerCase():
        return 'English';
      case LANGUAGES.SG.toLowerCase():
        return 'English';
      case LANGUAGES.ID.toLowerCase():
        return 'Indonesian';
      case LANGUAGES.TH.toLowerCase():
        return 'ภาษาไทย';
      case LANGUAGES.ZH.toLowerCase():
        return '中文';
      default:
        return '';
    }
  };

  useEffect(() => {
    dispatch(getUserInfo());
    

    return () => {
      dispatch(resetLoadingStatus());
    };
  }, []);

  const handleGoToProfileSettings = () => history.push('/profile-settings');
  const handleGoToNotifications = () => history.push('/notifications-language');

  const contactSupport = () => {
    const target = isPWA ? '_self' : '_blank';
    window.open(`https://wa.me/+16502403661?text=${dashboard.contact_support}`, target);
  };

  const handleGoToLegalInfo = () => {
    const target = isPWA ? '_self' : '_blank';
    window.open('https://tinvio.com/legal/', target)?.focus();
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Container height={window.innerHeight}>
      <FixedHeader height={145} isAlwaysVisible>
        <HeaderWrap>
          <HeaderText>{settings.settings_header}</HeaderText>
          {isLoading ? (
            <LoaderWrap>
              <LoaderDots />
            </LoaderWrap>
          ) : (
            <UserInfo className="settings profile" onClick={handleGoToProfileSettings}>
              <Photo>{firstLetters}</Photo>
              <NamePhoneGroup>
                <Name>{user?.full_name}</Name>
                <PhoneNumber>{`+${user?.phone}`}</PhoneNumber>
              </NamePhoneGroup>
              <IconWrap>
                <ArrowIcon />
              </IconWrap>
            </UserInfo>
          )}
        </HeaderWrap>
      </FixedHeader>
      <MainWrap height={window.innerHeight}>
        {isLoading ? (
          <Loader scale="0.5" />
        ) : (
          <>
            <LinksWrap>
              <LinkWrap className="settings notifications" onClick={handleGoToNotifications}>
                <LinkIcon>
                  <BellIcon />
                </LinkIcon>
                <Language>{getLanguageName()}</Language>
                <TextWrap>{settings.notifications_header}</TextWrap>
              </LinkWrap>
              <LinkWrap className="settings help-and-support" onClick={contactSupport}>
                <LinkIcon>
                  <HelpIcon />
                </LinkIcon>
                <TextWrap>{settings.link_help_support}</TextWrap>
              </LinkWrap>
              <LinkWrap className="settings legal-info" onClick={handleGoToLegalInfo}>
                <LinkIcon>
                  <InfoIcon />
                </LinkIcon>
                <TextWrap>{settings.link_legal_info}</TextWrap>
              </LinkWrap>
              {isInstallPwaVisible && (
                <LinkWrap className="settings install-app" onClick={installPwa}>
                  <LinkIcon>
                    <DownloadIcon color="#21272e" />
                  </LinkIcon>
                  <TextWrap>{common.install_app}</TextWrap>
                </LinkWrap>
              )}
            </LinksWrap>
            <LogOutLink className="settings log-out btn" onClick={setIsActiveModal}>
              <LinkIcon>
                <LogOutIcon />
              </LinkIcon>
              <TextWrap>{settings.link_logout}</TextWrap>
            </LogOutLink>
          </>
        )}
      </MainWrap>
      {isActiveModal && (
        <ModalLogOut
          logOut={handleLogOut}
          hideModal={setIsActiveModal}
          classTrackingCancel="settings log-out cancel"
          classTrackingLogOut="settings log-out confirm"
        />
      )}
      <Navigation path="settings" />
      <InstallPwaIos />
    </Container>
  );
};

const Container = styled.div<{ height: number }>`
  @media screen and (max-width: 552px) {
    min-height: ${({ height }) => `${height}px`};
  }
`;

const TextWrap = styled.div`
  width: 100%;
`;

const HeaderWrap = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 16px 20px 16px;
  display: flex;
  width: 100%;
  align-items: start;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  cursor: pointer;
`;

const NamePhoneGroup = styled.div`
  display: block;
`;

const Photo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  padding: 8px 0;
  border: solid 1.7px rgba(33, 39, 46, 0.08);
  font-size: 15px;
  font-weight: 600;
  background-color: #f5f2f2;
  margin-right: 16px;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;
  word-break: normal;
`;

const HeaderText = styled.p`
  font-size: 28px;
  font-weight: 800;
  padding-left: 8px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;

  padding-bottom: 13px;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;
`;

const PhoneNumber = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #21272e;
  margin-top: 4px;
`;

const IconWrap = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
`;

const Language = styled.div`
  position: absolute;
  top: 21px;
  right: 24px;
  font-size: 12px;
  font-weight: 600;
  color: #787c80;
`;

const MainWrap = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: ${({ height }) => `calc(${height}px - 217px)`};

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 297px);
  }
`;

const LinksWrap = styled.div``;

const LinkWrap = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 16px 15px 16px;
  color: #21272e;
  user-select: none;
  cursor: pointer;
  align-items: center;
`;

const LogOutLink = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 16px 15px 16px;
  color: #feaa22;
  user-select: none;
  cursor: pointer;
  align-items: center;
`;

const LinkIcon = styled.div`
  margin-right: 24px;
  height: 24px;
`;

const LoaderWrap = styled.div`
  padding: 15px;
`;

export default Settings;
