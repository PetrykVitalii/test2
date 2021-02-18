import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import ArrowIcon from '../components/common/icons/ArrowIcon';
import BackIcon from '../components/common/icons/BackIcon';
import OrderIcon from '../components/common/icons/OrderIcon';
import QuoteIcon from '../components/common/icons/QuoteIcon';

interface Props extends RouteComponentProps<{catalogId: string}>{
}

const Fork: React.FC<Props> = ({ match, history }) => {
  const { catalogId } = match.params;

  return (
    <Wrap heigth={window.innerHeight}>
      <Header>
        <BackWrap onClick={history.goBack}>
          <BackIcon />
        </BackWrap>
      </Header>
      <Main>
        <BlockInfo to={`/${catalogId}/quote`}>
          <IconWrap>
            <QuoteIcon />
          </IconWrap>
          <Info>
            <Title>Get a Quote</Title>
            <Text>Get a personalized quote with prices, promotions and payment options</Text>
          </Info>
          <ArrowWrap>
            <ArrowIcon />
          </ArrowWrap>
        </BlockInfo>
        <BlockInfo to={`/${catalogId}/order`}>
          <IconWrap>
            <OrderIcon />
          </IconWrap>
          <Info>
            <Title>Place an Order</Title>
            <Text>Enter item quantities and place an order</Text>
          </Info>
          <ArrowWrap>
            <ArrowIcon />
          </ArrowWrap>
        </BlockInfo>
      </Main>
    </Wrap>
  );
};

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const Info = styled.div`
  margin: 0 16px;
  width: calc(100% - 72px);
`;

const ArrowWrap = styled.div`
  width: 18px;
  height: 18px;
`;

const BlockInfo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  margin-bottom: 16px;
  text-decoration: none;
`;

const Main = styled.div`
  padding: 6px 24px;
`;

const BackWrap = styled.div`
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

const Header = styled.header`
  background-color: #ffffff;
  max-width: 552px;
  width: 100%;
  padding: 30px 20px;
`;

export default Fork;
