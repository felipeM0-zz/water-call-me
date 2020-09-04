import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// IMPORTED COMPONENTS
import PrincipalScreen from '../screens/PrincipalScreen';
import InfoScreen from '../screens/InfoScreen';
import CalcScreen from '../screens/CalcScreen';
import ConfigScreen from '../screens/ConfigScreen';

const MainDrawer = createDrawerNavigator();

export default () => {
  return (
    <MainDrawer.Navigator>
      <MainDrawer.Screen name="Principal" component={PrincipalScreen} />
      <MainDrawer.Screen name="Info" component={InfoScreen} />
      <MainDrawer.Screen name="Calc" component={CalcScreen} />
      <MainDrawer.Screen name="Config" component={ConfigScreen} />
    </MainDrawer.Navigator>
  );
};
