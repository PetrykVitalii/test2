import React from 'react';
import styled from 'styled-components';

interface Props {}

const Home: React.FC<Props> = () => (
  <HomeStyled>
    <h1>weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</h1>
  </HomeStyled>
);

const HomeStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
`;

export default Home;
