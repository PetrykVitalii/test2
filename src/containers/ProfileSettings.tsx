import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { City } from '@/api/main';

import {
  editProfileInfo,
  getCitiesByCountry,
  getUserInfo,
  resetLoadingStatus,
} from '@/store/actions/settings';

import {
  selectIsLoading,
  selectIsSaveLoading,
  selectCitiesByCountry,
  selectUser,
  selectUserInfo,
} from '@/store/selectors/settings';
import { selectIsPWA } from '@/store/selectors/pwa';

import useLanguage from '@/components/common/hooks/useLanguage';
import CloseIcon from '@/components/common/icons/CloseIcon';
import UserIcon from '@/components/common/icons/settings/UserIcon';
import useInput from '@/components/common/hooks/useInput';
import TrashIcon from '@/components/common/icons/settings/TrashIcon';
import Loader from '@/components/common/Loader';

import DropDownSelect from '@/components/settings/DropDownSelect';
import Navigation from '@/components/Navigation';
import FixedHeader from '@/components/FixedHeader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useToggle from '@/components/common/hooks/useToggle';

const ProfileSettings: React.FC = () => {
  const [name, setName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const [businessName, setBusinessName] = useInput('');
  const [city, setCity] = useState('');
  const [cityId, setCityId] = useState<string | null>('');
  const [userCities, setUserCities] = useState<City[]>([]);
  const [isActiveInput, setIsActiveInput] = useToggle();

  const [{ settings }] = useLanguage();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isSaveLoading = useSelector(selectIsSaveLoading);
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);
  const cities = useSelector(selectCitiesByCountry);
  const isPWA = useSelector(selectIsPWA);

  useEffect(() => {
    if (user === null) dispatch(getUserInfo());
    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      dispatch(resetLoadingStatus());
    };
  }, []);

  useEffect(() => {
    if (user !== null) {
      const fullName = user.full_name.replace(/\s+/g, ' ').trim().split(' ');
      const firstName = fullName[0];
      const secondName = fullName.slice(1, fullName.length).join(' ');

      setName(firstName);
      if (secondName) setLastName(secondName);
      setBusinessName(user.business_name);
      setCityId(user.city_id);
    }
    if (user?.country_id) {
      dispatch(getCitiesByCountry(user?.country_id));
    }
  }, [user]);

  useEffect(() => {
    if (userInfo && user) {
      setCity(userInfo.city || user.city);
    }
  }, [userInfo, user]);

  useEffect(() => {
    if (cities) {
      setUserCities(cities);
    }
  }, [cities]);

  const handleSaveButtonClick = () => {
    const fullName = lastName.length > 0 ? `${name} ${lastName}` : name;

    const body = {
      full_name: fullName,
      business_name: businessName,
      city_id: cityId,
      city,
    };

    dispatch(editProfileInfo(body));
  };

  const handleChangeCity = (cityName: string, id: string | null) => {
    setCity(cityName);
    setCityId(id);
  };

  const handleCreateEmail = () => {
    const addresses = 'support@tinvio.com';
    const subject = settings.delete_account_subject;
    const body = settings.delete_account_text(user!.phone);

    const href = `mailto:${addresses}?subject=${subject}&body=${body}`;

    const target = isPWA ? '_self' : '_blank';

    window.open(href, target);
  };

  const isNameEmpty = name.length === 0;
  const isBusinessNameEmpty = businessName.length === 0;
  const isCityEmpty = city?.length === 0;

  const isSaveButtonDisabled = (
    isNameEmpty
    || isBusinessNameEmpty
    || isCityEmpty
  );

  const handleGoToSettings = () => history.push('/settings');

  const hideNavigation = () => setIsActiveInput(true);
  const showNavigation = () => setIsActiveInput(false);

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <IconWrap onClick={handleGoToSettings}>
            <CloseIcon />
          </IconWrap>
          <Title>{settings.profile_header}</Title>
        </HeaderWrap>
      </FixedHeader>
      <MainWrap>
        {isLoading || !user
          ? <Loader scale="0.5" />
          : (
            <>
              <Photo>
                <UserIcon />
              </Photo>
              <InputsWrap>
                <Input
                    type="text"
                    placeholder={settings.first_name_placeholder}
                    label={settings.first_name_label}
                    onChange={setName}
                    value={name}
                    errorMsg={settings.first_name_error}
                    isError={isNameEmpty}
                    classTracking="settings profile-input-field"
                    onFocus={hideNavigation}
                    onBlur={showNavigation}
                />
                <EmptyPlace />
                <Input
                  type="text"
                  placeholder={settings.last_name_placeholder}
                  label={settings.last_name_label}
                  onChange={setLastName}
                  value={lastName}
                  classTracking="settings profile-input-field"
                  onFocus={hideNavigation}
                  onBlur={showNavigation}
                />
              </InputsWrap>
              <InputWrap>
                <Input
                  type="text"
                  placeholder={settings.business_placeholder}
                  label={settings.business_label}
                  onChange={setBusinessName}
                  value={businessName}
                  errorMsg={settings.business_error}
                  isError={isBusinessNameEmpty}
                  classTracking="settings profile-input-field"
                  onFocus={hideNavigation}
                  onBlur={showNavigation}
                />
              </InputWrap>
              <InputWrap>
                <DropDownSelect
                  valueCity={city}
                  setValueCity={handleChangeCity}
                  text={settings.city_label}
                  cities={userCities}
                  className="settings profile-input-field"
                  isError={isCityEmpty}
                  onFocus={hideNavigation}
                  onBlur={showNavigation}
                />
              </InputWrap>
              <DeleteButton
                onClick={handleCreateEmail}
                className="settings delete-account"
              >
                <ButtonIcon>
                  <TrashIcon />
                </ButtonIcon>
                {settings.btn_delete_account}
                <Caption />
              </DeleteButton>
              <ButtonWrap>
                <Button
                  onClick={handleSaveButtonClick}
                  isLoading={isSaveLoading}
                  disabledOnly={isSaveButtonDisabled}
                  shadow
                >
                  {settings.btn_save_changes}
                </Button>
              </ButtonWrap>
            </>
          )}
      </MainWrap>
      {!isActiveInput && (
        <Navigation path="settings" />
      )}
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
  padding: 24px 16px;
  overflow-y: auto;
  flex-shrink: 0;
  background: white;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const Photo = styled.label`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: solid 2px rgba(33, 39, 46, 0.08);
  border-radius: 100%;
  background-color: #f4f5f9;
  margin-bottom: 50px;
  cursor: pointer;
`;

const InputWrap = styled.div`
  position: relative;
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
`;

const InputsWrap = styled.div`
  display: flex;
  margin-bottom: 40px;
  width: 100%;
`;

const EmptyPlace = styled.div`
  width: 16px;
`;

const DeleteButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 16px 15px 16px;
  color: #feaa22;
  user-select: none;
  cursor: pointer;
  margin-bottom: 24px;
`;

const ButtonIcon = styled.div`
  height: 24px;
  margin-right: 24px;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

const Caption = styled.div`
  position: absolute;
  top: 17px;
  right: 24px;
  font-size: 12px;
  font-weight: 600;
  color: #787c80;
`;

export default ProfileSettings;
