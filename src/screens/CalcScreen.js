import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import * as Progress from 'react-native-progress';
import {convertInputsIMC} from '../scripts/converters';

const PrincipalScreen = () => {
  const navigation = useNavigation();

  const [inpWeight, setInpWeight] = useState('');
  const [inpHeight, setInpHeight] = useState('');
  const [disabledCalc, setDisabledCalc] = useState(true);
  const [resultIMC, setResultIMC] = useState(false);
  const [showResult, setShowResult] = useState(true);

  const convertNumbers = () => {
    let weight = Number(inpWeight.replace(',', '.'));
    let height = Number(inpHeight.replace(',', '.'));
    return [weight, height];
  };

  const IMCFinal = () => {
    return convertNumbers()[0] / (convertNumbers()[1] * convertNumbers()[1]);
  };

  useEffect(() => {
    resultIMC
      ? setTimeout(() => {
          setShowResult(false);
        }, 500)
      : null;
  }, [resultIMC]);

  useEffect(() => {
    convertNumbers()[0] != 0 && convertNumbers()[1] != 0
      ? setDisabledCalc(false)
      : setDisabledCalc(true),
      setResultIMC(false);
  }, [inpHeight, inpWeight]);

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
            color="#31949e"
          />
        </TouchableHighlight>
      </View>
      {/* BODY CONTENT */}
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
                maxLength={6}
                keyboardType="numeric"
                style={styles.inpWeight}
                value={inpWeight}
                onChangeText={(v) => setInpWeight(convertInputsIMC(v))}
                placeholder="63,00"
                placeholderTextColor={'rgba(0,0,0,0.2)'}
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
              <View>
                <TextInput
                  maxLength={5}
                  value={inpHeight}
                  onChangeText={(v) => setInpHeight(convertInputsIMC(v))}
                  keyboardType="numeric"
                  style={styles.inpWeight}
                  placeholder="1,73"
                  placeholderTextColor={'rgba(0,0,0,0.2)'}
                />
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    paddingRight: 3.7,
                    paddingLeft: 3.7,
                    paddingBottom: 1,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#1d6970',
                    position: 'absolute',
                    right: -3,
                    top: 0,
                  }}>
                  <Text
                    style={{fontSize: 7, fontWeight: 'bold', color: '#1d6970'}}>
                    2
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.vwBoxRightInside]}>
              <Text style={[styles.txtRightInside, styles.txtShadow]}>m</Text>
            </View>
          </View>
        </View>

        <View style={styles.vwBtnCalc}>
          <TouchableHighlight
            onPress={() => setResultIMC(true)}
            disabled={disabledCalc}
            underlayColor="none"
            style={styles.tchCalc(disabledCalc)}>
            <Text style={styles.txtTchCalc(disabledCalc)}>Calcular</Text>
          </TouchableHighlight>
        </View>

        {resultIMC && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <View style={styles.vwContentPie}>
              <Progress.Pie
                progress={!showResult ? IMCFinal() / 100 : 0}
                borderWidth={0}
                indeterminate={showResult}
                size={190}
                unfilledColor="rgba(51,51,51,0.05)"
                color="#31949e"
                style={styles.pieGraph}
              />
              <View style={styles.vwBackWhite}>
                <Text style={styles.txtCenterPrincipal}>
                  {!showResult
                    ? 'Seu IMC\n' + IMCFinal().toFixed(2).replace('.', ',')
                    : 'Calculando'}
                </Text>
              </View>
            </View>
          </View>
        )}
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
    color: '#31949e',
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
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
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
    paddingBottom: 15,
  },
  vwBoxDivide: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginLeft: 15,
  },
  vwBtnCalc: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  tchCalc: (disabled) => ({
    backgroundColor: disabled ? 'rgba(255,255,255,0.7)' : '#FFFFFF',
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 20,
    elevation: 3,
  }),
  txtTchCalc: (disabled) => ({
    fontSize: 18,
    color: disabled ? 'rgba(51,51,51,0.15)' : '#31949e',
    fontWeight: 'bold',
  }),
  vwContentPie: {
    width: 200,
    height: 200,
    borderRadius: 100,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieGraph: {
    borderRadius: 100,
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
    color: '#31949e',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PrincipalScreen;
