/* eslint-disable no-console */
import React, {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  ChangeEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { sendCode, sendCodeAgain } from '@/store/actions/auth';
import { selectIsLoading, selectIsError, selectErrMsg } from '@/store/selectors/auth';
import useLanguage from '@/components/common/hooks/useLanguage';
import Button from '@/components/Button';
import WarningIcon from '@/components/common/icons/auth/WarningIcon';
import BackIcon from '@/components/common/icons/BackIcon';

interface Props {
  phone: string;
}

const OTP: React.FC<Props> = ({ phone }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focused, setFocused] = useState(0);
  const [{ authorization }] = useLanguage();

  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const errMsg = useSelector(selectErrMsg);

  const history = useHistory();

  const dispatch = useDispatch();

  const code0 = useRef<HTMLInputElement | null>(null);
  const code1 = useRef<HTMLInputElement | null>(null);
  const code2 = useRef<HTMLInputElement | null>(null);
  const code3 = useRef<HTMLInputElement | null>(null);

  const inputs: MutableRefObject<HTMLInputElement | null>[] = [code0, code1, code2, code3];

  useEffect(() => {
    if (code0.current) {
      code0.current.focus();
    }
  }, [code0]);

  useEffect(() => {
    if (otp.filter((code) => code).length === 4) {
      dispatch(sendCode(phone, otp.join('')));
    }
  }, [otp]);

  useEffect(() => {
    document.removeEventListener('keydown', handleKeyDown, true);

    addKeyDownListener();

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [otp, focused]);

  const addKeyDownListener = () => {
    document.addEventListener('keydown', handleKeyDown, true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();

    switch (e.code) {
      case 'Backspace':
        onDelete();
        return;
      case 'ArrowLeft':
        onKeyLeftOrRight(-1);
        return;
      case 'ArrowRight':
        onKeyLeftOrRight(1);
        return;
      default:
        break;
    }

    switch (e.keyCode) {
      case 8:
        onDelete();
        return;
      case 37:
        onKeyLeftOrRight(-1);
        return;
      case 39:
        onKeyLeftOrRight(1);
        break;
      default:
        break;
    }
  };

  const onDelete = () => {
    if (!otp[focused]) {
      const index = focused === 0 ? 0 : focused - 1;

      inputs[index].current!.focus();
    } else {
      const newSecureCode = [...otp];

      newSecureCode[focused] = '';

      setOtp(newSecureCode);
    }
  };

  const onKeyLeftOrRight = (direction: 1 | -1) => {
    let index: number;

    if (direction === 1) {
      index = focused === inputs.length - 1 ? 0 : focused + 1;
    }

    if (direction === -1) {
      index = focused === 0 ? inputs.length - 1 : focused - 1;
    }

    inputs[index!].current!.focus();
  };

  const handleSecureCode = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (isValidCode(value)) {
      setValidOtp(value);
      return;
    }

    if (value.length > 1) return;

    if (!Number.isNaN(Number(value)) && value !== ' ') {
      const newOtp = [...otp];

      newOtp[i] = value;

      if (newOtp[i] && i !== inputs.length - 1) {
        inputs[i + 1].current!.focus();
      }

      setOtp(newOtp);
    }
  };

  const isValidCode = (code: string) => !Number.isNaN(Number(code)) && code?.length === 4;

  const setValidOtp = (code: string) => {
    const newSecureCode = [...code];

    setOtp(newSecureCode);
  };

  const handleRefs = (i: number): MutableRefObject<HTMLInputElement | null> => inputs[i];

  const handleFocus = (i: number) => () => {
    setFocused(i);
  };

  const handleSendCodeAgainClick = () => {
    setOtp(['', '', '', '']);
    dispatch(sendCodeAgain(phone));
  };

  const handleBack = () => history.push('/signup');

  return (
    <OTPStyled>
      <Header>
        <IconBack onClick={handleBack}>
          <BackIcon />
        </IconBack>
      </Header>
      <Container>
        <TextWrapper>
          <Title>{authorization.code_header}</Title>
          <SubTitle>{authorization.code_instruction}</SubTitle>
        </TextWrapper>
        <CodeWrapper>
          {otp.map((value, i) => (
            <Input
              key={i}
              type="number"
              pattern="[0-9]*"
              value={value}
              disabled={isLoading}
              required
              onChange={handleSecureCode(i)}
              ref={handleRefs(i)}
              onFocus={handleFocus(i)}
              autoComplete="one-time-code"
            />
          ))}
        </CodeWrapper>
        {isError && (
          <ErrorWrapper>
            <Icon>
              <WarningIcon />
            </Icon>
            <ErrorMessage>{errMsg}</ErrorMessage>
          </ErrorWrapper>
        )}
        <CodeButton>
          <Button classTracking="onboarding phone-number otp-send-code-again" isLoading={isLoading} transparent onClick={handleSendCodeAgainClick}>
            {authorization.code_send_again}
          </Button>
        </CodeButton>
      </Container>
    </OTPStyled>
  );
};

const OTPStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  padding: 0 24px;
  flex-grow: 3;
  background: #fff;
`;

const Header = styled.div`
  display:flex;
  align-items: center;
  padding: 32px 20px 24px 20px;
`;

const IconBack = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  padding-bottom: 47px;
`;

const CodeButton = styled.div`
  margin: 32px auto;
  max-width: 258px;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  padding-bottom: 16px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  max-width: 180px;
`;

const CodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 52px;
  margin-bottom: 12px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  margin: 25px auto 32px auto;
  max-width: 280px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.08);
  background-color: #fff8eb;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #feaa22;
`;

const Icon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Input = styled.input`
  height: 100%;
  width: 52px;
  border-radius: 8px;
  border: 1px solid rgba(33, 39, 46, 0.12);
  text-align: center;
  background-color: #fcfcfc;
  font-size: 24px;
  color: #21272e;

  caret-color: #f43939;

  margin-right: 24px;

  :last-child{  
    margin-right: 0px;
  }

  :focus {
    outline: none;
  }
`;

export default OTP;
