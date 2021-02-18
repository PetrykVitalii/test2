import { selectIsCustomPrice } from '@/store/selectors/items';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import Loader from '@/components/Loader';
import { getQuote, quoteActions } from '@/store/actions/quote';
import {
  selectCatalog, selectIsComing, selectItems, selectQuote,
} from '@/store/selectors/quote';
import useLanguage from '@/components/common/hooks/useLanguage';
import formatStr from '@/utils/formatStr';
import useWindowScrollBlock from '../components/common/hooks/useWindowScrollBlock';
import ItemsContainer from '../components/ItemsContainer';

interface Props extends RouteComponentProps<{quoteId: string}>{}

const QuoteDone: React.FC<Props> = ({ history, match }) => {
  const { quoteId } = match.params;
  useWindowScrollBlock();
  const isComing = useSelector(selectIsComing);
  const isCustomPrice = useSelector(selectIsCustomPrice);
  const quote = useSelector(selectQuote);
  const items = useSelector(selectItems);
  const { is_default: isDefault, name, code } = useSelector(selectCatalog);
  const [{ quote: quoteLan }] = useLanguage();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    dispatch(getQuote(quoteId));
    return () => {
      dispatch(quoteActions.setIsComing(false));
    };
  }, []);

  const goBack = () => {
    history.push(`/catalogs/${code}`);
  };

  if (!isComing) {
    return <Loader />;
  }

  return (
    <Wrap heigth={window.innerHeight}>
      <Main>
        <OkIcon src="/assets/OK.png" alt="OK" />
        <Title>{quoteLan.quote_request_sent}</Title>
        <SubTitle>
          {quoteLan.back_to_you_soon.replace(
            '{supplierName}',
            isDefault ? formatStr(name) : formatStr(name),
          )}
        </SubTitle>
        <WrapItems>
          <ItemsContainer isCustomPrice={isCustomPrice} items={items} />
        </WrapItems>
        {quote.notes && (
        <>
          <Notes>{quoteLan.notes}</Notes>
          <OrderText>{quote.notes}</OrderText>
        </>
        )}
        <Button onClick={goBack}>{quoteLan.done}</Button>
      </Main>
    </Wrap>
  );
};

const OkIcon = styled.img`
  width: 50px;
  height: 66px;
  object-fit: contain;
  margin: 0 auto;
`;

const WrapItems = styled.div`
  margin : 32px 0;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
  margin: 16px auto 10px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #787c80;
`;

const Notes = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  text-transform: uppercase;
`;

const OrderText = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  margin: 16px 0 32px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const Button = styled.div`
  margin-top: auto;
  border-radius: 6px;
  background-image: linear-gradient(99deg, #ff474d, #fa4353);
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  padding: 15px 0 17px;
  box-shadow: 0 14px 30px -8px rgba(94, 22, 22, 0.47);
`;

const Main = styled.div`
  padding: 31px 16px 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const Wrap = styled.div<{heigth: number}>`
  max-width: 552px;
  margin: 0 auto;
  height: ${({ heigth }) => heigth && `${heigth}px`};
  position: fixed;
  z-index: 500;
  overflow-y: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

export default QuoteDone;
