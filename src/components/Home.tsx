/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Button from '@/components/Button';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {}

const Home: React.FC<Props> = ({ history }) => {
  const [value, setValue] = useState<number>(0);

  const handleClick = () => setValue(value + 1);

  return (
    <div onClick={() => history.goBack()}>
      <p>Home page</p>
      <Button onClick={handleClick}>{value}</Button>
    </div>
  );
};

export default Home;
