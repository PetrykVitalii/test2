import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({ children, onClick }) => (
  <CustomButton onClick={onClick}>
    {children}
  </CustomButton>
);

const CustomButton = styled.button`
  width: 100%;
  height: 50px;
  background: #41ac4a;
  outline: none;
  border: none;
`;

export default Button;
