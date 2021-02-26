import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Welcome = () => (
  <ALink to="/q">Welcome</ALink>
)

const ALink = styled(Link)`
  color: blue;
`;

export default Welcome; 