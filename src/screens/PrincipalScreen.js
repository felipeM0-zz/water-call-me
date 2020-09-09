import React, {useState, useEffect, useRef} from 'react';
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
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';
import Data from '../data';
import moment from 'moment';

const PrincipalScreen = () => {
  const navigation = useNavigation();
  const dmsion = Dimensions.get('screen').width;

  const [valueNow, setValueNow] = useState(0);
  const [valueObj, setValueObj] = useState(2500);
  const [valueIncrement, setValueIncrement] = useState(200);
  const [showButtonIncrement, setShowButtonIncrement] = useState(true);
  const [haveHistory, setHaveHistory] = useState(true);
  const [myData, setMydata] = useState([]);

  const renderItem = ({item}) => (
    <View style={styles.vwHistory(dmsion - 100)}>
      <Text style={styles.txtContentHistory}>{item.hist}</Text>
    </View>
  );

  const EmptyComponent = () => (
    <View style={styles.vwEmpty}>
      <Lottie
        speed={0.3}
        source={require('../images/JSON/circle-water.json')}
        autoPlay
        loop
        autoSize
        resizeMode="center"
        // style={{backgroundColor:'#333333'}} // QUANDO ESTIVER #474747
        // style={{backgroundColor:'#FFFFFF'}} // QUANDO ESTIVER #FFFFFF
      />
      <Text style={[styles.txtEmpty, styles.txtShadow]}>
        Sem histórico,{'\n'}beba água!
      </Text>
    </View>
  );

  const verify = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      let correctKeys = [];
      let allHist = [];

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].substr(0, 5) == '@hist') {
          correctKeys.push(keys[i]);
        }
      }

      for (let i = 0; i < correctKeys.length; i++) {
        JSON.parse(await AsyncStorage.getItem(correctKeys[i])).forEach((e) => {
          let val = {id: e.id, hist: e.history, date: e.date};
          allHist.push(val);
        });
      }

      let histFinal = allHist.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      setMydata(histFinal);
      histFinal.length <= 0 ? setHaveHistory(false) : setHaveHistory(true);
      // await AsyncStorage.clear();
    } catch (error) {
      console.log('Verify - PrincipalScreen: ', error);
    }
  };

  const addnew = async () => {
    try {
      setValueNow(valueNow + valueIncrement);
      let idnow = uuid(),
        data = moment(new Date()).format('DD/MM/YY'),
        hora = moment(new Date()).format('H:mm:ss'),
        value = valueIncrement.toString() + 'ml — ' + data + ' as ' + hora,
        final = [
          {
            id: idnow,
            history: value,
            date: new Date(),
          },
        ];
      await AsyncStorage.setItem('@hist' + idnow, JSON.stringify(final));
    } catch (error) {
      console.log('addnew - PrincipalScreen: ', error);
    } finally {
      valueNow >= valueObj
        ? (setValueNow(valueObj),
          setShowButtonIncrement(false),
          setTimeout(() => {
            setValueNow(0);
            setShowButtonIncrement(true);
          }, 1000))
        : null;

      verify();
    }
  };

  useEffect(() => {
    verify();
  }, [valueNow]);

  return (
    <SafeAreaView style={styles.savContent}>
      <View style={styles.vwWater}>
        {/* HEADER */}
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
        {/* CONTAINER PIE */}
        <LinearGradient
          colors={['#47bdc9', '#47bdc9', '#92E4ED', 'rgba(190, 178, 237,0.5)']}
          style={styles.vwContentPrincipal}>
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
              style={{position: 'absolute'}}
            />
            <View style={styles.vwBackWhite}>
              <Text style={[styles.txtCenterPrincipal, styles.txtShadow]}>
                {valueNow}/{valueObj}ml
              </Text>
            </View>
          </View>

          {showButtonIncrement && (
            <TouchableHighlight
              onPress={() => addnew()}
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

          {myData.length > 0 && (
            <Text style={[styles.txtHistory, styles.txtShadow]}>
              Histórico ({myData.length}/100)
            </Text>
          )}
        </LinearGradient>
      </View>

      <FlatList
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        contentContainerStyle={styles.ftlHistory(haveHistory)}
        data={myData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyComponent}
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
    color: '#7bcbd4',
  },
  txtShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -0.8, height: 0.8},
    textShadowRadius: 1,
  },
  txtIncremet: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  vwContentPrincipal: {
    height: 350,
    width: '85%',
    borderRadius: 10,
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
    fontSize: 18,
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
    backgroundColor: 'transparent',
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
    alignItems: 'center',
  },
  savContent: {
    flex: 1,
    // backgroundColor: '#474747',
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
    right: 12,
    bottom: 17,
    alignItems: 'center',
    borderRadius: 5,
  },
  ftlHistory: (hst) => ({
    flex: hst ? 0 : 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  txtEmpty: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFFFFF',
    position: 'absolute',
    bottom: '28%',
  },
  vwEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrincipalScreen;
