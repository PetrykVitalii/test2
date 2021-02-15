/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react'
import styled from 'styled-components';

interface Props {
}

const App: React.FC<Props> = () => {
    const fail = () => {
      const styledC: any = styled;
      console.log(styledC);
      document.body.style.background = "red";
    };
  
    return (
    <Div onClick={fail}>My React and TypeScript App!</Div>
)};
  
const Div = styled.h1`
`;

export default App;
