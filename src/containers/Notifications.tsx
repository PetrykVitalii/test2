import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeNotificationLanguage,
  getUserInfo,
  resetLoadingStatus,
} from '@/store/actions/settings';
import { selectIsSaveLoading } from '@/store/selectors/settings';
import { selectLn } from '@/store/selectors/language';
import { LANGUAGES } from '@/store/reducers/language';

import useToggle from '@/components/common/hooks/useToggle';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useLanguage from '@/components/common/hooks/useLanguage';
import SearchIcon from '@/components/common/icons/SearchIcon';
import CheckIcon from '@/components/common/icons/settings/CheckIcon';
import LoaderDots from '@/components/common/LoaderDots';
import Navigation from '@/components/Navigation';
import Search from '@/components/settings/Search';
import FixedHeader from '@/components/FixedHeader';

const Notifications: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();
  const dispatch = useDispatch();
  const [{ settings }] = useLanguage();
  const history = useHistory();
  const userLanguage = useSelector(selectLn);
  const isSaveLoading = useSelector(selectIsSaveLoading);
  const [ln, setLn] = useState(userLanguage);

  useEffect(() => {
    dispatch(getUserInfo());
    

    return () => {
      dispatch(resetLoadingStatus());
    };
  }, []);

  useEffect(() => {
    if (userLanguage !== null && !ln) {
      setLn(userLanguage);
    }
  }, [userLanguage]);

  const handleLanguageClick = (lnToSet: LANGUAGES) => () => {
    const body = {
      language: lnToSet,
    };

    dispatch(changeNotificationLanguage(body));
    setLn(lnToSet);
  };

  const languages: [string, LANGUAGES, string][] = [
    ['English', LANGUAGES.EN, 'change-language-english'],
    ['Indonesian', LANGUAGES.ID, 'change-language-indo'],
    ['ภาษาไทย', LANGUAGES.TH, 'change-language-thai'],
    ['中文', LANGUAGES.ZH, 'change-language-chinese'],
  ];

  const handleGoToSettings = () => history.push('/settings');

  if (isActiveSearch) {
    return (
      <Search
        userLanguages={languages}
        hideSearch={setActiveSearch}
        currentLanguage={ln}
        handleLanguageClick={handleLanguageClick}
      />
    );
  }

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <IconWrap onClick={handleGoToSettings}>
            <CloseIcon />
          </IconWrap>
          <SearchIconWrap onClick={setActiveSearch}>
            <SearchIcon />
          </SearchIconWrap>
          {isSaveLoading
            ? <LoaderDots />
            : <Title>{settings.notifications_header}</Title>}
        </HeaderWrap>
      </FixedHeader>
      <MainWrap>
        {languages.map((item) => (
          <Language
            key={item[0]}
            onClick={handleLanguageClick(item[1])}
            className="settings language"
          >
            {item[0]}
            <CheckIconWrap
              isSelected={item[1] === ln}
            >
              <CheckIcon />
            </CheckIconWrap>
          </Language>
        ))}
      </MainWrap>
      <Navigation path="settings" />
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const SearchIconWrap = styled.div`
  position: absolute;
  cursor: pointer;
  top: 22px;
  right: 24px;
  width: 24px;
  height: 24px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const Language = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 13px 16px;
  width: 100%;
  cursor: pointer;
`;

const CheckIconWrap = styled.div<{isSelected: boolean}>`
  display: ${({ isSelected }) => isSelected ? 'block' : 'none'};
  min-width: 22px;
  height: 22px;
`;

export default Notifications;
