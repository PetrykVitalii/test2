import React from 'react';
import styled from 'styled-components';

import { Select } from '@/utils/selectOrderDate';

import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import DropDownIcon from '@/components/common/icons/DropDownIcon';
import { selectLn } from '@/utils/dashboardLan';

interface Props {
  value: Select;
  setValue: (value: Select) => void;
  text?: string;
  data: Select[];
  classTracking: string;
}

const DropDownSelect: React.FC<Props> = ({
  value, setValue, text, data, classTracking,
}) => {
  const [{ dashboard }] = useLanguage();
  const [isActive, setActive] = useToggle();

  const changeUnit = (v: Select) => () => setValue(v);

  const selectRef = useOnClickOutside(() => setActive(false));

  return (
    <Wrapper ref={selectRef} className={classTracking}>
      {text && <Label>{text}</Label>}
      <Option isActive={isActive} onClick={setActive}>
        <SelectWrap>
          <Text>{selectLn(value.name, dashboard)}</Text>
          <IconDropDown isActive={isActive}>
            <DropDownIcon />
          </IconDropDown>
        </SelectWrap>
        <DropDown>
          {data.map((option) => (
            <DropDownItems
              className={option.classTracking}
              key={option.name}
              onClick={changeUnit(option)}
              statusHover={option.name === value.name}
            >
              {selectLn(option.name, dashboard)}
            </DropDownItems>
          ))}
        </DropDown>
      </Option>
    </Wrapper>
  );
};

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  position: absolute;
  top: -2px;
  left: 10px;
  padding: 0 2px 0 6px;
  background-color: white;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const IconDropDown = styled.div<{isActive: boolean}>`
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: 0.5s ease;
  transform: ${({ isActive }) => isActive ? 'rotate(180deg)' : 'rotate(0)'} ;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 17px;
  width: 100%;
`;

const DropDownItems = styled.div<{statusHover: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 44px;
  letter-spacing: normal;
  color: #21272e;
  width: 100%;
  height: 44px;
  background-color: ${({ statusHover }) => (statusHover ? '#f5f6f7' : ' #ffffff')};
  padding: 0 17px;
`;

const DropDown = styled.div`
  padding: 8px 0;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.22);
  background-color: #ffffff;
  overflow: auto;
  position: absolute;
  width: 100%;
  z-index: 110;
  top: 70px;
  left: 0;
  border: solid 1px #dae1e8;
`;

const Option = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  height: 56px;
  border-radius: 8px;
  background-color: #ffffff;
  padding-right: 14px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
  display: flex;
  border: ${({ isActive }) => (isActive ? 'solid 1px #3897ff' : 'solid 1px #dae1e8')};

  ${DropDown} {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  };
`;

export default DropDownSelect;
