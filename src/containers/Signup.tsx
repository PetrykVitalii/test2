import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CloudflareApi from '@/api/cloudflare';

import { selectAuthRestoreIsLoading, selectAuthRestoreIsLoggedIn } from '@/store/selectors/auth-restore';
import { authRestore } from '@/store/actions/auth-restore';

import useInput from '@/components/common/hooks/useInput';
import useFetch from '@/components/common/hooks/useFetch';
import Loader from '@/components/common/Loader';
import { countryList, CountryFromList } from '@/components/common/country-list';

import Phone from '@/components/auth/Phone';
import OTP from '@/components/auth/OTP';

const detectCountry = async () => {
  try {
    const cloudflareApi = new CloudflareApi();

    const trace = await cloudflareApi.trace();

    const [location] = trace.match(/^loc=[A-Z]{2,}/gm)!;

    const iso = location.split('=')[1];

    const country = countryList.find((countryToFind) => countryToFind.iso === iso);

    if (!country) {
      throw new Error();
    }

    return country;
  } catch (e) {
    const singapore = countryList.find((country) => country.iso === 'SG')!;

    return singapore;
  }
};

const Signup: React.FC = () => {
  const [{ isPending, result }, fetchDefaultCountry] = useFetch(detectCountry);

  const [phoneInput, setPhoneInput] = useInput();

  const dispatch = useDispatch();

  const [phoneForApi, setPhoneForApi] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryFromList>();

  const isLoading = useSelector(selectAuthRestoreIsLoading);
  const isLoggedIn = useSelector(selectAuthRestoreIsLoggedIn);

  const { path } = useRouteMatch();

  useEffect(() => {
    fetchDefaultCountry();
  }, []);

  useEffect(() => {
    setSelectedCountry(result);
  }, [result]);

  if (isLoading) return <Loader />;
  if (isLoggedIn) {
    dispatch(authRestore(true));
    return null;
  }

  return (
    <Switch>
      <Route
        path={path}
        render={() => (
          <Phone
            phone={phoneInput}
            setPhone={setPhoneInput}
            setPhoneForApi={setPhoneForApi}
            isCountryLoading={isPending || !selectedCountry}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        )}
        exact
      />
      <Route path={`${path}/verify`} render={() => <OTP phone={phoneForApi} />} exact />
    </Switch>
  );
};

export default Signup;
