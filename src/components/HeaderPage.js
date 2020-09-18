import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/GeneralStyle';

const HeaderPage = (props) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.headerPrincipal}>
      <Text style={[styles.txtHeaderPrincipal, styles.txtShadow]}>
        {props.title}
      </Text>
      <TouchableHighlight
        underlayColor="none"
        onPress={() => navigation.openDrawer()}
        style={styles.tchHeaderMenu}>
        <IconIon
          style={styles.txtShadow}
          name="menu"
          size={30}
          color="#31949e"
        />
      </TouchableHighlight>
    </View>
  );
};

export default HeaderPage;
