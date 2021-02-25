/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
}

const E: React.FC<Props> = () => {
    return (
      <Div to="/">
         eeeeeeeeeeeeeeeeeeeeeee
      </Div>
    )
};
  
const Div = styled(Link)`
  color: yellow;
`;

export default E;
