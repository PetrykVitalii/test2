import React, { useState } from 'react';
import Button from '@/components/Button';

const Home: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleClick = () => setValue(value + 1);

  return (
    <div>
      <p>Home page</p>
      <Button onClick={handleClick}>{value}</Button>
    </div>
  );
};

export default Home;
