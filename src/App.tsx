import React, { FC } from 'react';
import Main from './ts/components/Main';
import MainBlock from './ts/components/MainBlock';

const App: FC = () => {
  return (
    <div className='wrapper'>
      {/* <MainBlock/> */}
      <Main/>
    </div>
  );
};

export default App;