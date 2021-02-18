import React, {
  ChangeEvent,
  ClipboardEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { RouteComponentProps } from 'react-router';
import BackIcon from '@/components/common/icons/BackIcon';
import Button from '@/components/Button';
import { sendCode, sendPhoneNumber } from '@/store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectIsError } from '@/store/selectors/auth';
import WarningIcon from '@/components/common/icons/WarningIcon';
import useLanguage from '@/components/common/hooks/useLanguage';
import { selectPhoneNumber } from '@/store/selectors/user';
import { selectIsLoadingQuote } from '@/store/selectors/quote';

interface Props extends RouteComponentProps<{catalogId: string}> {}

const Verify: React.FC<Props> = ({ history, match, location }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focused, setFocused] = useState(0);
  const { catalogId } = match.params;
  const isLoading = useSelector(selectIsLoading);
  const isLoadingQuote = useSelector(selectIsLoadingQuote);
  const isError = useSelector(selectIsError);
  const phoneNumber = useSelector(selectPhoneNumber);
  const [{ order }] = useLanguage();
  const query = location.search;

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
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  useEffect(() => {
    if (otp.filter((code) => code).length === 4) {
      dispatch(sendCode(otp.join(''), catalogId, query));
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

  const handleRefs = (i: number): MutableRefObject<HTMLInputElement | null> => inputs[i];

  const handleFocus = (i: number) => () => {
    setFocused(i);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    handlePasteData(e.clipboardData.getData('Text'));
  };

  const handlePasteData = (data: string) => {
    if (!Number.isNaN(Number(data)) && data.length === 4) {
      const newSecureCode = [...data];
      setOtp(newSecureCode);
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

  const handleSendCodeAgainClick = () => {
    setOtp(['', '', '', '']);
    dispatch(sendPhoneNumber(catalogId, query));
  };

  return (
    <WrapSignUp>
      <BackWrap onClick={history.goBack}>
        <BackIcon />
      </BackWrap>
      <Title>{order.code_header}</Title>
      <SubTitle>{`${order.code_instruction} +${phoneNumber}`}</SubTitle>
      <CodeWrapper>
        {otp.map((value, i) => (
          <Input
            key={i}
            type="number"
            pattern="[0-9]*"
            value={value}
            disabled={isLoading}
            maxLength={1}
            required
            onChange={handleSecureCode(i)}
            onPaste={handlePaste}
            ref={handleRefs(i)}
            onFocus={handleFocus(i)}
          />
        ))}
      </CodeWrapper>
      {isError && (
      <ErrorWrapper>
        <Icon>
          <WarningIcon />
        </Icon>
        <ErrorMessage>{order.code_send_error}</ErrorMessage>
      </ErrorWrapper>
      )}
      <CodeButton>
        <Button classTracking="buyer auth phone-number otp-send-code-again" isLoading={isLoading || isLoadingQuote} transparent onClick={handleSendCodeAgainClick}>
          {order.code_send_again}
        </Button>
      </CodeButton>
    </WrapSignUp>
  );
};

const ErrorWrapper = styled.div`
  display: flex;
  margin: 0 auto 32px;
  max-width: 280px;
  border-radius: 6px;
  border: 1px solid rgba(33, 39, 46, 0.08);
  background-color: rgb(255, 248, 235);
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 100%;
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

const CodeButton = styled.div`
  margin: 0 auto;
  max-width: 258px;
`;

const Input = styled.input`
  height: 52px;
  width: 52px;
  border-radius: 8px;
  border: 1px solid rgba(33, 39, 46, 0.12);
  text-align: center;
  background-color: #fcfcfc;
  font-size: 24px;
  color: #21272e;
  margin: 0 12px;

  :focus {
    outline: none;
  }
`;

const CodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 47px 0 36px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  width: 75%;
`;

const BackWrap = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin: 32px 0 16px;
`;

const WrapSignUp = styled.div`
  padding: 32px 24px 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
`;

export default Verify;
