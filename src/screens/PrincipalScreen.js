import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';
import moment from 'moment';
import BottomAlert from '../components/BottomAlert';
import styles from '../styles/PrincipalScreen';

const PrincipalScreen = () => {
  const navigation = useNavigation();
  const dmsion = Dimensions.get('screen').width;

  const [valueNow, setValueNow] = useState(0);
  const [valueObj, setValueObj] = useState(2500);
  const [valueIncrement, setValueIncrement] = useState(200);
  const [showButtonIncrement, setShowButtonIncrement] = useState(true);
  const [haveHistory, setHaveHistory] = useState(true);
  const [myData, setMydata] = useState([]);

  const [limitHistory, setLimitHistory] = useState(false);
  const [waterFull, setWaterFull] = useState(false);
  const [cleaningHistory, setCleaningHistory] = useState(false);

  const renderItem = ({item, index}) => (
    <View style={styles.vwHistory(dmsion - 100)}>
      <View style={styles.vwTxtCount}>
        <Text style={styles.txtCount}>{myData.length - Number(index)}</Text>
      </View>
      <Text style={[styles.txtContentHistory, styles.txtShadow]}>
        {item.hist}
      </Text>
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
          let val = {
            id: e.id,
            hist: e.history,
            date: e.date,
          };
          allHist.push(val);
        });
      }

      let histFinal = allHist.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      setMydata(histFinal);
      histFinal.length <= 0 ? setHaveHistory(false) : setHaveHistory(true);
    } catch (error) {
      console.log('Verify - PrincipalScreen: ', error);
    } finally {
      let val = valueNow + valueIncrement;
      val >= valueObj ? null : setShowButtonIncrement(true);
    }
  };

  const addnew = async () => {
    try {
      setValueNow(valueNow + valueIncrement);
      let val = valueNow + valueIncrement;
      val >= valueObj ? setValueNow(valueObj) : null;
      setShowButtonIncrement(false);

      let idnow = uuid(),
        data = moment(new Date()).format('DD/MM/YY'),
        hora = moment(new Date()).format('H:mm (a)'),
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
      verify();
    }
  };

  const clearHistory = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].substr(0, 5) == '@hist') {
          await AsyncStorage.removeItem(keys[i]);
        }
      }
    } catch (error) {
      console.log('clearHistory - Principal: ', error);
    } finally {
      setLimitHistory(false);
      setCleaningHistory(false);
      verify();
    }
  };

  const removeAlert = () => {
    setLimitHistory(false);
    setCleaningHistory(false);
  };

  useEffect(() => {
    verify();
  }, [valueNow]);

  return (
    <SafeAreaView style={styles.savContent}>
      {limitHistory && (
        <BottomAlert
          showConfirm={false}
          showHistory={true}
          showKeep={true}
          showCancel={false}
          visible={true}
          closeAlert={() => removeAlert()}
          clearHist={() => clearHistory()}
          title="Histórico"
          icon="historic"
          text="O histórico atingiu o limite definido, deseja limpá-lo (para guardar novos) ou mantê-lo (sem guardar novos)?"
        />
      )}

      {cleaningHistory && (
        <BottomAlert
          showConfirm={false}
          showHistory={true}
          visible={true}
          clearHist={() => clearHistory()}
          title="Histórico"
          icon="historic"
          text="Deseja limpar todo histórico?"
        />
      )}

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
          colors={['#47bdc9', '#92E4ED', '#92E4ED', '#47bdc9']}
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
              style={styles.pieGraph}
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
            <>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => setCleaningHistory(true)}
                style={styles.vwHistoricIcon}>
                <>
                  <Text style={[styles.txtHistory, styles.txtShadow]}>
                    Histórico
                  </Text>
                  <IconMat
                    name="layers-clear"
                    size={20}
                    color="#FFFFFF"
                    style={styles.txtShadow}
                  />
                </>
              </TouchableHighlight>
            </>
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

export default PrincipalScreen;
