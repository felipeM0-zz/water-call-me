import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// IMPORTED SCREENS
import PrincipalScreen from '../screens/PrincipalScreen';
import InfoScreen from '../screens/InfoScreen';
import CalcScreen from '../screens/CalcScreen';
import Notif from '../../notification';

import DrawerContent from '../screens/DrawerContent';

const MainDrawer = createDrawerNavigator();
const widthScreen = Dimensions.get('window').width;

export default () => {
  return (
    <MainDrawer.Navigator
      drawerStyle={{backgroundColor: '#3e929c'}}
      drawerType="back"
      overlayColor={1}
      openByDefault={false}
      initialRouteName="Calc"
      edgeWidth={widthScreen}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <MainDrawer.Screen name="Principal" component={PrincipalScreen} />
      <MainDrawer.Screen name="Info" component={InfoScreen} />
      <MainDrawer.Screen name="Calc" component={CalcScreen} />
      <MainDrawer.Screen name="Notification" component={Notif} />
    </MainDrawer.Navigator>
  );
};
