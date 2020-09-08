import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

import MainDrawer from './src/navigators/MainDrawer';

function App() {
  return (
    <NavigationContainer>
      <MainDrawer />
    </NavigationContainer>
  );
}

export default App;
