import React from 'react';
import styled from 'styled-components';

const About: React.FC = () => (
  <Div>
    <H1>About</H1>
    <P>{new Date().getTime()}</P>
  </Div>
);

const Div = styled.div``;

const H1 = styled.h1``;

const P = styled.p``;

export default About;
