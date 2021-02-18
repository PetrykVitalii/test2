import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useToggle from '@/components/common/hooks/useToggle';
import useFetch from '@/components/common/hooks/useFetch';
import useLanguage from '@/components/common/hooks/useLanguage';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';

import BackIcon from '@/components/common/icons/BackIcon';
import InputBorder from '@/components/InputBorder';
import Button from '@/components/Button';
import { userActions } from '@/store/actions/user';
import { selectUser } from '@/store/selectors/user';
import { selectCatalog } from '@/store/selectors/catalog';
import MainApi from '@/api/main';
import search from '@/utils/search';
import LocalStorage from '@/utils/local-storage';
import formatStr from '@/utils/formatStr';

const fetchCitiesByCountry = async (id: number) => {
  try {
    const mainApi = new MainApi();

    const { cities } = await mainApi.getCitiesByCountry(id);

    return cities;
  } catch (e) {
    return [];
  }
};

interface Props extends RouteComponentProps<{catalogId: string}> {}

const PlaceOrder: React.FC<Props> = ({ history, match }) => {
  const dispatch = useDispatch();
  const { catalogId } = match.params;
  const [isValidating, setIsValidating] = useToggle(false);
  const [isShowDropDown, setIsShowDropDown] = useToggle(false);
  const [{ order, common }] = useLanguage();
  const { country_id: countryId } = useSelector(selectCatalog);

  const [{ isPending: isCitiesLoading, result: cities }, getCitiesByCountry] = useFetch(
    fetchCitiesByCountry,
  );
  const {
    adress, businessName, city, fullName, postCode,
  } = useSelector(selectUser);
  const {
    seller_catalog: { name, is_default: isDefault },
    business_name: businessNameSeller,
  } = useSelector(selectCatalog);

  const filteredCities = cities && search(cities, city, ({ name_ascii }) => name_ascii);

  useEffect(() => {
    getCitiesByCountry(+countryId);
  }, []);

  useEffect(() => {
    setIsShowDropDown(true);
  }, [city]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const countryRef = useOnClickOutside(() => handleClearCountry());

  const handleClearCountry = () => {
    setIsShowDropDown(false);
  };

  const changeCity = (name_ascii: string) => () => {
    dispatch(userActions.changeCity(name_ascii));
  };

  const scrollToWarning = (top: number) => {
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  const next = () => {
    setIsValidating(true);

    if (!fullName.trim()) {
      scrollToWarning(20);
      return;
    }

    if (!adress.trim()) {
      scrollToWarning(115);
      return;
    }

    if (!city.trim()) {
      scrollToWarning(210);
      return;
    }

    if (!postCode.trim()) {
      scrollToWarning(305);
      return;
    }

    dispatch(userActions.changeInfo('adress', formatStr(adress)));
    dispatch(userActions.changeInfo('city', formatStr(city)));
    dispatch(userActions.changeInfo('fullName', formatStr(fullName)));
    dispatch(userActions.changeInfo('postCode', formatStr(postCode)));
    dispatch(userActions.changeInfo('businessName', formatStr(businessName)));

    setIsValidating(false);

    window.dataLayer.push({
      event: 'agoraBuyerOnboardingDetailsSubmit',
      formName: 'Agora Buyer Onboarding Details Submit',
    });

    LocalStorage.setUserInfo('user', 'fullName', formatStr(fullName));
    LocalStorage.setUserInfo('user', 'city', formatStr(city));
    LocalStorage.setUserInfo('user', 'adress', formatStr(adress));
    LocalStorage.setUserInfo('user', 'postCode', formatStr(postCode));
    LocalStorage.setUserInfo('user', 'businessName', formatStr(businessName));

    history.push(`/${catalogId}/review`);
  };

  const showDropDown = (): boolean => !!city
    && isShowDropDown
    && !isCitiesLoading
    && filteredCities!.length > 0
    && !filteredCities!.find((findCity) => findCity.name_ascii === city);

  return (
    <PlaceOrderWrap>
      <Header>
        <PlusWrap onClick={history.goBack}>
          <BackIcon />
        </PlusWrap>
        <TitleWrap>
          <Title>{order.order_details}</Title>
          <SubTitle>{isDefault ? businessNameSeller : name}</SubTitle>
        </TitleWrap>
      </Header>
      <Empty />
      <Main>
        <Label>
          <InputBorder
            classTracking="buyer order onboarding input-field"
            value={fullName}
            label={order.full_name}
            placeholder={order.palceholder_name}
            isError={isValidating && !fullName.trim()}
            errorMsg={order.name_error}
            keyStr="fullName"
          />
        </Label>
        <Label>
          <InputBorder
            classTracking="buyer order onboarding input-field"
            value={adress}
            label={order.address}
            placeholder={order.palceholder_address}
            isError={isValidating && !adress.trim()}
            errorMsg={order.address_is_required}
            keyStr="adress"
          />
        </Label>
        <InputWrap>
          <Label>
            <InputBorder
              classTracking="buyer order onboarding input-field"
              value={city}
              label={order.city}
              placeholder={order.palceholder_city}
              isError={isValidating && !city.trim()}
              errorMsg={order.city_error}
              disabled={isCitiesLoading}
              keyStr="city"
            />
          </Label>
          { showDropDown() && (
            <SelectWrapper ref={countryRef}>
              {filteredCities!.map(({ id, name_ascii }) => (
                <Item key={id} onClick={changeCity(name_ascii)}>
                  <Text>{name_ascii}</Text>
                </Item>
              ))}
            </SelectWrapper>
          )}
        </InputWrap>
        <Label>
          <InputBorder
            classTracking="buyer order onboarding input-field"
            value={postCode}
            label={order.post_code}
            placeholder={order.palceholder_code}
            isError={isValidating && !postCode.trim()}
            errorMsg={order.post_code_is_required}
            maxlength={20}
            keyStr="postCode"
          />
        </Label>
        <Label>
          <InputBorder
            classTracking="buyer order onboarding input-field"
            value={businessName}
            label={order.business_name}
            placeholder={order.optional}
            keyStr="businessName"
          />
        </Label>
        <WrapButton>
          <Button classTracking="buyer order onboarding cta-continue" onClick={next}>{common.btn_continue}</Button>
        </WrapButton>
      </Main>
    </PlaceOrderWrap>
  );
};

const InputWrap = styled.div`
  position: relative;
`;

const SelectWrapper = styled.div`
  position: absolute;
  top: 64px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.22);
  background-color: #ffffff;
  overflow: auto;
  max-height: 195px;
  z-index: 999;
  padding: 10px 0px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const Item = styled.div`
  padding: 10px 16px;
  cursor: pointer;

  :first-child {
    padding: 10px 16px 10px 16px;
  }

  :last-child {
    padding: 10px 16px 10px 16px;
  }
`;

const WrapButton = styled.div`
  margin-top: auto;
`;

const Label = styled.div`
  margin-bottom: 40px;
`;

const Main = styled.div`
  padding: 43px 16px 16px;
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: calc(100% - 72px);
`;

const Empty = styled.div`
  height: 72px; 
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const TitleWrap = styled.div`
  height: 100%;
  margin-left: 24px;
  width: calc(100% - 43px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PlusWrap = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Header = styled.div`
  height: 72px;
  padding: 12px 24px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.17);
  background-color: #ffffff;
  width: 100%; 
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 100;
  max-width: 552px;
`;

const PlaceOrderWrap = styled.div`
  background-color: white;
  height: 100%;
`;

export default PlaceOrder;
