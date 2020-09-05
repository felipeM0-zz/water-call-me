import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

const PrincipalScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{height: 413}}>
        <View style={styles.headerPrincipal}>
          <Text style={styles.txtHeaderPrincipal}>Controle de Água</Text>
        </View>
        <View style={styles.vwContentPrincipal}>
          <IconF
            name="gear"
            size={25}
            color="#FFFFFF"
            style={styles.iconGear}
          />

          <View style={styles.vwContentPie}>
            <Progress.Pie
              progress={0.7}
              borderWidth={0}
              size={190}
              color="rgba(146, 228, 237,0.6)"
            />
            <View style={styles.vwBackWhite}>
              <Text style={styles.txtCenterPrincipal}>0/0ml</Text>
            </View>
          </View>

          <IconIon
            name="water"
            size={70}
            color="#FFFFFF"
            style={styles.IconWater}
          />

          <Text style={styles.txtHistory}>Histórico</Text>
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.vwHistory} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerPrincipal: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtHeaderPrincipal: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#92E4ED',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  },
  vwContentPrincipal: {
    height: 350,
    backgroundColor: '#92E4ED',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
  },
  iconGear: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
    position: 'absolute',
    left: 15,
    top: 15,
  },
  vwContentPie: {
    width: 200,
    height: 200,
    borderRadius: 100,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconWater: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  txtHistory: {
    fontSize: 20,
    position: 'absolute',
    bottom: 3,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  },
  vwBackWhite: {
    height: 170,
    width: 170,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    borderRadius: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCenterPrincipal: {
    fontSize: 28,
    color: '#92E4ED',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  },
  vwHistory: {
    height: 55,
    width: '80%',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#92E4ED',
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
});

export default PrincipalScreen;
