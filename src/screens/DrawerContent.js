import React, {useState} from 'react';
import {View, Text, TouchableHighlight, Switch} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIons from 'react-native-vector-icons/Ionicons';
// EXTERNAL STYLES
import styles from '../styles/DrawerContent';

const DrawerContent = (props) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <View style={styles.vwContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.vwSection}>
          <View style={styles.vwHeaderDrawer}>
            <Text style={styles.txtHeaderDrawer} numberOfLines={1}>
              Olá, Felipe
            </Text>
          </View>
        </View>

        <View style={styles.vwSection}>
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
          <DrawerItem
            icon={() => (
              <IconIons name="notifications-circle" color="#FFFFFF" size={28} />
            )}
            label="Teste de Notificações"
            labelStyle={styles.lblDrawerOptions}
            onPress={() => props.navigation.navigate('Notification')}
          />
        </View>

        <View style={styles.vwSection} title="Preferências">
          <Text style={styles.txtPreferences}>Preferências</Text>
          <TouchableHighlight
            underlayColor="none"
            style={styles.tchPrefs}
            onPress={() => toggleTheme()}>
            <View style={styles.vwDarkTheme}>
              <Text style={styles.lblDrawerOptions}>Tema Escuro</Text>
              <View pointerEvents="none">
                <Switch
                  disabled={true}
                  thumbColor={isDark ? '#333' : '#DDD'}
                  value={isDark}
                  trackColor={{
                    false: 'rgba(0,0,0,0.1)',
                    true: 'rgba(0,0,0,0.3)',
                  }}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </DrawerContentScrollView>

      <View>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => {}}
          style={styles.tchReset}>
          <Text style={styles.txtReset}>Resetar aplicação</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default DrawerContent;
