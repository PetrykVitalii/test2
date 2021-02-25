/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
}

const Welcome: React.FC<Props> = () => (
  <Div to="/w">
    I do ittttttttttt
  </Div>
);

const Div = styled(Link)`
  color: red;
  font-size: 50px;
`;

export default Welcome;
