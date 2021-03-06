import React, { useEffect } from 'react';
import styled from 'styled-components';

import CreateStep1 from './CreateStep1';
import useToggle from '../common/hooks/useToggle';
import CreateStep2 from './CreateStep2';
import CreateCatalogsStep from './CreateCatalogStep';

const CreateDefaultCatalog: React.FC = () => {
  const [isNextStep, setIsNextStep] = useToggle(false);

  useEffect(() => {
    
  }, []);

  return (
    <Container>
      <CreateCatalogsStep active={[1, 0, 0]} done={[0, 0, 0]} />
      <Main>
        {isNextStep
          ? <CreateStep2 />
          : <CreateStep1 setIsNextStep={setIsNextStep} />}
      </Main>
    </Container>
  );
};

const Main = styled.div`
  padding: 24px 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 96px);
  background-color: white;

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 174px);
  }
`;

const Container = styled.div`
  background-color: white;
  height: 100%;
`;

export default CreateDefaultCatalog;
