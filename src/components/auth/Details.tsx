import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { sendDetails } from '@/store/actions/auth';
import { selectIsLoading } from '@/store/selectors/auth';
import { OnChange } from '@/components/common/hooks/useInput';

import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';
import useKeyPress from '@/components/common/hooks/useKeyPress';

import ButtonWrap from '@/components/common/ButtonWrap';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface Props {
  name: string;
  setName: OnChange;
  businessName: string;
  setBusinessName: OnChange;
}

const Details: React.FC<Props> = ({
  name,
  setName,
  businessName,
  setBusinessName,
}) => {
  const [{ authorization }] = useLanguage();
  const [isNameError, toggleIsNameError] = useToggle();
  const [isBusinessNameError, toggleIsBusinessNameError] = useToggle();
  const [isFocus, setIsFocus] = useToggle();

  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const enterPress = useKeyPress('Enter');

  const onBlurHandler = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 0);
  };

  useEffect(() => {
    if (enterPress) {
      nextStepHandler();
    }
  }, [enterPress]);

  useEffect(() => {
    if (name) toggleIsNameError(false);
  }, [name]);

  useEffect(() => {
    if (businessName) toggleIsBusinessNameError(false);
  }, [businessName]);

  const nextStepHandler = () => {
    if (!name) toggleIsNameError(true);
    if (!businessName) toggleIsBusinessNameError(true);

    if (!name || !businessName) return;

    dispatch(sendDetails(name, businessName));
  };

  return (
    <AuthStyled>
      <Container>
        <Title>{authorization.details_header}</Title>
        <InputWrapper isFixed={isFocus}>
          <Input
            type="text"
            placeholder={authorization.name_placeholder}
            label={authorization.name_label}
            onChange={setName}
            onFocus={() => setIsFocus(true)}
            onBlur={onBlurHandler}
            value={name}
            errorMsg={authorization.name_error}
            isError={isNameError}
          />
          <Input
            type="text"
            placeholder={authorization.business_placeholder}
            label={authorization.business_label}
            onChange={setBusinessName}
            onFocus={() => setIsFocus(true)}
            onBlur={onBlurHandler}
            value={businessName}
            errorMsg={authorization.business_error}
            isError={isBusinessNameError}
          />
        </InputWrapper>
        <ButtonWrap
          isFixed={!isFocus}
          maxWidth={504}
          paddingWidth={48}
        >
          <Button classTracking="onboarding profile-details cta-next" isLoading={isLoading} shadow onClick={nextStepHandler}>
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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  padding-top: 32px;
`;

const InputWrapper = styled.div<{ isFixed: boolean }>`
  margin-top: 43px;
  display: grid;
  gap: 40px;
  margin-bottom: ${({ isFixed }) => isFixed && '80px'};
`;

export default Details;
