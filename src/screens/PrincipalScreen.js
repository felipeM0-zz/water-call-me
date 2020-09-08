import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import Data from '../data';

const PrincipalScreen = () => {
  const navigation = useNavigation();
  const dmsion = Dimensions.get('screen').width;

  const [valueNow, setValueNow] = useState(0);
  const [valueObj, setValueObj] = useState(2500);
  const [valueIncrement, setValueIncrement] = useState(200);
  const [showButtonIncrement, setShowButtonIncrement] = useState(true);

  const renderItem = ({item}) => (
    <View style={styles.vwHistory(dmsion - 100)}>
      <Text style={styles.txtContentHistory}>{item.title}</Text>
    </View>
  );

  const incrementWater = () => {
    setValueNow(valueNow + valueIncrement);
  };

  useEffect(() => {
    valueNow >= valueObj
      ? (setValueNow(valueObj),
        setShowButtonIncrement(false),
        setTimeout(() => {
          setValueNow(0);
          setShowButtonIncrement(true);
        }, 1000))
      : null;
  }, [valueNow]);

  return (
    <SafeAreaView style={styles.savContent}>
      <View style={styles.vwWater}>
        <View style={styles.headerPrincipal}>
          <Text style={[styles.txtHeaderPrincipal, styles.txtShadow]}>
            Controle de Água
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
        <View style={styles.vwContentPrincipal}>
          <IconF
            name="gear"
            size={25}
            color="#FFFFFF"
            style={[styles.iconGear, styles.txtShadow]}
          />

          <View style={styles.vwContentPie}>
            <Progress.Pie
              progress={valueNow / valueObj}
              borderWidth={0}
              size={190}
              color="rgba(146, 228, 237,0.6)"
            />
            <View style={styles.vwBackWhite}>
              <Text style={[styles.txtCenterPrincipal, styles.txtShadow]}>
                {valueNow}/{valueObj}ml
              </Text>
            </View>
          </View>

          {showButtonIncrement && (
            <TouchableHighlight
              onPress={() => incrementWater()}
              underlayColor="none"
              style={styles.tchWater}>
              <>
                <Text style={[styles.txtIncremet, styles.txtShadow]}>
                  +{valueIncrement}ml
                </Text>
                <IconIon
                  name="water"
                  size={70}
                  color="#FFFFFF"
                  style={styles.txtShadow}
                />
              </>
            </TouchableHighlight>
          )}

          <Text style={[styles.txtHistory, styles.txtShadow]}>Histórico</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.ftlHistory}
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    color: '#92E4ED',
  },
  txtShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  },
  txtIncremet: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
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
  txtHistory: {
    fontSize: 20,
    position: 'absolute',
    bottom: 3,
    color: '#FFFFFF',
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
    fontSize: 25,
    color: '#92E4ED',
  },
  vwHistory: (dms) => ({
    height: 55,
    width: dms,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'rgba(114, 221, 232, 0.3)',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  txtContentHistory: {
    fontSize: 17,
    color: '#72dde8',
    fontWeight: 'bold',
  },
  vwWater: {
    height: 413,
  },
  savContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tchHeaderMenu: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  tchWater: {
    position: 'absolute',
    right: 20,
    bottom: 17,
    alignItems: 'center',
    borderRadius: 5,
  },
  ftlHistory: {
    alignItems: 'center',
  },
});

export default PrincipalScreen;
