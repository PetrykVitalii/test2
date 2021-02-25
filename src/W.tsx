/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
}

const W: React.FC<Props> = () => (
  <Div to="/e">
    Wwwwwwwwwwwwwwww
  </Div>
);

const Div = styled(Link)`
  color: green;
  font-size: 50px;
`;

export default W;
