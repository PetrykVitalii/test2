import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectLnForQuery } from '@/store/selectors/language';

import Button from '@/components/Button';
import LnSwitcher from '@/components/common/LnSwitcher';
import useLanguage from '@/components/common/hooks/useLanguage';
import SellSmarterIcon from '@/components/common/icons/SaleSmarter';
import InfoIcon from '@/components/common/icons/InfoIcon';

interface Props {}

const Home: React.FC<Props> = () => {
  const ln = useSelector(selectLnForQuery);
  const [{ home }] = useLanguage();

  const sellAppUrl = `${process.env.SELL_APP_URL}?lang=${ln}`;

  return (
    <HomeStyled>
      <Notification>
        <Icon>
          <InfoIcon />
        </Icon>
        <NotificationText>
          {home.notification_text}
        </NotificationText>
      </Notification>

      <Header>
        <WrapLogo>
          <SellSmarterIcon />
        </WrapLogo>
        <LnSwitcher />
      </Header>

      <Container>
        <Title>
          {home.home_message_start}
          &nbsp;
          <Highlight>
            {home.home_message_highlight}
          </Highlight>
          {home.home_message_end}
        </Title>

        <BtnWrapper>
          <LinkWrap
            href={sellAppUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button classTracking="cta-get-started" shadow>
              {home.btn_continue}
            </Button>
          </LinkWrap>
        </BtnWrapper>

        <Dots src="/assets/common/lines_left.png" alt="Line" />
      </Container>

    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
`;

const Notification = styled.div`
  display: flex;
  border-bottom: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  padding: 16px 20px;
`;

const Icon = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 16px;
`;

const NotificationText = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #787c80;
  min-height: 42px;
  white-space: pre-wrap;
`;

const Container = styled.div`
  padding: 40px 24px 0px;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const Highlight = styled.span`
  display: inline-flex;
  color: #f43939;
`;

const BtnWrapper = styled.div`
  margin-top: auto;
  padding-bottom: 24px;
  padding-top: 60px;
`;

const LinkWrap = styled.a`
  text-decoration: none;
`;

const Dots = styled.img`
  position: absolute;
  left: 12%;
  height: 100%;
  bottom: 0px;
  z-index: -1;
`;

const WrapLogo = styled.div`
  width: 120px;
  height: 48px;
`;

const Header = styled.div`
  padding: 20px 20px 0 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  background-color: #ffffff;
  width: 100%;
  max-width: 552px;
`;

export default Home;
