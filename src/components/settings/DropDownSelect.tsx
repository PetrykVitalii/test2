import React, { useEffect } from 'react';
import styled from 'styled-components';

import { City } from '@/api/main';

import search from '@/utils/search';

import useInput from '@/components/common/hooks/useInput';
import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import Input from '@/components/Input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  valueCity: string | null;
  setValueCity: (name: string, id: string | null) => void;
  text?: string;
  cities?: City[];
  isError?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const DropDownSelect: React.FC<InputProps> = ({
  valueCity,
  setValueCity,
  cities,
  isError = false,
  onFocus,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useInput('');
  const [isCitySelected, setIsCitySelected] = useToggle(true);
  const [{ settings }] = useLanguage();

  useEffect(() => {
    if (valueCity) setInputValue(valueCity);
  }, []);

  const changeSelectedCity = (id: number, value: string) => () => {
    setInputValue(value);

    const foundCity = cities!.find((city) => city.id === id);

    setValueCity(foundCity!.name_ascii, String(foundCity!.id));
    setIsCitySelected(true);
  };

  const handleInputCity = (value: string) => {
    setInputValue(value);
    setValueCity(value, null);
    setIsCitySelected(false);
  };

  const filteredCities = cities && search(cities, inputValue, ({ name_ascii }) => name_ascii);

  return (
    <>
      <Input
        type="text"
        placeholder={settings.city_placeholder}
        label={settings.city_label}
        onChange={handleInputCity}
        value={inputValue}
        errorMsg={settings.city_error}
        isError={isError}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {!!inputValue.length && !isCitySelected && !!filteredCities?.length && (
      <SelectWrapper>
        {filteredCities!.map(({ name_ascii, id }) => (
          <Item
            key={id}
            className="settings notifications select-country"
            onClick={changeSelectedCity(id, name_ascii)}
          >
            <Text>{name_ascii}</Text>
          </Item>
        ))}
      </SelectWrapper>
      )}
    </>
  );
};

const SelectWrapper = styled.div`
  position: absolute;
  top: 64px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.22);
  background-color: #ffffff;
  overflow: auto;
  max-height: 165px;
  z-index: 12;
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

export default DropDownSelect;
