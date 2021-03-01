import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import CheckIcon from '@/components/common/icons/CheckIcon';
import useToggle from '@/components/common/hooks/useToggle';
import Toast from '@/components/Toast';

interface Props {
  isActive: boolean;
  isDone: boolean;
  text: string;
  step: number;
  onClick: (isDone: boolean) => void;
}

const MyStep: React.FC<Props> = ({
  isActive,
  isDone,
  text,
  step,
  onClick,
}) => {
  const handleClick = () => onClick(isDone);

  return (
    <Step isActive={isActive} isDone={isDone} onClick={handleClick}>
      <Circle>
        {isDone && (
          <Done>
            <Check>
              <CheckIcon color="white" />
            </Check>
          </Done>
        )}
        <Number>{step}</Number>
      </Circle>
      <Title>{text}</Title>
    </Step>
  );
};

interface SignUpProps {
  active: number[];
  done: number[];
}

const SignUpSteps: React.FC<SignUpProps> = ({ active, done }) => {
  const [{ catalogs }] = useLanguage();

  const [showToast, setShowToast] = useToggle(false);
  const [toastText, setToastText] = useState('');

  useEffect(() => {
    let timer: number;

    if (showToast) {
      timer = setTimeout(() => {
        setToastText('');
        setShowToast(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showToast]);

  const handleStepClick = (isDone: boolean) => {
    let toastMessage: string = '';

    if (!isDone) {
      toastMessage = catalogs.catalog_next_step_warning;
    } else {
      toastMessage = catalogs.catalog_previous_step_warning;
    }

    setToastText(toastMessage);
    setShowToast(true);
  };

  return (
    <Steps className="onboarding header">
      <MyStep
        text={catalogs.step_details}
        step={1}
        isActive={!!active[0]}
        isDone={!!done[0]}
        onClick={handleStepClick}
      />
      <Div />
      <MyStep
        text={catalogs.step_items}
        step={2}
        isActive={!!active[1]}
        isDone={!!done[1]}
        onClick={handleStepClick}
      />
      <Div />
      <MyStep
        text={catalogs.btn_preview}
        step={3}
        isActive={!!active[2]}
        isDone={!!done[2]}
        onClick={handleStepClick}
      />
      <Toast
        isActive={showToast}
        text={toastText}
        style={{ top: 20, backgroundColor: '#21272e' }}
        autoClose={0}
      />
    </Steps>
  );
};

const Steps = styled.div`
  padding: 20px 34px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid #b4babf;
  min-height: 96px;
`;

const Div = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dae1e8;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 15px;
`;

const Title = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
  color: #b4babf;
  text-transform: uppercase;
`;

const Circle = styled.div`
  position: relative;
  min-height: 28px;
  max-height: 28px;
  width: 28px;
  border-radius: 50%;
  border: 2px solid #b4babf;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9px;
`;

const Done = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background-color: #6faba1;
  border-radius: 50%;
`;

const Check = styled.div`
  width: 80%;
  height: 80%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Number = styled.p`
  color: #b4babf;
  font-weight: bold;
`;

const Step = styled.li<{ isActive: boolean; isDone: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  min-width: 70px;

  ${Title} {
    color: ${({ isActive, isDone }) => (isActive || isDone) && '#21272e'};
  }

  ${Circle} {
    border-color: ${({ isActive }) => isActive && '#21272e'};
  }

  ${Number} {
    color: ${({ isActive }) => isActive && '#21272e'};
  }
`;

export default SignUpSteps;
