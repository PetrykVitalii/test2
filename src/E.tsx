/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
}

const E: React.FC<Props> = () => (
  <Div to="/">
    eeeeeeeeeeeeeeeeeeeeeee
  </Div>
);

const Div = styled(Link)`
  color: yellow;
  font-size: 50px;
`;

export default E;
