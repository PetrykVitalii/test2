import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Country as ICountry, City as ICity } from '@/api/main';

import { selectAuthRestoreIsLoading } from '@/store/selectors/auth-restore';

import useInput from '@/components/common/hooks/useInput';
import Loader from '@/components/common/Loader';

import Details from '@/components/auth/Details';
import Located from '@/components/auth/Located';
import AddItems from '@/components/auth/AddItems';
import Success from '@/components/auth/Success';
import CreateDefaultCatalog from '@/components/auth/CreateDefaultCatalog';
import Category from '@/components/auth/Category';
import AdvancedDetails from './AdvancedDetails';

const Authorization: React.FC = () => {
  const [name, setName] = useInput();
  const [businessName, setBusinessName] = useInput();

  const [selectedCountryLoc, setSelectedCountryLoc] = useState<ICountry>();
  const [selectedCityLoc, setSelectedCityLoc] = useState<ICity>();
  const [countryInputValue, setCountryInputValue] = useInput();
  const [cityInputValue, setCityInputValue] = useInput();

  const isLoading = useSelector(selectAuthRestoreIsLoading);

  useEffect(() => {
    if (selectedCityLoc) {
      setCityInputValue(selectedCityLoc.name_ascii);
    }
  }, [selectedCityLoc]);

  if (isLoading) return <Loader />;

  return (
    <Switch>
      <Route
        path="/setup/step1"
        render={() => (
          <Details
            name={name}
            setName={setName}
            businessName={businessName}
            setBusinessName={setBusinessName}
          />
        )}
        exact
      />
      <Route
        path="/setup/step2"
        render={() => (
          <Located
            selectedCountry={selectedCountryLoc}
            setSelectedCountry={setSelectedCountryLoc}
            selectedCity={selectedCityLoc}
            setSelectedCity={setSelectedCityLoc}
            countryInputValue={countryInputValue}
            setCountryInputValue={setCountryInputValue}
            cityInputValue={cityInputValue}
            setCityInputValue={setCityInputValue}
          />
        )}
        exact
      />

      <Route
        path="/setup/step3"
        component={CreateDefaultCatalog}
        exact
      />

      <Route
        path="/setup/step3/category"
        component={Category}
        exact
      />

      <Route
        path="/setup/step4"
        component={AddItems}
        exact
      />

      <Route
        path="/setup/step4/:itemId"
        component={AdvancedDetails}
        exact
      />

      <Route path="/setup/step5" component={Success} exact />
    </Switch>
  );
};

export default Authorization;
