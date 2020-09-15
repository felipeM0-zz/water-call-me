import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

const PrincipalScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.vwContent}>
      {/* HEADER */}
      <View style={styles.headerPrincipal}>
        <Text style={[styles.txtHeaderPrincipal, styles.txtShadow]}>
          Cálculo IMC
        </Text>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => navigation.openDrawer()}
          style={styles.tchHeaderMenu}>
          <IconIon
            style={styles.txtShadow}
            name="menu"
            size={30}
            color="#92E4ED"
          />
        </TouchableHighlight>
      </View>
      <View style={styles.vwSuperiorBox}>
        <View style={styles.vwBoxInputs}>
          <View style={styles.vwBoxInput}>
            <View style={styles.vwBoxIcon}>
              <Text style={[styles.txtTopIcon, styles.txtShadow]}>Peso</Text>
              <IconMIC
                name="anvil"
                size={50}
                color="#FFFFFF"
                style={styles.txtShadow}
              />
              <TextInput
                maxLength={5}
                keyboardType="numeric"
                style={styles.inpWeight}
              />
            </View>
            <View style={styles.vwBoxRightInside}>
              <Text style={[styles.txtRightInside, styles.txtShadow]}>Kg</Text>
            </View>
          </View>

          <View style={styles.vwBoxDivide}>
            <IconFA5
              name="divide"
              size={40}
              color="#FFFFFF"
              style={styles.txtShadow}
            />
          </View>

          <View style={styles.vwBoxInput}>
            <View style={styles.vwBoxIcon}>
              <Text style={[styles.txtTopIcon, styles.txtShadow]}>Altura</Text>
              <IconMIC
                name="human-male-height-variant"
                size={50}
                color="#FFFFFF"
                style={styles.txtShadow}
              />
              <TextInput
                maxLength={5}
                keyboardType="numeric"
                style={styles.inpWeight}
              />
            </View>
            <View style={styles.vwBoxRightInside}>
              <Text style={[styles.txtRightInside, styles.txtShadow]}>m</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  vwContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  headerPrincipal: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtHeaderPrincipal: {
    fontSize: 25,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    color: '#7bcbd4',
  },
  tchHeaderMenu: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  txtShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -0.8, height: 0.8},
    textShadowRadius: 1,
  },
  vwBoxInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vwBoxInput: {
    flexDirection: 'row',
  },
  txtTopIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inpWeight: {
    height: 40,
    padding: 0,
    width: 80,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#1d6970',
    textAlign: 'center',
    color: '#1d6970',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vwBoxRightInside: {
    justifyContent: 'flex-end',
  },
  txtRightInside: {
    fontSize: 17,
    marginLeft: 2,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  vwBoxIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwSuperiorBox: {
    padding: 10,
    backgroundColor: '#31949e',
    width: '80%',
    borderRadius: 10,
    paddingBottom: 15
  },
  vwBoxDivide: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginLeft: 15,
  },
});

export default PrincipalScreen;
