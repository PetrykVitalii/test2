import React from 'react';
import styled from 'styled-components';

const Welcome: React.FC = () => (
  <>
    <WelcomeStyled height={window.innerHeight}>
      <Container>
        <Title>
          ergerg
          <Highlight>
            ergerg
          </Highlight>
          ergerg
        </Title>

        <BtnWrapper>
          efrerf
        </BtnWrapper>

        <Dots src="/assets/common/lines_left.png" alt="dots-image" />
      </Container>
    </WelcomeStyled>
  </>
);

const WelcomeStyled = styled.div<{height: number}>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: #fff;
  height: ${({ height }) => `${height}px`};

  @media screen and (min-width: 552px) {
    height: calc(100vh - 80px);
  }
`;

const Container = styled.div`
  padding: 50px 24px 0px;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
  position: relative;
  z-index: 1;
`;

const Highlight = styled.span`
  display: inline-flex;
  line-height: 1.5;
  color: #f43939;
`;

const BtnWrapper = styled.div`
  margin-top: auto;
  padding-bottom: 24px;
  padding-top: 80px;
  position: relative;
  z-index: 1;
`;

const Dots = styled.img`
  position: absolute;
  left: 12%;
  height: 100%;
  bottom: 0px;
  z-index: 0;
`;

export default Welcome;
