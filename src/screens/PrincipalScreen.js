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
import ModalConfig from '../components/ModalConfig';
import styles from '../styles/PrincipalScreen';

const PrincipalScreen = () => {
  const navigation = useNavigation();
  const dmsion = Dimensions.get('screen').width;

  const [valueNow, setValueNow] = useState(1500);
  const [valueObj, setValueObj] = useState(2500);
  const [valueIncrement, setValueIncrement] = useState(200);
  const [haveHistory, setHaveHistory] = useState(true);
  const [myData, setMydata] = useState([]);

  const [waterFull, setWaterFull] = useState(false);
  const [timeDrink, setTimeDrink] = useState(false);
  const [cleaningHistory, setCleaningHistory] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

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

  const EmptyComponent = () =>
    !showConfig ? (
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
    ) : null;

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
      verifyCountData(histFinal.length);
    } catch (error) {
      console.log('Verify - PrincipalScreen: ', error);
    }
  };

  const verifyCountData = (count) => {
    let values = [];

    count != null && count >= 100
      ? (setCleaningHistory(true),
        (values = [
          'O histórico atingiu o limite definido, deseja limpá-lo (para guardar novos) ou mantê-lo (sem guardar novos) ?',
          false,
          true,
          false,
        ]))
      : (values = [
          'Limpar todo o histórico (ação irreversível!) ?',
          true,
          false,
          true,
        ]);

    return values;
  };

  const addnew = async () => {
    try {
      setValueNow(valueNow + valueIncrement);
      let val = valueNow + valueIncrement;
      val >= valueObj ? (setValueNow(valueObj), setWaterFull(true)) : null;

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
      setTimeDrink(false);
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
      setCleaningHistory(false);
      verify();
    }
  };

  useEffect(() => {
    verify();
  }, [valueNow]);

  return (
    <SafeAreaView style={styles.savContent}>
      {showConfig && (
        <ModalConfig
          visible={showConfig}
          closeConfig={() => setShowConfig(false)}
          initCicles={() => setTimeDrink(true)}
        />
      )}

      {cleaningHistory && (
        <BottomAlert
          showConfirm={false}
          showHistory={true}
          showKeep={verifyCountData()[2]}
          showCancel={verifyCountData()[1]}
          visible={true}
          closeAlert={() =>
            verifyCountData()[3] ? setCleaningHistory(false) : null
          }
          clearHist={() => clearHistory()}
          title="Histórico"
          icon="historic"
          text={verifyCountData()[0]}
        />
      )}

      {timeDrink && (
        <BottomAlert
          showConfirm={false}
          showCancel={false}
          visible={true}
          closeAlert={() => setTimeDrink(false)}
          showDrink={true}
          drinkWater={() => addnew()}
          position="center"
          icon="time-drink"
          title="Hora de beber água"
          text={`Se já bebeu, confirme para adicionar mais ${valueIncrement}ml ao seu objetivo. É bom estar levando isso á sério!`}
        />
      )}

      {waterFull && (
        <BottomAlert
          showConfirm={false}
          showCancel={true}
          visible={true}
          closeAlert={() => setWaterFull(false)}
          showNew={true}
          loop={false}
          particles={true}
          icon="completed"
          position="center"
          title="Você conseguiu!"
          text="E agora, o que vai ser?"
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
          <TouchableHighlight
            underlayColor="none"
            onPress={() => setShowConfig(true)}
            style={styles.iconGear}>
            <IconF
              name="gear"
              size={25}
              color="#FFFFFF"
              style={styles.txtShadow}
            />
          </TouchableHighlight>

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

          {myData.length > 0 && (
            <>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => {
                  setCleaningHistory(true);
                  verifyCountData();
                }}
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
