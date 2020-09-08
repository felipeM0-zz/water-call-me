import React, {useState} from 'react';
import {Drawer, TouchableRipple, Switch} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableHighlight} from 'react-native-gesture-handler';

const DrawerContent = (props) => {
  const [isDark, setIsDark] = useState();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section>
          <View style={styles.vwHeaderDrawer}>
            <Text style={styles.txtHeaderDrawer} numberOfLines={1}>
              Olá, Felipe
            </Text>
          </View>
        </Drawer.Section>

        <Drawer.Section>
          <DrawerItem
            icon={() => <IconI name="water" color="#FFFFFF" size={28} />}
            label="Controle de Água"
            labelStyle={styles.lblDrawerOptions}
            onPress={() => props.navigation.navigate('Principal')}
          />
          <DrawerItem
            icon={() => (
              <IconMC name="calculator-variant" color="#FFFFFF" size={28} />
            )}
            label="Cálculo IMC"
            labelStyle={styles.lblDrawerOptions}
            onPress={() => props.navigation.navigate('Calc')}
          />
          <DrawerItem
            icon={() => (
              <IconMC name="fruit-watermelon" color="#FFFFFF" size={28} />
            )}
            label="Dicas"
            labelStyle={styles.lblDrawerOptions}
            onPress={() => props.navigation.navigate('Info')}
          />
        </Drawer.Section>

        <Drawer.Section title="Preferências">
          <TouchableRipple
            rippleColor="transparent"
            style={styles.tchPrefs}
            onPress={() => toggleTheme()}>
            <View style={styles.vwDarkTheme}>
              <Text style={styles.lblDrawerOptions}>Tema Escuro</Text>
              <View pointerEvents="none">
                <Switch color="#333333" value={isDark} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => {}}
          style={styles.tchReset}>
          <Text style={styles.txtReset}>Resetar aplicação</Text>
        </TouchableHighlight>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  vwHeaderDrawer: {
    height: 70,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  txtHeaderDrawer: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
  },
  lblDrawerOptions: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  tchPrefs: {
    marginRight: 10,
    marginLeft: 10,
  },
  vwDarkTheme: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  tchReset: {
    alignItems: 'center',
    backgroundColor: '#333',
    width: '60%',
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 4,
    marginBottom: 25,
  },
  txtReset: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DrawerContent;
