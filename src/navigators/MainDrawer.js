import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// IMPORTED SCREENS
import PrincipalScreen from '../screens/PrincipalScreen';
import InfoScreen from '../screens/InfoScreen';
import CalcScreen from '../screens/CalcScreen';

import DrawerContent from '../screens/DrawerContent';

const MainDrawer = createDrawerNavigator();

export default () => {
  return (
    <MainDrawer.Navigator
      drawerStyle={{backgroundColor: '#3e929c'}}
      drawerType="back"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <MainDrawer.Screen name="Principal" component={PrincipalScreen} />
      <MainDrawer.Screen name="Info" component={InfoScreen} />
      <MainDrawer.Screen name="Calc" component={CalcScreen} />
    </MainDrawer.Navigator>
  );
};
