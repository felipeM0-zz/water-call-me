import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainDrawer from './src/navigators/MainDrawer';

function App() {
  return (
    <NavigationContainer>
      <MainDrawer />
    </NavigationContainer>
  );
}

export default App;
