import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { changeLanguage } from '@/store/actions/language';
import { LANGUAGES } from '@/store/reducers/language';
import { selectLn } from '@/store/selectors/language';
import useToggle from '@/components/common/hooks/useToggle';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import DropDownIcon from '@/components/common/icons/DropDownIcon';

const LnSwitcher: React.FC = () => {
  const [isOpen, toggleIsOpen] = useToggle();
  const ln = useSelector(selectLn);
  const selectRef = useOnClickOutside(() => toggleIsOpen(false));

  const dispatch = useDispatch();

  const getLanguageName = () => {
    switch (ln) {
      case LANGUAGES.EN:
        return 'English';
      case LANGUAGES.SG:
        return 'English';
      case LANGUAGES.ID:
        return 'Indonesian';
      case LANGUAGES.TH:
        return 'ภาษาไทย';
      case LANGUAGES.ZH:
        return '中文';
      default:
        return '';
    }
  };

  const handleLanguageClick = (lnToSet: LANGUAGES) => () => {
    dispatch(changeLanguage(lnToSet));
    toggleIsOpen(false);
  };

  const languages: [string, LANGUAGES, string][] = [
    ['English', LANGUAGES.EN, 'buyer-catalog change-language-english'],
    ['Indonesian', LANGUAGES.ID, 'buyer-catalog change-language-indo'],
    ['ภาษาไทย', LANGUAGES.TH, 'buyer-catalog change-language-thai'],
    ['中文', LANGUAGES.ZH, 'buyer-catalog change-language-chinese'],
  ];

  return (
    <LnSwitcherStyledWrapper ref={selectRef}>
      <LnSwitcherStyled
        className="buyer-catalog change-language-toggle"
        isActive={isOpen}
        onClick={toggleIsOpen}
      >
        {getLanguageName()}
        <IconDropDown isActive={isOpen}>
          <DropDownIcon />
        </IconDropDown>
      </LnSwitcherStyled>

      {isOpen && (
        <SelectWrapperStyled>
          {languages.map(([name, lnToSet, classLan], i) => (
            <LanguageSelectStyled
              className={classLan}
              key={i}
              onClick={handleLanguageClick(lnToSet)}
            >
              {name}
            </LanguageSelectStyled>
          ))}
        </SelectWrapperStyled>
      )}
    </LnSwitcherStyledWrapper>
  );
};

const LnSwitcherStyledWrapper = styled.div`
  position: relative;
  height: 36px;
`;

const LnSwitcherStyled = styled.div<{ isActive: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 28px 0px 12px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: ${({ isActive }) => (isActive ? '0px 0px 0px 2px #3897ff' : '0px 0px 0px 1px #dae1e8')};

  font-size: 13px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  white-space: nowrap;
  color: #21272e;
  cursor: pointer;
`;

const IconDropDown = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 9px;
  right: 4px;
  width: 20px;
  height: 20px;
  transition: 0.5s ease;
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0)')};
`;

const SelectWrapperStyled = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0px;
  z-index: 10;
  width: 115px;
  padding: 8px 0 5px;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.22);
  background-color: white;
`;

const LanguageSelectStyled = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 17px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  cursor: pointer;
`;

export default LnSwitcher;
