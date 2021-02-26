import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import MainApi, { Country as ICountry, City as ICity } from '@/api/main';
import { sendLocated, sendBeacon } from '@/store/actions/auth';
import { selectIsLoading } from '@/store/selectors/auth';
import { OnChange } from '@/components/common/hooks/useInput';
import { selectLn } from '@/store/selectors/language';

import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import useFetch from '@/components/common/hooks/useFetch';
import search from '@/utils/search';

import ButtonWrap from '@/components/common/ButtonWrap';
import Button from '@/components/Button';
import Input from '@/components/Input';

const fetchCountries = async () => {
  const mainApi = new MainApi();

  const { countries } = await mainApi.getCountries();

  return countries;
};

const fetchCitiesByCountry = async (id: number) => {
  const mainApi = new MainApi();

  const { cities } = await mainApi.getCitiesByCountry(id);

  return cities;
};

interface Props {
  selectedCountry: ICountry | undefined;
  setSelectedCountry: (value: ICountry | undefined) => void;
  selectedCity: ICity | undefined;
  setSelectedCity: (value: ICity | undefined) => void;
  countryInputValue: string;
  setCountryInputValue: OnChange;
  cityInputValue: string;
  setCityInputValue: OnChange;
}

const Located: React.FC<Props> = ({
  selectedCountry,
  setSelectedCountry,
  selectedCity,
  setSelectedCity,
  countryInputValue,
  setCountryInputValue,
  cityInputValue,
  setCityInputValue,
}) => {
  const [{ authorization }] = useLanguage();

  const [{ isPending: isCountriesLoading, result: countries }, getCountries] = useFetch(
    fetchCountries,
  );
  const [{ isPending: isCitiesLoading, result: cities }, getCitiesByCountry] = useFetch(
    fetchCitiesByCountry,
  );

  const [isInputFocus, setIsInputFocus] = useState(false);

  const [isCountryError, toggleIsCountryError] = useToggle();
  const [isCityError, toggleIsCityError] = useToggle();

  const isLoading = useSelector(selectIsLoading);
  const ln = useSelector(selectLn);

  const dispatch = useDispatch();

  const onBlurHandler = () => {
    setTimeout(() => {
      setIsInputFocus(false);
    }, 0);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) getCitiesByCountry(selectedCountry.id);
  }, [selectedCountry]);

  useEffect(() => {
    if (countryInputValue) toggleIsCountryError(false);
    if (cityInputValue) toggleIsCityError(false);
  }, [countryInputValue, cityInputValue]);

  const changeSelectedCountry = (id: number, value: string) => () => {
    setCountryInputValue(value);

    const foundCountry = countries!.find((country) => country.id === id);

    setSelectedCountry(foundCountry);
  };

  const changeSelectedCity = (id: number, value: string) => () => {
    setCityInputValue(value);

    const foundCity = cities!.find((city) => city.id === id);

    setSelectedCity(foundCity);
  };

  const handleInputCountry = (value: string) => {
    setSelectedCountry(undefined);
    setSelectedCity(undefined);

    setCityInputValue('');
    setCountryInputValue(value);
  };

  const handleInputCity = (value: string) => {
    setSelectedCity(undefined);
    setCityInputValue(value);
  };

  const nextStepHandler = () => {
    if (!selectedCountry) toggleIsCountryError(true);
    if (!cityInputValue && selectedCountry) toggleIsCityError(true);

    if (!selectedCountry || !cityInputValue) return;

    const cityId = selectedCity !== undefined ? selectedCity.id : null;

    dispatch(sendBeacon(ln, selectedCountry.name, cityInputValue));

    dispatch(sendLocated(
      selectedCountry.id,
      cityId,
      cityInputValue,
    ));
  };

  const filteredCountry = countries && search(countries, countryInputValue, ({ name }) => name);

  const filteredCities = cities && search(cities, cityInputValue, ({ name_ascii }) => name_ascii);

  const handleClearCountry = () => {
    setCountryInputValue('');
    setIsInputFocus(false);
  };

  const handleClearCity = () => {
    // setCityInputValue('');
    setIsInputFocus(false);
  };

  const countryRef = useOnClickOutside(() => handleClearCountry());
  const cityRef = useOnClickOutside(() => handleClearCity());

  return (
    <AuthStyled>
      <Container>
        <Title
          isHide={((!selectedCountry && !countryInputValue)
          || (selectedCity || (!cityInputValue && selectedCountry)))
          && !isInputFocus}
        >
          {authorization.location_header}
        </Title>
        <InputsWrapper>
          <InputWrap>
            <Input
              type="text"
              placeholder={authorization.country_placeholder}
              label={authorization.country_label}
              onChange={handleInputCountry}
              disabled={isCountriesLoading}
              value={countryInputValue}
              errorMsg={authorization.country_error}
              isError={isCountryError}
              onFocus={() => setIsInputFocus(true)}
              onBlur={onBlurHandler}
            />
            {(!!countryInputValue.length && !selectedCountry) && (
              <SelectWrapper ref={countryRef}>
                {filteredCountry!.map(({ name, id }) => (
                  <Item key={id} onClick={changeSelectedCountry(id, name)}>
                    <Text>{name}</Text>
                  </Item>
                ))}
              </SelectWrapper>
            )}
          </InputWrap>
          {selectedCountry && (
            <InputWrap>
              <Input
                type="text"
                placeholder={authorization.city_placeholder}
                label={authorization.city_label}
                onChange={handleInputCity}
                disabled={isCitiesLoading}
                value={cityInputValue}
                errorMsg={authorization.city_error}
                isError={isCityError}
                onFocus={() => setIsInputFocus(true)}
                onBlur={onBlurHandler}
              />
              {!!cityInputValue.length && !selectedCity && !!filteredCities?.length && (
                <SelectWrapper ref={cityRef}>
                  {filteredCities!.map(({ name_ascii, id }) => (
                    <Item key={id} onClick={changeSelectedCity(id, name_ascii)}>
                      <Text>{name_ascii}</Text>
                    </Item>
                  ))}
                </SelectWrapper>
              )}
            </InputWrap>
          )}
        </InputsWrapper>
        <ButtonWrap
          isFixed={!isInputFocus}
          maxWidth={504}
          paddingWidth={48}
        >
          <Button
            classTracking="onboarding location-details cta-next"
            disabled={!selectedCountry || !selectedCity}
            isLoading={isLoading}
            shadow
            onClick={nextStepHandler}
          >
            {authorization.btn_next}
          </Button>
        </ButtonWrap>
      </Container>
    </AuthStyled>
  );
};

const AuthStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Container = styled.div`
  padding: 0 24px;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const Title = styled.h1<{ isHide: boolean | undefined }>`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  padding-top: 32px;
  max-height: ${({ isHide }) => isHide ? '128px' : '0px'};
  opacity: ${({ isHide }) => isHide ? '1' : '0'};
  transition: max-height 400ms, opacity 400ms;
`;

const InputsWrapper = styled.div`
  margin-top: 43px;
  display: flex;
  flex-direction: column;
`;

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 48px;
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

const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

export default Located;
