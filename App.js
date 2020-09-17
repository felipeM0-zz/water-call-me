import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

import MainDrawer from './src/navigators/MainDrawer';

function App() {
  const MyStatusBar = ({backgroundColor, ...props}) => (
    <StatusBar backgroundColor={backgroundColor} {...props} />
  );

  return (
    <>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <NavigationContainer>
        <MainDrawer />
      </NavigationContainer>
    </>
  );
}

export default App;
